const conn = require('../../config/dbConnect')
require('dotenv').config();

// code for only pagination
exports.getAllUser = async (req, res) => {
    try {

        let recordShown = Number(process.env.TOTAL_PAGE);

        let [result] = await conn.query('select count(*) as records from studentMaster;')

        let totalRecord = result[0].records;

        let lastPage = Math.floor(totalRecord / recordShown)

        let sql = "select * from studentMaster limit ?,?;"

        let page = Number(req.query.page) || 1;

        let offsetValue = page - 1 >= 0 ? page - 1 : 0;
        offsetValue = offsetValue * recordShown;

        [result] = await conn.query(sql, [offsetValue, recordShown]);


        // console.log(result)

        return res.render('pagination/home', { students: result, page: page, lastPage: lastPage })

        // return res.json(result)

    } catch (error) {
        console.log(error)
    }
}


// code for pagination with order by
exports.getUserOrderBy = async (req, res) => {
    try {

        // get how many record will show on ejs
        let recordShown = Number(process.env.TOTAL_PAGE);

        // execute query for total records
        let data;
        try {
            let [result] = await conn.query('select count(*) as records from studentMaster;')
            data = result;
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }

        //get totalRecord
        let totalRecord = data[0].records;

        // calculate last page 
        let lastPage = Math.floor(totalRecord / recordShown)

        // orderby value from query
        let orderby = req.query.orderby || "sid";

        // make query for getting data
        let sql = `select * from studentMaster order by ${orderby} limit ?,?;`;

        // get page from query string
        let page = Number(req.query.page) || 1;

        // calculate offset value by condition
        if (page - 1 >= 0 && page - 1 <= lastPage) {
            offsetValue = page - 1;
        }
        else {
            page = 1;
            offsetValue = 0;
        }
        offsetValue = offsetValue * recordShown;

        // execute above query
        try {
            let [result] = await conn.query(sql, [offsetValue, recordShown]);
            data = result;

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }


        // return res of result , page no, last page, order by value
        return res.render('pagination/records', { students: data, page: page, lastPage: lastPage, orderby: orderby, recordShown, offsetValue, totalRecord })

        // return res.json(result)

    } catch (error) {
        console.log(error)
    }
}




// code for pagination with order by
exports.getUserOrderByValue = async (req, res) => {
    try {

        // get how many record will show on ejs
        let recordShown = Number(process.env.TOTAL_PAGE);

        // execute query for total records
        let data;
        try {
            let [result] = await conn.query('select count(*) as records from studentMaster;')
            data = result;
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }

        //get totalRecord
        let totalRecord = data[0].records;

        // calculate last page 
        let lastPage = Math.floor(totalRecord / recordShown)

        // orderby value from query
        let orderby = req.query.orderby || "sid";
        let order = req.query.order || "ASC";

        // make query for getting data
        let sql = `select * from studentMaster order by ${orderby} ${order} limit ?,?;`;

        // get page from query string
        let page = Number(req.query.page) || 1;

        // calculate offset value by condition
        if (page - 1 >= 0 && page - 1 <= lastPage) {
            offsetValue = page - 1;
        }
        else {
            page = 1;
            offsetValue = 0;
        }
        offsetValue = offsetValue * recordShown;

        // execute above query
        try {
            let [result] = await conn.query(sql, [offsetValue, recordShown]);
            data = result;

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }


        // return res of result , page no, last page, order by value
        return res.render('pagination/orderby', { students: data, page: page, lastPage: lastPage, orderby: orderby, order:order,recordShown, offsetValue, totalRecord })

        // return res.json(result)

    } catch (error) {
        console.log(error)
    }
}