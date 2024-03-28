const jwt = require("jsonwebtoken");
const conn = require('../../config/dbConnect')
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

// post => /register
exports.createUser = async (req, res) => {
  try {
    // get data from the req body
    let { fname, lname, email, dob, designation, password, confirmPassword } =
      req.body;

    // validate data
    if (
      !fname ||
      !lname ||
      !email ||
      !dob ||
      !designation ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // check password and confirmPassword
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "confirm password doesn't match",
      });
    }

    // if password and confirmPassword same
    let [result] = await conn.query("select * from users where email=?", [
      email,
    ]);

    // if user exist
    if (result.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    // if user not exist

    // generate hashpassword
    let hashPassword;
    let random_salt = Math.random().toString(36).substring(2, 6);
    password += random_salt;
    try {
      let bcryptsalt = await bcrypt.genSaltSync(10);
      hashPassword = await bcrypt.hash(password, bcryptsalt);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    let verification_token = crypto.randomUUID();

    // make query for insert the data
    let sql =
      "insert into users (fname,lname,email,dob,designation,password,pw_salt,verification_token) values (?,?,?,?,?,?,?,?)";

    // execute the query
    [result] = await conn.query(sql, [
      fname,
      lname,
      email,
      new Date(dob),
      designation,
      hashPassword,
      random_salt,
      verification_token,
    ]);
    // console.log(result)
    // data inserted
    if (!result.affectedRows) {
      return res.status(400).json({
        success: false,
        message: "error occur during registration",
      });
    }

    // console.log(`data inserted successfully`);

    // get the inserted data by email to return to user
    [result] = await conn.query("select * from users where email=?;", [email]);
    result[0].verification_token = verification_token;
    // return res.render('login')
    return res.json({
      success: true,
      user: result[0],
    });
  } catch (error) {
    // any error occur during the registration
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// post => /login
exports.login = async (req, res) => {
  try {
    // get data
    let { email, password } = req.body;

    // validate data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // execute the query to find user in DB by email
    let [result] = await conn.query("select * from users where email=?", [
      email,
    ]);

    // user not found the return res
    if (result.length <= 0) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Email or Password",
      });
    }

    // user found the verify DB password with entered password
    let hashPassword = result[0].password;
    let newPassword = password + result[0].pw_salt;
    if (await bcrypt.compare(newPassword, hashPassword)) {
      // both are same

      // generate token for the cookie
      let payload = {
        id: result[0].uid,
        email: result[0].email,
        fname: result[0].fname,
        password: result[0].password,
      };

      // remove password from the user obj
      let { password: _, ...newObj } = result[0];
      // generate token
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      // set token into userObj
      newObj.token = token;
      newObj.dob = new Date(newObj.dob).toLocaleDateString("en-GB", {
        timeZone: "asia/kolkata",
      });
      // return res with cookie of 4 days
      // return res.cookie('token', token, { maxAge: 4 * 24 * 60 * 60 * 1000, httpOnly: true, }).render('userInfo',{
      //     user: newObj
      // })

      return res
        .cookie("token", token, {
          maxAge:  4 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .json({
          success: true,
          user: newObj,
        });
    }
    else{
      return res.json({
        success:false,
        message:"Incorrect Email or Password"
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

// get => /
exports.user = async (req, res) => {
  let id = req.user.id;
  let [result] = await conn.query("select * from users where uid=?", [id]);

  if (result.length == 0) {
    return res.render("login");
  }

  let { password: _, ...others } = result[0];
  others.dob = new Date(others.dob).toLocaleDateString("en-GB", {
    timeZone: "asia/kolkata",
  });

  return res.render("login-registration/userInfo", { user: others });
};

// get => /user
exports.getAllUser = async (req, res) => {
  try {
    // execute query for get all users
    let [result] = await conn.query("select * from users order by uid;");

    // if user is not present
    // if (result.length <= 0) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Users not found"
    //     })
    // }

    // user present the return res
    return res.json({
      success: true,
      users: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// get => /user/:id
exports.getUserById = async (req, res) => {
  try {
    // get userid from the params
    let id = req.params.id;

    // make query
    let sql = "select * from users where uid=?";

    // executer the query
    let [result] = await conn.query(sql, [id]);

    // if user not found
    if (result.length <= 0) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // user found

    // remove password field from the user obj
    let { password: _, ...newObj } = result[0];

    // return res
    return res.json({
      success: true,
      user: newObj,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// post => /user/:id
exports.UpdateUser = async (req, res) => {
  try {
    // get id from the params
    let id = req.params.id;

    // // if params id and logged in user id not match
    // console.log(req.user)
    // if(id !== req.user.id){
    //     return res.status(401).json({
    //         success:false,
    //         message:"unauthorized user"
    //     })
    // }

    // params id and logged in userid match

    // get data from req body
    let { fname, lname, dob, designation } = req.body;

    // make query to update
    let sql =
      "update users set fname=?,lname=?,dob=?,designation=? where uid=? ;";

    // execute query
    let [result] = await conn.query(sql, [fname, lname, dob, designation, id]);

    // if user is not in DB or invalid id
    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: "User not found for update",
      });
    }

    // query for updated user
    sql = "select * from users where uid=?";

    // execute query
    [result] = await conn.query(sql, [id]);

    // if user found
    if (result.length <= 0) {
      return res.status(400).json({
        success: false,
        message: "error in get updated data",
      });
    }

    // remove password field from the user obj
    let { password: _, ...newObj } = result[0];

    return res.render("userInfo", { user: newObj });

    // return res
    // return res.json({
    //     success: true,
    //     user: newObj,
    // });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// delete => /user/:id
exports.deleteUser = async (req, res) => {
  try {
    // get user id
    let id = req.params.id;

    // make query
    let sql = "select * from users where uid=?";

    // execute query
    let [result] = await conn.query(sql, [id]);

    // if user not found
    if (result.length <= 0) {
      return res.status(400).json({
        success: false,
        message: "User not found for Delete",
      });
    }

    // user found
    let user = result[0];

    // query for deleting user
    sql = "delete from users where uid=? ;";

    // execute query
    [result] = await conn.query(sql, [id]);

    // check deleted or not
    if (!result.affectedRows) {
      return res.status(400).json({
        success: false,
        message: "error in deleting the data",
      });
    }

    // return res deleted successfully
    return res.json({
      success: true,
      message: "user deleted successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getForm = async (req, res) => {
  res.render("login-registration/home");
};

exports.updateForm = async (req, res) => {
  try {
    // console.log(req.user)
    let id = req.user.id;

    let [result] = await conn.query(
      "select uid,fname,lname,dob,designation from users where uid=?",
      [id]
    );

    return res.render("updateUser", { user: result[0] });
  } catch (error) {
    console.log(error);
  }
};

exports.activationForm = async (req, res) => {
  try {
    let token = req.query.token;
    let email = req.query.email;

    if (!token || !email) {
      return res.render("404");
    }

    let html = `<div class="active-button">
                        <h4>Thank you for Registration !</h4>
                        <p>Click on Below Link to Activate Your Account !</p>
                        <a href="http://localhost:8000/media/verify/?token=${token}&email=${email}">http://localhost:8000/media/verify/?token=${token}&email=${email}</a>
                    </div>`;

    return res.render("login-registration/activationForm", { html });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.activationAccount = async (req, res) => {
  try {
    let token = req.query.token;
    let email = req.query.email;
    let [result] = await conn.query(
      "select * from users where email=? and verification_token=?",
      [email, token]
    );

    if (result.length <= 0) {
      let html = `<div class="active-button">
                            <p>Token is invalid or expired!</p>
                        </div>`;
      return res.render("login-registration/activationForm", { html });
    }

    let diff = new Date(Date.now()) - new Date(result[0].token_created_at);
    let mins = Math.floor((diff % 86400000) / 60000); // minutes

    if (mins > 30 && result[0].isActivated == false) {
      let html = `<div class="active-button">
                            <p>Verification link has been expired!, <a href="" id="generate-token">click here</a> to Generate new link!</p>
                            <input type="hidden" id="active-account">
                        </div>`;
      return res.render("login-registration/activationForm", { html });
    }

    [result] = await conn.query(
      "update users set isActivated=true where email=?",
      [email]
    );

    let html = `<div class="active-button">
                            <h4>Hurray</h4>
                            <p>Your Account is Activated!</p>
                            <a href="http://localhost:8000/media/login">Go to Login</a>
                        </div>`;
    return res.render("login-registration/activationForm", { html });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.generateToken = async (req, res) => {
  try {
    let email = req.body.email;

    let [result] = await conn.query("select * from users where email=? ", [
      email,
    ]);

    if (result.length == 0) {
      res.status(500).json({
        success: false,
        message: "user not found",
      });
    }

    let newToken = crypto.randomUUID();
    [result] = await conn.query(
      "update users set verification_token=?, token_created_at=? where email=?",
      [newToken, new Date(Date.now()), email]
    );

    return res.json({
      success: true,
      message: "token generated successfully",
      token: newToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    return res.clearCookie("token").json({
      success: true,
      message: "user Logged out successfully   ",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    let html = `<div class="active-button">
                        <h4>Please Enter your Registered Email!</h4>
                        <input type="text" name="email" id="email" placeholder="Enter email">
                        <input type="submit" value="Generate" id ="submit">
                    </div>`;

    return res.render("login-registration/forgotPass", { html });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.forgotPassLink = async (req, res) => {
  try {
    let email = req.body.email;

    let [result] = await conn.query("select * from users where email=?", [
      email,
    ]);

    if (result.length == 0) {
      return res.json({
        success: false,
        message: "user not found :( !",
      });
    }

    let verification_token = result[0].verification_token;
    await conn.query("update users set token_created_at=? where email=?", [
      new Date(Date.now()),
      email,
    ]);

    return res.json({
      success: true,
      token: verification_token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.CreatePassword = async (req, res) => {
  try {
    let token = req.query.token;
    let email = req.query.email;

    let [result] = await conn.query(
      "select * from users where email=? and verification_token=?",
      [email, token]
    );

    if (result.length == 0) {
      let html = `
                 <div class="active-button">
                    <p>Invalid Token or Expired Token 1</p>
                 </div> 
                  `;

      return res.render("createPassword", { html });
    }

    let diff = new Date(Date.now()) - new Date(result[0].token_created_at);
    let min = Math.floor((diff % 86400000) / 60000);

    if (min > 30) {
      let html = `
                 <div class="active-button">
                    <p>Invalid Token or Expired Token !</p>
                 </div> 
                  `;

      return res.render("createPassword", { html });
    }

    let html = `<div class="active-button">
                    <div class="password">
                        <label for="lname">Create Password: </label>
                        <input type="password" name="password" id="password" placeholder="Enter a password" class="dvalid" >
                    </div>
                    <div class="confirmPassword">
                        <label for="confirmPassword">Re-enter Password: </label>
                        <input type="password" name="confirmPassword" id="confirmPassword"
                            placeholder="Re-enter the same password" class="dvalid" >
                    </div>
                      <input type="submit" value="Create" id ="submit">
                </div>`;

    return res.render("login-registration/createPassword", { html });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    let token = req.query.token;
    let email = req.query.email;

    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    let [result] = await conn.query(
      "select * from users where email=? and verification_token=?",
      [email, token]
    );

    if (result.length == 0) {
      return res.json({
        success: false,
        message: "Invalid User or Token",
      });
    }

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "confirm password doesn't match",
      });
    }

    // generate hashpassword
    let hashPassword;
    let random_salt = Math.random().toString(36).substring(2, 6);
    password += random_salt;
    try {
      let bcryptsalt = await bcrypt.genSaltSync(10);
      hashPassword = await bcrypt.hash(password, bcryptsalt);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    [result] = await conn.query(
      "update users set password = ?, pw_salt=? where email=?",
      [hashPassword, random_salt, email]
    );

    return res.json({
      success: true,
      message: "Password Created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getCurrentUser = async(req,res)=>{
  try {
    return res.json({
      success:true,
      user:req.user
    })
  } catch (error) {
    return res.json({
      success:false,
      error:error.message
    })
  }
}