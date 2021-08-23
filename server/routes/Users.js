const express = require('express');
const router = express.Router();
const { Users } = require('../models/');
const bcrypt = require("bcrypt");

// const {sign} = require('jsonwebtoken')

router.post("/register", async (req, res) => {
    const { firstName, lastName, email, mobile, password } = req.body;

    const user1 = await Users.findOne({ where: { email: email } });
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            contactNo: mobile,
            password: hash,
        })
        res.json("SUCCESS");
    });
    if ((user1.email == email)) res.json({ error: "Email already Exist!" });
});

router.post("/login", async (req, res) => {
    const { loginEmail, loginPassword } = req.body;
   
    
    const user = await Users.findOne({ where: { email: loginEmail } });
    
    if (!(user.email == loginEmail)) res.json({ error: "Email doesn't Exist" });

    if (!user) res.json({ error: "Email doesn't Exist" });

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