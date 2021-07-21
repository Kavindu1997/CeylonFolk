const express = require("express");
const router = express.Router();
const { Customers } = require('../models/');


// router.post("/contactus", async (req, res) => {
//     const contact = req.body;
//     console.log("==>" + contact)
//     // await Contactus.create(contact);
        

//         res.json("SUCCESS");
   
// });


router.post("/customer", (req, res) => {
    const { fullName, email, mobile, add1, add2, city } = req.body;
        // console.log(fullName)
        Customers.create({
            name: fullName,
            email: email,
            phoneNo: mobile,
            addLine1: add1,
            addLine2: add2,
            city: city,
           
        })
        res.json("SUCCESS");
   
});




module.exports = router;