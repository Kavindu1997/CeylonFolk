const express = require("express");
const router = express.Router();
const { Colors, sequelize } = require('../models/');

router.post("/", async(req, res) => {
  
        console.log(req.body);
        const color = req.body.color;
        const color_name = req.body.color_name;
        const price = req.body.price;
    
        const count = "SELECT count(id) as cnt FROM `colors` where colors.color='" + color + "' or colors.color_name='" + color_name + "'";
        const countColors = await sequelize.query(count, {type: sequelize.QueryTypes.SELECT});
        console.log(countColors[0].cnt);

        if(countColors[0].cnt==0){
            const query = "INSERT INTO colors (color,color_name,price) VALUES ('" + color + "','" + color_name + "','" + price + "')";
        const addColors = await sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
        // res.json(addSize); 
        res.json({data:1});
        }
        else{
            res.json({data:0});
        }

});

router.delete("/", async (req,res) => {

    try{
        // console.log(req.body);
        const id = req.body.id;
        const query = "DELETE FROM colors WHERE colors.id='" + id + "' ";
    
        const colorRemove = await sequelize.query(query, {type: sequelize.QueryTypes.DELETE});
        res.json({data:1});
    }
    catch(e){
        res.json({data:0});
    }


});

router.get("/fetchColors", async (req,res) => {
    const query = "SELECT id, color,color_name, price FROM `colors`";
    const colorList = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    res.json(colorList);
});

module.exports = router;