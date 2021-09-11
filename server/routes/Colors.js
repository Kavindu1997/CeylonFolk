const express = require("express");
const router = express.Router();
const { Colors, sequelize } = require('../models/');

router.post("/", (req, res) => {
    const { color,color_name, price } = req.body;
        // console.log(fullName)
        Colors.create({
            color: color,
            color_name:color_name,
            price: price
        })
        res.json("SUCCESS");

});

router.get("/fetchColors", async (req,res) => {
    const query = "SELECT id, color,color_name, price FROM `colors`";
    const colorList = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    res.json(colorList);
});

module.exports = router;