const conn = require('../../config/dbConnect')
require('dotenv').config();

// exports.getUser = async (req, res) => {
//   try {
//     const recordShown = Number(process.env.RECORDSHOWN);
//     let str = req.body.search?.trim();

//     if (!str) {
//       return res.render('home', { data: [], str: "" });
//     }

//     const fields = {
//       fname: [],
//       lname: [],
//       city: [],
//       mobile: [],
//       age: [],
//     };


//     const mapping = {
//         "_": "fname",
//         "^": "lname",
//         ":": "city",
//         "{": "mobile",
//         "}": "age",
//       };

//     let i = 0;
//     while (i < str.length) {
//       const delimiter = str[i];
//       if(["_", "^", ":", "{", "}"].includes(str[i])) {

//       let val = "";
//       i++;
//       while (str[i] !== delimiter && i < str.length && !["_", "^", ":", "{", "}"].includes(str[i])) {
//         val += str[i];
//         i++;
//       }
//       fields[mapping[delimiter]].push(val);
//     }
//     }
    

//     let sql = 'select * from studentMaster where ';

//     Object.entries(fields).forEach(([field, values]) => {
//       if (values.length) {
//         if (values.length === 1) {
//           sql += `${field} like '%${values[0]}%' and `;
//         } else {
//           sql += `(${values
//             .map((val, index) => {
//               if (index + 1 < values.length) {
//                 return `${field} like '%${val}%' OR `;
//               }
//               return `${field} like '%${val}%'`;
//             })
//             .join("")}) and `;
//         }
//       }
//     });

    
//     sql = sql.slice(0, -5) + ' limit 10000';

//     const [result] = await conn.query(sql);

//     res.render('home', { data: result, str });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


exports.getUser = async (req, res) => {
  try {
    const recordShown = Number(process.env.RECORDSHOWN);
    let str = req.body.search?.trim();

    if (!str) {
      return res.render('delimeterSearch/home', { data: [], str: "" });
    }

    let fname=[],lname=[],city=[],age=[],mobile=[];

    let i = 0;

    while(i<str.length){
      if(str[i]=="_"){
        let val = "";
        i++;
        while(str[i] !== "_" && str[i] !== "^" && str[i] !== "}" && str[i] !== "{" && str[i] !== ":" && i<str.length ){
          val +=str[i];
          i++;
        }

        fname.push(val);
        continue;
      }


      if(str[i]=="^"){
        let val = "";
        i++;
        while(str[i] !== "_" && str[i] !== "^" && str[i] !== "}" && str[i] !== "{" && str[i] !== ":" && i<str.length ){
          val +=str[i];
          i++;
        }

        lname.push(val);
        continue;
      }

      if(str[i]==":"){
        let val = "";
        i++;
        while(str[i] !== "_" && str[i] !== "^" && str[i] !== "}" && str[i] !== "{" && str[i] !== ":" && i<str.length ){
          val +=str[i];
          i++;
        }

        city.push(val);
        continue;
      }

      if(str[i]=="}"){
        let val = "";
        i++;
        while(str[i] !== "_" && str[i] !== "^" && str[i] !== "}" && str[i] !== "{" && str[i] !== ":" && i<str.length ){
          val +=str[i];
          i++;
        }

        age.push(val);
        continue;
      }

      if(str[i]=="{"){
        let val = "";
        i++;
        while(str[i] !== "_" && str[i] !== "^" && str[i] !== "}" && str[i] !== "{" && str[i] !== ":" && i<str.length ){
          val +=str[i];
          i++;
        }

        mobile.push(val);
        continue;
      }

      i++;
    }


    fname = fname.filter((data)=> data !== "")
    lname = lname.filter((data)=> data !== "")
    city = city.filter((data)=> data !== "")
    age = age.filter((data)=> data !== "")
    mobile = mobile.filter((data)=> data !== "")

    let sql = `select * from studentMaster2 where`;

    if(fname.length){
      if(fname.length == 1){
        sql += `fname like '%${fname[0]}%' and `;
      }
      else{
        sql += "(";
        for(let j =0; j<fname.length; j++){
         if(j+1 < fname.length){
          sql +=`fname like '%${fname[j]}%' or `;
         }
         else{
          sql +=`fname like '%${fname[j]}%') and `;
         }
        }
      }
    }
    if(lname.length){
      if(lname.length == 1){
        sql += `lname like '%${lname[0]}%' and `;
      }
      else{
        sql += "(";
        for(let j =0; j<lname.length; j++){
         if(j+1 < lname.length){
          sql +=`lname like '%${lname[j]}%' or `;
         }
         else{
          sql +=`lname like '%${lname[j]}%') and `;
         }
        }
      }
    }
    if(city.length){
      if(city.length == 1){
        sql += `city like '%${city[0]}%' and `;
      }
      else{
        sql += "(";
        for(let j =0; j<city.length; j++){
         if(j+1 < city.length){
          sql +=`city like '%${city[j]}%' or `;
         }
         else{
          sql +=`city like '%${city[j]}%') and `;
         }
        }
      }
    }
    if(age.length){
      if(age.length == 1){
        sql += `fname like '%${age[0]}%' and `;
      }
      else{
        sql += "(";
        for(let j =0; j<age.length; j++){
         if(j+1 < age.length){
          sql +=`age like '%${age[j]}%' or `;
         }
         else{
          sql +=`age like '%${age[j]}%') and `;
         }
        }
      }
    }
    if(mobile.length){
      if(mobile.length == 1){
        sql += `phoneNo like '%${mobile[0]}%' and `;
      }
      else{
        sql += "(";
        for(let j =0; j<mobile.length; j++){
         if(j+1 < mobile.length){
          sql +=`phoneNo like '%${mobile[j]}%' or `;
         }
         else{
          sql +=`phoneNo like '%${mobile[j]}%') and `;
         }
        }
      }
    }

    sql += 'true limit 10000';
    console.log(sql)
    const [result] = await conn.query(sql);

    res.render('delimeterSearch/home', { data: result, str });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};