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

        const queryInventory = "DELETE FROM inventories WHERE colour_id='" + id + "' ";
        const inventoryRemove = await sequelize.query(queryInventory, {type: sequelize.QueryTypes.DELETE});

        const queryDesigns = "DELETE FROM designs WHERE color_id='" + id + "' ";
        const designRemove = await sequelize.query(queryDesigns, {type: sequelize.QueryTypes.DELETE});

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

router.get("/fetchColors/:colour_id", async (req,res) => {

    const colour_id = req.params.colour_id;
    const query = "SELECT id, color,color_name, price FROM `colors` WHERE id='" + colour_id + "'";
    const colorList = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    console.log(colorList);
    res.json(colorList);
});

router.put("/editColorName/:colour_id", async(req, res) => {
    const colour_id = req.params.colour_id;
    const colorName= req.body.colorName;

    const query = "UPDATE colors SET color_name='" + colorName + "'WHERE colors.id='" + colour_id + "'";
    const updateColors = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
    res.json(updateColors); 
    res.status(200).json({
        success: "Success"
    })
});

router.put("/editPrice/:colour_id", async(req, res) => {
    const colour_id = req.params.colour_id;
    const price= req.body.price;

    const query = "UPDATE colors SET price='" + price + "'WHERE colors.id='" + colour_id + "'";
    const updatePrice = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
    res.json(updatePrice); 
    res.status(200).json({
        success: "Success"
    })
});



module.exports = router;