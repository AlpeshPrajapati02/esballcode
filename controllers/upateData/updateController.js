const conn = require('../../config/dbConnect')

const basicDetails = async (req, res, id) => {
  let {
    fname,
    lname,
    designation,
    email,
    phone,
    gender,
    dob,
    city,
    state,
    zipcode,
    relationship,
    add1,
    add2,
  } = req.body;


  let obj = {
    "fname": fname,
    "lname": lname,
    "designation": designation,
    "email": email,
    "phoneNo": phone,
    "gender": gender,
    "dob": new Date(dob),
    "city": city,
    "state": state,
    "zipCode": zipcode,
    "relationship": relationship,
    "add1": add1,
    "add2": add2
  };

  let sql = `update candidateMaster SET ? where canid=?`;

  let [result] = await conn.query(sql, [obj, id]);

  // let id = result.insertId;

  return result;
};

const educationDetails = async (req, res, id) => {
  let {
    sscnameofboard,
    sscpassingyear,
    sscpercentage,
    hscnameofboard,
    hscpassingyear,
    hscpercentage,
    bachelorcoursename,
    bacheloruniversity,
    bachelorpassingyear,
    bachelorpercentage,
    mastercoursename,
    masterpassingyear,
    masterpercentage,
    masteruniversity,
  } = req.body;

  let sql = `update educationDetails SET ? where degree=? and canid=?`;

  let ssc = { "board_course": sscnameofboard, "passingYear": sscpassingyear, "percentage": sscpercentage };
  let hsc = { "board_course": hscnameofboard, "passingYear": hscpassingyear, "percentage": hscpercentage };
  let bachelor = { "board_course": bachelorcoursename, "university": bacheloruniversity, "passingYear": bachelorpassingyear, "percentage": bachelorpercentage };
  let master = { "board_course": mastercoursename, "university": masteruniversity, "passingYear": masterpassingyear, "percentage": masterpercentage };

  let datas = [ssc, hsc, bachelor, master];
  let degree = ["ssc", "hsc/deploma", "bachelor", "master"];

  let result;
  for (let i = 0; i < datas.length; i++) {
    if ((degree[i] == "ssc" || degree[i] == "hsc/deploma") || !Object.values(datas[i]).includes("")) {
      [result] = await conn.query(sql, [datas[i], degree[i], id]);
    }
  }

  return result;
};

const experienceDetails = async (req, res, id) => {
  let {
    companyId,
    company,
    cdesignation,
    fromdate,
    todate,
  } = req.body;


  let sql = `update workExperience SET ? where wid=?`;

  let result;
  for (let i = 0; i < company.length; i++) {

    let data = { "companyName": company[i], "designation": cdesignation[i], "fromDate": new Date(fromdate[i]), "toDate": new Date(todate[i]) };

    if (company[i] && cdesignation[i] && fromdate[i] && todate[i]) {

      [result] = await conn.query(sql, [data, companyId[i]]);
    }
  }

  return result;
};

const languageDetails = async (req, res, id) => {
  let { hindi, english, gujarati, langcheck1, langcheck2, langcheck3 } =
    req.body;

  let sql = `UPDATE languageKnown SET ? WHERE language=? AND canid=?`;

  let hindiData = {
    "language": hindi,
    "canRead": langcheck1?.includes("read") ? true : false,
    "canWrite": langcheck1?.includes("write") ? true : false,
    "canSpeak": langcheck1?.includes("speak") ? true : false,
  };

  let gujaratiData = {
    "language": gujarati,
    "canRead": langcheck2?.includes("read") ? true : false,
    "canWrite": langcheck2?.includes("write") ? true : false,
    "canSpeak": langcheck2?.includes("speak") ? true : false,
  };

  let englishData = {
    "language": english,
    "canRead": langcheck3?.includes("read") ? true : false,
    "canWrite": langcheck3?.includes("write") ? true : false,
    "canSpeak": langcheck3?.includes("speak") ? true : false,
  };

  let result;



  let dataarr = [hindiData, englishData, gujaratiData];

  let cLang = [hindi,english,gujarati];

  let [data] = await conn.query("select * from languageKnown where canid=?",[id]);

  let lang =[];
  data.forEach((l)=>{
    lang.push(l.language)
  })

  for (let i = 0; i < dataarr.length; i++) {
    if (!Object.values(dataarr[i]).includes(undefined)) {
        if(lang.includes(cLang[i])){
          [result] = await conn.query(sql, [dataarr[i], dataarr[i].language, id])
        }
        else{
          [result] = await conn.query(`insert into languageKnown SET canid=${id},?`,[dataarr[i]])
        }
    }else{
      [result] = await conn.query(`DELETE FROM languageKnown WHERE language=? AND canid=?`,[ dataarr[i].language,id])
    }
  }

  return result;
};

