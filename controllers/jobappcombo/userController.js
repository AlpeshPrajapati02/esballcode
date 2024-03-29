const conn = require('../../config/dbConnect')


const generateCombo = async(comboName,val="")=>{

  let [result] = await conn.query('select * from select_master where select_key = ? ',[comboName])
      
  if(!result.length){
      let html = "";
      return html;
  }
  let id = result[0].sid;
  let type = result[0].select_type;
  let name = result[0].select_name;

  [result] = await conn.query('select * from option_master where sid=?',[id]);

  let html = "";
  if(type == 'radio' || type == 'checkbox'){
      html += `
      <p> ${name} : `;

      let combo = result.map((value)=>{
          return `<label><input type="${type}" name="${name}" id="${value.option_value}"  value="${value.option_value}" ${val==value.option_value?'checked':''}>${value.option_value}</label>`
      });

      html += combo.join("");

      html+=`</p>`;

  }
  else if(type == 'dropdown'){
      html += `
      <lable class="${name}"> ${name}: 
              <select name="${name}" id="${name}" class="dvalid">
                  <option value="">--select--</option>`;

                  result.forEach((value) => {
                      html += `<option value="${value.option_value}"  ${val==value.option_value?'selected':''}>
                      ${value.option_value} </option>`
                  }) ;

         html+= `</select></lable>`;

         
        }
        
  return html;
}




const basicDetails = async (req, res) => {
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

  let sql = `insert into candidateMaster (fname,lname,designation,city,state,email,phoneNo,zipCode,gender,relationship,dob,add1,add2) values (?);`;

  let details = [
    fname,
    lname,
    designation,
    city,
    state,
    email,
    phone,
    zipcode,
    gender,
    relationship,
    new Date(dob),
    add1,
    add2,
  ];

  let [result] = await conn.query(sql, [details]);

  let id = result.insertId;

  return id;
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

  let sql = `insert into educationDetails (canid,sid,degree,board_course,university,passingYear,percentage) values (?)`;
  let ssc = [id, "1", "ssc", sscnameofboard, "", sscpassingyear, sscpercentage];
  let hsc = [
    id,
    "1",
    "hsc/deploma",
    hscnameofboard,
    "",
    hscpassingyear,
    hscpercentage,
  ];
  let bachelor = [
    id,
    "1",
    "bachelor",
    bachelorcoursename,
    bacheloruniversity,
    bachelorpassingyear,
    bachelorpercentage,
  ];
  let master = [
    id,
    "1",
    "master",
    mastercoursename,
    masteruniversity,
    masterpassingyear,
    masterpercentage,
  ];

  let datas = [ssc,hsc,bachelor,master];

  let result;
  for(let i = 0; i<datas.length; i++){
    if((datas[i].includes("ssc") || datas[i].includes("hsc/deploma")) || !datas[i].includes("")){
      [result] = await conn.query(sql,[datas[i]]);
    }
  }

  return result;
};

const experienceDetails = async (req, res, id) => {
  let {
    company,
    cdesignation,
    fromdate,
    todate,
  } = req.body;

  let sql = `insert into workExperience (canid,companyName,designation,fromDate,toDate) values (?)`;

  let result;
  for(let i = 0; i<company.length; i++){
    if(company[i] && cdesignation[i] && fromdate[i] && todate[i]){
      let data = [id,company[i],cdesignation[i],fromdate[i],todate[i]];
      [result] = await conn.query(sql,[data]);
    }
  }

  return result;
};

const languageDetails = async (req, res, id) => {
  let { hindi, english, gujarati, langcheck1, langcheck2, langcheck3 } =
    req.body;

  let sql = `insert into languageKnown (canid,sid,language,canRead,canWrite,canSpeak) values (?)`;

  let hindiData = [
    id,
    "2",
    hindi,
    langcheck1?.includes("read") ? true : false,
    langcheck1?.includes("write") ? true : false,
    langcheck1?.includes("speak") ? true : false,
  ];

  let gujaratiData = [
    id,
    "2",
    gujarati,
    langcheck2?.includes("read") ? true : false,
    langcheck2?.includes("write") ? true : false,
    langcheck2?.includes("speak") ? true : false,
  ];

  let englishData = [
    id,
    "2",
    english,
    langcheck3?.includes("read") ? true : false,
    langcheck3?.includes("write") ? true : false,
    langcheck3?.includes("speak") ? true : false,
  ];

  let result;

  let dataarr = [hindiData,englishData,gujaratiData];

  for(let i = 0; i<dataarr.length; i++){
    if(!dataarr[i].includes(undefined)){
      [result] = await conn.query(sql,[dataarr[i]])
    }
  }

  return result;
};

