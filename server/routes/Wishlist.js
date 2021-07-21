const express = require("express");
const router = express.Router();
const { Wishlist } = require('../models');

router.get("/", async (req,res) => {
    const listOfTshirts = await Wishlist.findAll();
    res.json(listOfTshirts);
});

router.post("/", async (req, res) => {
    const post = req.body;
    await Wishlist.create(post);
    res.json(post);
      
   
});




module.exports = router;