const preferenceDetails = async (req, res, id) => {
  let { location, noticeperiod, expectedctc, currentctc, department } =
    req.body;

  let sql = `UPDATE preference SET ? WHERE canid=?`;

  let details = {
    "preferedLocation": location,
    "noticePeriod": noticeperiod,
    "expectedCTC": expectedctc,
    "currentCTC": currentctc,
    "department": department,
  };

  let [result] = await conn.query(sql, [details, id]);

  return result;
};

const techDetails = async (req, res, id) => {
  let {
    php,
    phptech,
    mysql,
    mysqltech,
    laravel,
    laraveltech,
    oracle,
    oracletech,
  } = req.body;

  let sql = `UPDATE technologyYouKnow SET ? WHERE technology=? AND canid=?`;

  let phpData = { "technology": php, "level": phptech };

  let mysqlData = { "technology": mysql, "level": mysqltech };

  let laravelData = { "technology": laravel, "level": laraveltech };

  let oracleData = { "technology": oracle, "level": oracletech };

  let data = [phpData, mysqlData, laravelData, oracleData];

  let cTech = [php,mysql,laravel,oracle];
  let result;

  [result] = await conn.query("select * from technologyYouKnow where canid=?",[id]);
  let tech = [];
  result.forEach((t)=>{
    tech.push(t.technology);
  })


  for (let i = 0; i < data.length; i++) {
    if (!Object.values(data[i]).includes(undefined)) {
      if(tech.includes(cTech[i])){
        [result] = await conn.query(sql, [data[i], data[i].technology, id]);
      }
      else{
        [result] = await conn.query(`insert into technologyYouKnow SET canid=${id},?`,[data[i]])
      }
    }else{
      [result] = await conn.query('Delete from technologyYouKnow where canid=? and technology=?',[id,data[i].technology])
    }
  }

  return result;
};

const refDetails = async (req, res, id) => {
  let { refId, refname, refcontact, refrelation } = req.body;

  let sql = `UPDATE referenceContact SET ? WHERE rfid=?`;

  let result;
  for (let i = 0; i < refname.length; i++) {
    if (refname[i] && refcontact[i] && refrelation[i]) {
      let data = { "name": refname[i], "contactNo": refcontact[i], "relation": refrelation[i] };
      [result] = await conn.query(sql, [data, refId[i]]);
    }
  }

  return result;
};



const getData = async (tableName, id, orderby) => {
  let query = `select * from ${tableName} where canid=? order by ${orderby}`;

  let [result] = await conn.query(query, [id]);

  return result;
}

exports.userData = async (req, res) => {
  try {
    let id = req.params.id;
    let basicData = await getData("candidateMaster", id, "canid")
    let educationDetails = await getData("educationDetails", id, "eid");
    let workDetails = await getData("workExperience", id, "wid");
    let language = await getData("languageKnown", id, "lid");
    let techDetails = await getData("technologyYouKnow", id, "tid");
    let referance = await getData("referenceContact", id, "rfid");
    let preference = await getData("preference", id, "pid");

    return res.render("updateData/home", {
      message: "",
      data: basicData[0],
      educationDetails,
      techDetails,
      workDetails,
      language,
      preference: preference[0],
      referance,
      route:"/updateData/update"
    })
  } catch (error) {
    return res.status(500).render("updateData/home", {
      message: error.message,
    });
  }
};



