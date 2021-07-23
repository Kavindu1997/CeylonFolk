const express = require("express");
const router = express.Router();
const { Inventory } = require('../models/');

router.get("/inventory", async (req,res) => {
    const listOfItems = await Inventory.findAll();
    res.json(listOfItems);
});

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