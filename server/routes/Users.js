const express = require('express');
const router = express.Router();
const { Users } = require('../models/');
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require('nodemailer');

// const {sign} = require('jsonwebtoken')

router.post("/register", async (req, res) => {
    const { firstName, lastName, email, mobile, password, userType } = req.body;
    const user1 = await Users.findOne({ where: { email: email } });
    if ((user1)) res.json({ error: "Email already Registered! Please Login" });
    else {
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                contactNo: mobile,
                password: hash,
                user_type_id: userType,
            })
            res.json("SUCCESS");
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

        /*const accessToken = sign(
            {email: user.email, id: user.id},
            "importantsecret"
            );
            user['token']  = accessToken;*/
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
            <h3>Click on this <a href="http://localhost:3000/reset/${token}">Link </a>to reset password</h3>
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
                    console.log("successfully send message", info)
                    alert("successfully send message");
                    return res.json({
                        message: info
                    })
                }
            });


        })
    })
});

router.post("/newPassword", async (req, res) => {
    const newPassword = req.body.newPassword;
    const sentToken = req.body.token;

    const user = await Users.findOne({ where: { resetToken: sentToken } });
    // console.log(user)
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


module.exports = router;
