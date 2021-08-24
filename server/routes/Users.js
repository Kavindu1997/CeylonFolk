const express = require('express');
const router = express.Router();
const { Users } = require('../models/');
const bcrypt = require("bcrypt");

// const {sign} = require('jsonwebtoken')

router.post("/register", async (req, res) => {
    const { firstName, lastName, email, mobile, password, userType } = req.body;
    console.log(req.body);
    const user1 = await Users.findOne({ where: { email: email } });
    if ((user1.email == email)) res.json({ error: "You Have been already registered under this email..please Login!" });
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


module.exports = router;
