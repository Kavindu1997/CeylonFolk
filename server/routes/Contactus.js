const express = require('express');
const router = express.Router();
const { Contactus } = require('../models/');


router.post("/contactusForm", async (req, res) => {
    const { fullName, mobile,email,message } = req.body;
   
        Contactus.create({
            name: fullName,
            contactNo: mobile,
            email: email,
            message: message,
           
        })
        res.json("SUCCESS");
   
});


module.exports = router;