const preferenceDetails = async (req, res, id) => {
  let { location, noticeperiod, expectedctc, currentctc, department } =
    req.body;

  let sql = `insert into preference (canid,sid,preferedLocation,noticePeriod,expectedCTC,currentCTC,department) values (?)`;

  let details = [
    id,
    "5",
    location,
    noticeperiod,
    expectedctc,
    currentctc,
    department,
  ];

  let [result] = await conn.query(sql, [details]);

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

  let sql = `insert into technologyYouKnow (canid,sid,technology,level) values (?)`;

  let phpData, mysqlData, laravelData, oracleData;
  if (php && phptech) {
    phpData = [id, "3", php, phptech];
  }
  if (mysql && mysqltech) {
    mysqlData = [id, "3", mysql, mysqltech];
  }
  if (laravel && laraveltech) {
    laravelData = [id, "3", laravel, laraveltech];
  }
  if (oracle && oracletech) {
    oracleData = [id, "3", oracle, oracletech];
  }

  let data = [phpData, mysqlData, laravelData, oracleData];

  for (let i = 0; i < data.length; i++) {
    if (Array.isArray(data[i])) {
      [result] = await conn.query(sql, [data[i]]);
    }
  }

  return result;
};

const refDetails = async (req, res, id) => {
  let { refname, refcontact, refrelation } = req.body;

  let sql = `insert into referenceContact (canid,name,contactNo,relation) values (?)`;

  let result;
  for(let i = 0; i<refname.length; i++){
    if(refname[i] && refcontact[i] && refrelation[i]){
      let data = [id,refname[i],refcontact[i],refrelation[i]];
      [result] = await conn.query(sql, [data]);
    }
  }

  return result;
};

exports.user = async (req, res) => {
  try {
    let {fname, lname, designation, email, phone, gender, dob, city, state, zipcode, relationship, add1, sscnameofboard, sscpassingyear, sscpercentage, hscnameofboard, hscpassingyear, hscpercentage, bachelorcoursename, bacheloruniversity, bachelorpassingyear, bachelorpercentage, mastercoursename, masterpassingyear, masteruniversity, masterpercentage, company, cdesignation, fromdate, todate, hindi, english, gujarati, langcheck1, langcheck2, langcheck3, php, phptech, mysql, mysqltech, laravel, laraveltech, oracle, oracletech, refname, refcontact, refrelation,  location, noticeperiod, expectedctc, currentctc, department, } = req.body;

    
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
      (zipcode && (isNaN(zipcode) || zipcode.length !==6)) || (dob && isNaN(new Date(dob))) ||
      (mastercoursename && !bachelorcoursename)
    ) {  



      return res.json({
        success:false,
        message:"All fields are Required !",
        data:req.body
      });
    }



    for(let i = 0; i<company.length; i++){
      if((company[i] && (!cdesignation[i] || !fromdate[i] || !todate[i])) ||
      (!company[i] && (cdesignation[i] || fromdate[i] || todate[i]))){
        return res.json({
          success:false,
          message:"Please give all the details about company"
        });
      }
  }

  for(let i = 0; i<refname.length; i++){
    if((refname[i] && (!refcontact[i] || !refrelation[i])) ||
    (!refname[i] && (refcontact[i] || refrelation[i]))){
      return res.json({
        success:false,
        message:"Please give all the details about referance"
      });
    }
}

    let userId, educationDetail, experienceDetail, languageDetail, preferenceDetail, techDetail, refDetail;

    try {
      userId = await basicDetails(req, res);
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }

    try {
      educationDetail = await educationDetails(req, res, userId);
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }

    try {
     
        experienceDetail = await experienceDetails(req, res, userId);
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }

    try {
      languageDetail = await languageDetails(req, res, userId);
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
    try {
      preferenceDetail = await preferenceDetails(req, res, userId);
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }

    try {
      if (
        (php && phptech) ||
        (mysql && mysqltech) ||
        (laravel && laraveltech) ||
        (oracle && oracletech)
      ) {
        techDetail = await techDetails(req, res, userId);
      }
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }

    try {

        refDetail = await refDetails(req, res, userId);
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
    return res.json({success:true});
  } catch (error) {
    return res.status(500).render("jobappcombo/home", {
      message: error.message,
    });
  }
};


exports.getForm = async (req,res)=>{
  try {
    let gender = await generateCombo("gender_radio");
    let state = await generateCombo("state_combo");
    let relationship = await generateCombo("relationship_combo");
    let department = await generateCombo("department_combo");



    return res.render('jobappcombo/home',{gender,state,department,relationship})
  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
};


exports.getData = async(req,res)=>{
  try {
      let sql = "select * from candidateMaster";
      let [result] = await conn.query(sql);

      return res.render('jobappcombo/table',{data:result})

  } catch (error) {
    return res.json({
      success:false,
      message:error.message
    })
  }
}