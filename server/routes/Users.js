const express = require('express');
const router = express.Router();
const { Users, sequelize } = require('../models/');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require('nodemailer');

// const {sign} = require('jsonwebtoken')

router.post("/register", async (req, res) => {
    const { firstName, lastName, email, mobile, password, userType } = req.body;
    const user1 = await Users.findOne({ where: { email: email } });
    if ((user1)) res.json({ error: "Email already Registered! Please Login" });
    else {
        bcrypt.hash(password, 10).then(async (hash) => {
            const query1 = "INSERT INTO users (firstName,lastName,email,contactNo,password, user_type_id) VALUES ('" + firstName + "','" + lastName + "','" + email + "','" + mobile + "','" + hash + "','" + userType + "')";
            const user = await sequelize.query(query1, { type: sequelize.QueryTypes.INSERT });

            const query2 = "SELECT * FROM users WHERE email='" + email + "'";
            const customerDetails = await sequelize.query(query2, { type: sequelize.QueryTypes.SELECT });
            res.json(customerDetails);
        });

    }
});


router.post("/login", async (req, res) => {
    const { loginEmail, loginPassword } = req.body;

    const user = await Users.findOne({ where: { email: loginEmail } });

    if (!user) res.json({ error: "Email doesn't Exist" });

    if (!(user.email == loginEmail)) res.json({ error: "Email doesn't Exist" });



    bcrypt.compare(loginPassword, user.password).then((match) => {
        if (!match) res.json({ error: "Wrong Email and Password Combination" });
        res.json(user);
    });
});

router.post("/forgotPassword", async (req, res) => {
    crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
            console.log(err);
        }
        const token = buffer.toString("hex");
        const user = await Users.findOne({ where: { email: req.body.forgotEmail } });
        if (!user) {
            return res.json({ error: "User doesn't exist with that email" });
        }
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000;
        user.save().then((result) => {
            const htmlEmail = `
            <p> You requested for password reset</p>
            <h3>Click on this <a href="http://localhost:3000/reset/${token}" target="_parent" >Link </a>to reset password</h3>
            `

            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: "testceylonfolk@gmail.com",
                    pass: "pkjjt@1234"
                }
            });

            const mailOptions = {
                from: 'testceylonfolk@gmail.com',
                to: user.email,
                replyTo: user.email,
                subject: "Password reset - CeylonFolk",
                html: htmlEmail
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log("error in sending mail", err)
                    return res.status(400).json({
                        message: `error in sending the mail${err}`
                    })
                }
                else {
                    return res.json({ message: "Successfully sent Email." })
                }
            });
        })
    })
});

router.post("/newPassword", async (req, res) => {
    const newPassword = req.body.newPassword;
    const sentToken = req.body.token;

    const user = await Users.findOne({ where: { resetToken: sentToken } });
    if (!user) {
        return res.json({ error: "Session Expire" });
    }
    bcrypt.hash(newPassword, 10).then((hash) => {
        user.password = hash;
        user.resetToken = null;
        user.expireToken = null;
        user.save().then((saveduser) => {
            return res.json({ message: "password update successfully!" })
        })

    })


});

router.put("/changePassword/:uid", async (req, res) => {
    const userId = req.params.uid
    console.log(userId);

    const { newPassword, confirmPassword } = req.body;
    bcrypt.hash(newPassword, 10).then(async (hash) => {
        const query = "UPDATE users SET password='" + hash + "'  WHERE id='" + userId + "'";

        const result = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
        res.json(result);
    });
});


router.post("/", async (req, res) => {
    const { firstName, lastName, email, contactNo, password, user_type_id } = req.body;

    const user = await Users.findOne({ where: { email: email } });
    if ((user)) res.json({ error: "Email already Existed!" });
    else {
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                contactNo: contactNo,
                password: hash,
                user_type_id: user_type_id
            })
            res.json("SUCCESS");
        });
    }
    //if ((user.email == email)) res.json({ error: "Email already Exist!" });
});


router.get('/', async (req, res) => {
    try {
        const query = "SELECT users.id,firstName,lastName,email,contactNo,user_type_id,type FROM users INNER JOIN usertypes on users.user_type_id=usertypes.id";
        const userList = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(userList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/profile/:uid', async (req, res) => {
    const uid = req.params.uid
    try {
        const query = "SELECT users.id,firstName,lastName,email,contactNo,user_type_id,type FROM users INNER JOIN usertypes on users.user_type_id=usertypes.id WHERE users.id=" + uid;
        const user = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/getCount', async (req, res) => {
    try {
        const query = "SELECT COUNT(user_type_id) AS customer_count FROM users WHERE user_type_id='2'";
        const customerCount = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(customerCount);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


router.put("/:userId", async (req, res) => {
    const userId = req.params.userId
    const { firstName, lastName, email, contactNo, user_type_id } = req.body;
    const query = "UPDATE users SET firstName='" + firstName + "',lastName='" + lastName + "',email='" + email + "',contactNo='" + contactNo + "',user_type_id='" + user_type_id + "' WHERE id='" + userId + "'";
    const result = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    res.json(result);
});


router.delete("/:userId", async (req, res) => {
    const userId = req.params.userId;

    await Users.destroy({
        where: {
            id: userId,
        },
    });
    res.json("DELETED SUCCESSFULLY");
})

module.exports = router;
