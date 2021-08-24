const express = require("express");
const router = express.Router();
const { Inventory, sequelize } = require('../models/');

router.get("/inventory", async (req,res) => {
    // const listOfItems = await Inventory.findAll();

    // const query1= "SELECT color FROM colors ";
    // const colour = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});
    // res.json(colour_id.colors.id);
    // console.log(colour_id[0].id);
    // const id1 = colour_id[0].id;


    // const query1= "SELECT inventories.quantity, inventories.margin, colors.color, sizes.size, types.types FROM `inventories` INNER JOIN `colors ` on inventories.colour_id = colors.id INNER JOIN `sizes` on inventories.size_id= sizes.id INNER JOIN `types` on inventories.type_id=types.id  ";
   
    // const allInvent= await sequelize.query(query4, {type: sequelize.QueryTypes.SELECT});

    // const query1= "SELECT inventories.quantity, inventories.margin, colors.color FROM `inventories` INNER JOIN `colors ` on inventories.colour_id = colors.id  ";
    const query1= "SELECT inventories.quantity, inventories.margin, colors.color, sizes.size, types.types FROM `inventories` INNER JOIN `colors` on inventories.colour_id=colors.id INNER JOIN `sizes` on inventories.size_id=sizes.id INNER JOIN `types` on inventories.type_id=types.id ";
    const listOfItems = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfItems);
});


router.post("/inventory", async (req,res) => {
  
    console.log(req.body);
    const colour = req.body.color;
    const size = req.body.size;
    const type = req.body.type;
    const quantity = req.body.quantity;
    const margin = req.body.margin;

    const colour_id_query = "SELECT id FROM colors WHERE colors.color='" + colour + "' ";
    const colour_id = await sequelize.query(colour_id_query, {type: sequelize.QueryTypes.SELECT});
    // res.json(colour_id.colors.id);
    console.log(colour_id[0].id);
    const id1 = colour_id[0].id;

    const size_id_query = "SELECT sizes.id FROM sizes WHERE sizes.size='" + size + "' ";
    const size_id = await sequelize.query(size_id_query, {type: sequelize.QueryTypes.SELECT});
    // res.json(size_id);
    const id2 = size_id[0].id;

    const type_id_query = "SELECT types.id FROM types WHERE types.types='" + type + "' ";
    const type_id = await sequelize.query(type_id_query, {type: sequelize.QueryTypes.SELECT});
    // res.json(type_id);
    const id3 = type_id[0].id;

    const query = "INSERT INTO inventories (colour_id,size_id,type_id,quantity,margin) VALUES ('" + id1 + "','" + id2 + "','" + id3 + "','" + quantity + "','" + margin + "')";
    const addInvent = await sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
    res.json(addInvent); 
  

});



module.exports = router;