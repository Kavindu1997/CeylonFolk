const express = require('express');
const router = express.Router();
const { Users } = require('../models/');
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const { firstName, lastName, regEmail, mobileNumber, regPassword } = req.body;

    const user1 = await Users.findOne({ where: { email: regEmail } });
    bcrypt.hash(regPassword, 10).then((hash) => {
        Users.create({
            firstName: firstName,
            lastName: lastName,
            email: regEmail,
            contactNo: mobileNumber,
            password: hash,
        })
        res.json("SUCCESS");
    });
    if ((user1.email == regEmail)) res.json({ error: "Email already Exist!" });
});

router.post("/login", async (req, res) => {
    const { loginEmail, loginPassword } = req.body;

    const user = await Users.findOne({ where: { email: loginEmail } });

    if (!(user.email == loginEmail)) res.json({ error: "Email doesn't Exist" });

    if (!user) res.json({ error: "Email doesn't Exist" });

    bcrypt.compare(loginPassword, user.password).then((match) => {
        if (!match) res.json({ error: "Wrong Email and Password Combination" });

        res.json("You logged in");
    })
});


module.exports = router;