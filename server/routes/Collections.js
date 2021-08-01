const express = require("express");
const router = express.Router();
const { Collections } = require('../models/');


// router.post("/contactus", async (req, res) => {
//     const contact = req.body;
//     console.log("==>" + contact)
//     // await Contactus.create(contact);
        

//         res.json("SUCCESS");
   
// });

router.post("/", async (req, res) => {
    const collection = req.body;
    await Collections.create(collection);
    res.json(collection);
});

// router.post("/", (req, res) => {
//     const collection = req.body;
//         // console.log(fullName)
//         Collections.create({
//             name: fullName,
//             contactNo: mobile,
        
//         })
//         res.json("SUCCESS");
   
// });

module.exports = router;