exports.updateUser = async (req, res) => {
  try {
    let { id, fname, lname, designation, email, phone, gender, dob, city, state, zipcode, relationship, add1, sscnameofboard, sscpassingyear, sscpercentage, hscnameofboard, hscpassingyear, hscpercentage, bachelorcoursename, bacheloruniversity, bachelorpassingyear, bachelorpercentage, mastercoursename, masterpassingyear, masteruniversity, masterpercentage, company, cdesignation, fromdate, todate, hindi, english, gujarati, langcheck1, langcheck2, langcheck3, php, phptech, mysql, mysqltech, laravel, laraveltech, oracle, oracletech, refname, refcontact, refrelation, location, noticeperiod, expectedctc, currentctc, department, } = req.body;


    if (
      !fname || !lname || !designation || !email || !phone || !gender || !dob || !city || !state || !zipcode || !relationship || !add1 ||
      !sscnameofboard || !sscpassingyear || !sscpercentage || !hscnameofboard || !hscpassingyear || !hscpercentage ||
      !location || !noticeperiod || !expectedctc || !currentctc || !department ||
      (hindi && !langcheck1) || (!hindi && langcheck1) ||
      (gujarati && !langcheck2) ||
      (!gujarati && langcheck2) ||
      (english && !langcheck3) ||
      (!english && langcheck3) ||
      (php && !phptech) ||
      (!php && phptech) ||
      (mysql && !mysqltech) ||
      (!mysql && mysqltech) ||
      (laravel && !laraveltech) ||
      (!laravel && laraveltech) ||
      (oracle && !oracletech) ||
      (!oracle && oracletech) ||
      (bachelorcoursename && (!bachelorpassingyear || !bacheloruniversity || !bachelorpercentage)) ||
      (!bachelorcoursename && (bachelorpassingyear || bacheloruniversity || bachelorpercentage)) ||
      (mastercoursename && (!masterpassingyear || !masteruniversity || !masterpercentage)) ||
      (!mastercoursename && (masterpassingyear || masteruniversity || masterpercentage)) ||
      (expectedctc && isNaN(expectedctc)) ||
      (currentctc && isNaN(currentctc)) ||
      (noticeperiod && isNaN(noticeperiod)) ||
      (email && !email.match(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) ||
      (phone && (isNaN(phone) || phone.length !== 10)) ||
      (zipcode && (isNaN(zipcode) || zipcode.length !== 6)) || (dob && isNaN(new Date(dob))) ||
      (mastercoursename && !bachelorcoursename)
    ) {
      return res.render("updateData/home", { message: "All fields are Required !" });
    }



    for (let i = 0; i < company.length; i++) {
      if ((company[i] && (!cdesignation[i] || !fromdate[i] || !todate[i])) ||
        (!company[i] && (cdesignation[i] || fromdate[i] || todate[i]))) {
        return res.render("updateData/home", { message: "All fields are Required !" });
      }
    }

    for (let i = 0; i < refname.length; i++) {
      if ((refname[i] && (!refcontact[i] || !refrelation[i])) ||
        (!company[i] && (refcontact[i] || refrelation[i]))) {
        return res.render("updateData/home", { message: "All fields are Required !" });
      }
    }

    await basicDetails(req, res, id);
    await educationDetails(req, res, id);
    await experienceDetails(req, res, id);
    await languageDetails(req, res, id);
    await techDetails(req, res, id);
    await refDetails(req, res, id);
    await preferenceDetails(req, res, id);

    return res.redirect(`/updateData/user/${id}`)

  } catch (error) {
    return res.json({
      success: false,
      error: error.message
    })
  }
}
