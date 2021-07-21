const express = require("express");
const router = express.Router();
const { Inventory } = require('../models/');

router.post("/inventory", (req, res) => {
    const { code, colour, size, type, quantity, margin } = req.body;
        // console.log(fullName)
        Inventory.create({
            code: code,
            colour:colour ,
            size:size,
            type: type,
            quantity: quantity,
            margin: margin,
           
        })
        res.json("SUCCESS");
   
});




module.exports = router;