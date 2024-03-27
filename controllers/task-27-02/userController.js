const conn = require('../../config/dbConnect')
require('dotenv').config();

// code for only pagination
exports.getAllUser = async (req, res) => {
    try {
        let recordShown = Number(process.env.TOTAL_PAGE);

        let [result] = await conn.query(`SELECT studentMaster.sid,studentMaster.name,count(attendance.present) as present FROM studentMaster 
        INNER JOIN attendance ON studentMaster.sid = attendance.sid 
        where attendance.present = 1 AND attendance.dateof BETWEEN '2023-12-01' AND '2023-12-31' GROUP BY studentMaster.sid,attendance.present ORDER BY studentMaster.sid`)

        let totalRecord = result.length;

        let lastPage = Math.floor(totalRecord / recordShown) + 1;

        let page = Number(req.query.page) || 1;

        let offsetValue = page - 1 >= 0 ? page - 1 : 0;

        offsetValue = offsetValue * recordShown;


        // // get filter value
        let filter = req.query.filter || "2023-12-31";

        let d = filter.split("-")
        // console.log(d);



        let sql = `SELECT studentMaster.sid,studentMaster.name,count(attendance.present) as present FROM studentMaster INNER JOIN attendance ON studentMaster.sid = attendance.sid where attendance.present = 1 AND attendance.dateof BETWEEN '${d[0]}-${d[1]}-01' AND '${d[0]}-${d[1]}-${d[2]}' GROUP BY studentMaster.sid,attendance.present ORDER BY studentMaster.sid limit ?,?; `;

        [result] = await conn.query(sql, [offsetValue, recordShown]);

        // console.log(result)
        return res.render('task-27-06/home', { 
            students: result, 
            page: page, 
            lastPage: lastPage, 
            days: Number(d[2]), 
            month: Number(d[1]), 
            filter: filter, 
            offsetValue, 
            recordShown, 
            totalRecord 
        })

        // return res.json(result)

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}


// using single query
exports.getResult = async(req,res)=>{
    try {
        let recordShown = Number(process.env.TOTAL_PAGE);

        // calculate total records
        let sql = 'select count(*) as total from studentMaster;';

        let [result] = await conn.query(sql,[true]);

        let totalRecord = result[0].total;

        // calcualte lastPage
        let lastPage = Math.ceil(totalRecord/recordShown);

        // get page no from query string
        let page = Number(req.query.page) || 1;

        // if requested page is greater than lastPage and less then 1 then return page not found
        if(page > lastPage && page<1){
            return res.status(400).json({
                success:false,
                message:"Page Not Found"
            })
        }

        // calculate offsetvalue
        let offsetValue = page - 1 >= 0 ? page - 1 : 0;
        offsetValue = offsetValue * recordShown;

        // make query for get the data
        sql = `select s.sid, s.name, 
        sum(case when e.examType =1 then e.obtainedMarkInPractical else 0 end) as prelimPractical,
        sum(case when e.examType =1 then e.obtainedMarksInTheory else 0 end) as prelimTheory,
        sum(case when e.examType =2 then e.obtainedMarkInPractical else 0 end) as terminalPractical,
        sum(case when e.examType =2 then e.obtainedMarksInTheory else 0 end) as terminalTheory,
        sum(case when e.examType =3 then e.obtainedMarkInPractical else 0 end) as finalPractical,
        sum(case when e.examType =3 then e.obtainedMarksInTheory else 0 end) as finalTheory,
        sum(e.obtainedMarkInPractical+e.obtainedMarksInTheory) as total
        from studentMaster as s inner join examResult as e on s.sid = e.sid group by s.sid limit ?,?;`;

        [result] = await conn.query(sql,[offsetValue,recordShown]);
        // console.log(result)

        // return res to result.ejs
        return res.render('task-27-06/result',{
            students : result, 
            page, lastPage,
            totalRecord,
            offsetValue, 
            recordShown
        })

    } catch (error) {
       return res.status(500).json({
            success:false,
            message:error
       })
    }
}

// get result of student by student id
exports.getResultById = async(req,res)=>{
    try {
        // get id from params
        let id = req.params.id;

        // make query to retrive all result data for particular student by joins on tables
        sql = `select s.sid,s.name,sb.sname,e.examName,er.obtainedMarkInPractical,er.obtainedMarksInTheory 
        from studentMaster as s 
        inner join 
        examResult as er on s.sid = er.sid 
        inner join 
        examTypes as e on er.examType = e.examType
        inner join 
        subjectMaster as sb on sb.subid = er.subid where s.sid = ?;`;

        let [result] = await conn.query(sql,[id]);
        let data = result;
        // console.log(result)

        // for same student id 3 objects are come from db so make it one object using reduce method
        const result1 = Object.values(data.reduce((acc, { 'sid': sid, 'name':name,sname,examName,obtainedMarkInPractical,obtainedMarksInTheory }) => {
            acc[sid] ??= { sid, name,terminal:[],prelim:[],final:[]};

            let data1 = {examName,sname,obtainedMarkInPractical,obtainedMarksInTheory}
            if(examName === 'terminal'){
                acc[sid].terminal.push(data1)
            }
            else if(examName === 'prelim'){
                acc[sid].prelim.push(data1)
            }
            else{
                acc[sid].final.push(data1)
            }
            
            return acc;
        }, {}));

            // make query for attendance report
            sql = `select count(sid) as present,date_format(dateof,'%Y-%m') as month,date_format(LAST_DAY(dateof),'%d') as lastdate from attendance where sid = ? and present = 1
            group by month,lastdate;`;

            [result] = await conn.query(sql,[id]);
            let attendances = result;

        // return response on studentRes.ejs
        return res.render('task-27-06/studentRes',{
            results:result1,
            attendances
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error,
            customError:"Error comes during executing the DB request"
        })
    }
}








// using 2 query and by doing maping data -> O(n*m)
exports.getResultQ = async (req,res)=>{
    try {
        let recordShown = Number(process.env.TOTAL_PAGE);

        let sql = 'select sid,name from studentMaster limit 114;';

        let [result] = await conn.query(sql,[true]);
        let studentData = result;

        let totalRecord = result.length;

        let lastPage = Math.ceil(totalRecord/recordShown);

        let page = Number(req.query.page) || 1;

        if(page > lastPage){
            return res.status(400).json({
                success:false,
                message:"Page Not Found"
            })
        }

        let offsetValue = page - 1 >= 0 ? page - 1 : 0;
        offsetValue = offsetValue * recordShown;

        let d = 'select s.sid,e.examType,sum(e.obtainedMarkInPractical) as prac, sum(e.obtainedMarksInTheory) as theo from studentMaster as s left join examResult as e on s.sid = e.sid group by s.sid,e.examType'
        try {
            [result] = await conn.query(d,[offsetValue,recordShown]);
            // console.log(result)
        } catch (error) {
            console.log(error)
        }

        let resultData = result;
        console.log(resultData)
        studentData = studentData.map((student)=>{
            resultData.map((s)=>{
                if(student.sid == s.sid && s.examType == 1){
                    student.terminalOMT = s.prac;
                    student.terminalOMP = s.theo;
                }
                if(student.sid == s.sid && s.examType == 2){
                    student.prelimOMT = s.prac;
                    student.prelimOMP = s.theo;
                }
                if(student.sid == s.sid && s.examType == 3){
                    student.finalOMT = s.prac;
                    student.finalOMP = s.theo;
                }
                return s;
            })
            return student;
        })

        let students = studentData.filter((student)=>student.sid <= offsetValue + recordShown && student.sid > offsetValue)
 
        // console.log(studentData)
        return res.render('task-27-06/resultSingleQuery',{students : students, page, lastPage,totalRecord,offsetValue, recordShown})
    } catch (error) {
        return res.json({
            message:error
        })
    }
}

// using single query and using reduce method -> O(n)
exports.getResults = async(req,res)=>{
    try {

        let recordShown = Number(process.env.TOTAL_PAGE);

        let sql = 'select sid,name from studentMaster limit 114;';

        let [result] = await conn.query(sql,[true]);

        let totalRecord = result.length;

        let lastPage = Math.ceil(totalRecord/recordShown);

        let page = Number(req.query.page) || 1;

        if(page > lastPage){
            return res.status(400).json({
                success:false,
                message:"Page Not Found"
            })
        }

        let offsetValue = page - 1 >= 0 ? page - 1 : 0;
        offsetValue = offsetValue * recordShown;

        sql = `select s.sid,s.name,sb.sname,e.examName,er.obtainedMarkInPractical,er.obtainedMarksInTheory from 
        studentMaster as s left join examResult as er on s.sid = er.sid inner join examTypes as e on er.examType = e.examType
        left join subjectMaster as sb on sb.subid = er.subid;`;

        [result] = await conn.query(sql);
        let data = result;
        // console.log(result)


        const result1 = Object.values(data.reduce((acc, { 'sid': sid, 'name':name,sname,examName,obtainedMarkInPractical,obtainedMarksInTheory }) => {
            acc[sid] ??= { sid, name,terminal:[],prelim:[],final:[]};

            let data1 = {obtainedMarkInPractical,obtainedMarksInTheory}
            if(examName === 'terminal'){
                let obPracticalSum = acc[sid].terminal[0] ? acc[sid].terminal[0] : 0;
                obPracticalSum += obtainedMarkInPractical;
                acc[sid].terminal[0] = obPracticalSum;
                
                let obTheorySum = acc[sid].terminal[1] ? acc[sid].terminal[1] : 0;
                obTheorySum += obtainedMarksInTheory;
                acc[sid].terminal[1] = obTheorySum;

            }
            else if(examName === 'prelim'){
                let obPracticalSum = acc[sid].prelim[0] ? acc[sid].prelim[0] : 0;
                obPracticalSum += obtainedMarkInPractical;
                acc[sid].prelim[0] = obPracticalSum;
                
                let obTheorySum = acc[sid].prelim[1] ? acc[sid].prelim[1] : 0;
                obTheorySum += obtainedMarksInTheory;
                acc[sid].prelim[1] = obTheorySum;
            }
            else{
                let obPracticalSum = acc[sid].final[0] ? acc[sid].final[0] : 0;
                obPracticalSum += obtainedMarkInPractical;
                acc[sid].final[0] = obPracticalSum;
                
                let obTheorySum = acc[sid].final[1] ? acc[sid].final[1] : 0;
                obTheorySum += obtainedMarksInTheory;
                acc[sid].final[1] = obTheorySum;
            }
            
            return acc;
        }, {}));

        let students = result1.filter((student)=>student.sid <= offsetValue + recordShown && student.sid > offsetValue)
        return res.render('task-27-06/resultData',{students : students, page, lastPage,totalRecord,offsetValue, recordShown})

    } catch (error) {
        console.log(error)
    }
}


// exports.getResultById = async(req,res)=>{
//     try {
//         let id = req.params.id;

//         let sql = `select s.sid,s.name,sb.sname,e.examName,er.obtainedMarkInPractical,er.obtainedMarksInTheory from studentMaster as s left join examResult as er on s.sid = er.sid left join examTypes as e on er.examType = e.examType left join subjectMaster as sb on sb.subid = er.subid where s.sid = ?`

//         let data ;
//         try {
//             let [result] = await conn.query(sql,[id]);
//             data = result;
//         } catch (error) {
//             console.log(error)
//         }

//         let date = ["2023-12-31","2024-01-31","2024-02-29"];

//         let attendances = [];

//         for(let i = 0; i<date.length; i++){
//             let d = date[i].split("-");

//             sql = `SELECT studentMaster.sid,studentMaster.name,count(attendance.present) as present FROM studentMaster LEFT JOIN attendance ON studentMaster.sid = attendance.sid where studentMaster.sid = ? and attendance.present = 1 AND attendance.dateof BETWEEN '${d[0]}-${d[1]}-01' AND '${d[0]}-${d[1]}-${d[2]}' GROUP BY studentMaster.sid,attendance.present ORDER BY studentMaster.sid; `;

//             [result] = await conn.query(sql,[id]);
//             attendances[i] = result[0].present
//         }
        
//         return res.render('studentResult',{results:data,attendances})
//     } catch (error) {
//         return res.json({
//             success:false,
//             message:error
//         })
//     }
// }