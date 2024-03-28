const express = require("express");
// const conn = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const path = require("path");

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors({ origin: "*" }));
// set view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// setup static file path for css,imgs,js or other files
app.use("/public", express.static(path.join(__dirname, "/public")));

// conn.query('drop table users')

// conn.query('create table users(uid int unique auto_increment,fname varchar(255) not null, lname varchar(255) not null,email varchar(255) primary key, dob date not null,designation varchar(255) not null,password varchar(512) not null,createdAt timestamp default current_timestamp, updatedAt timestamp default current_timestamp on update current_timestamp)',(err,result)=>{
//     try {
//         console.log('table created')
//     } catch (error) {
//         console.log(error)
//     }
// })

const userRouter = require("./routes/users");
const delimeterRoute = require("./routes/delimeter");
const jobappRoute = require("./routes/jobapp");
const paginationRoute = require("./routes/pagination");
const spaRoute = require("./routes/spa");
const task27Route = require("./routes/task27");
const updateDataRoute = require("./routes/updateData");
const jstasksRouter = require("./routes/jstasks");

app.get("/",(req,res)=>{
  res.send("<h1><a href='/media/login'> Login </a></h1>")
})

app.use("/media", userRouter);
app.use("/delimeter", delimeterRoute);
app.use("/jobapp", jobappRoute);
app.use("/pagination", paginationRoute);
app.use("/spa", spaRoute);
app.use("/task27", task27Route);
app.use("/updateData", updateDataRoute);
app.use("/jstasks", jstasksRouter);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
