const express = require("express");
const router = express.Router();
const { Coupons } = require('../models/');


router.post("/add",async (req, res) => {
 
    const coupon =req.body;
    Coupons.create(coupon);
    res.json(coupon);
   
});




module.exports = router;