const express = require("express");
const router = express.Router();
const { Contactus } = require('../models/');


// router.post("/contactus", async (req, res) => {
//     const contact = req.body;
//     console.log("==>" + contact)
//     // await Contactus.create(contact);
        

//         res.json("SUCCESS");
   
// });


router.post("/contactus", (req, res) => {
    const { fullName, mobile, email, message } = req.body;
        // console.log(fullName)
        Contactus.create({
            name: fullName,
            contactNo: mobile,
            email: email,
            message: message,
           
        })
        res.json("SUCCESS");
   
});




module.exports = router;