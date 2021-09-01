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
    const query1= "SELECT inventories.id, inventories.quantity, inventories.margin, colors.color, sizes.size, types.types FROM `inventories` INNER JOIN `colors` on inventories.colour_id=colors.id INNER JOIN `sizes` on inventories.size_id=sizes.id INNER JOIN `types` on inventories.type_id=types.id ";
    const listOfItems = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfItems);
});

router.get("/inventoryItem/:inventory_id", async (req,res) => {

    const inventory_id = req.params.inventory_id
  
    const query1= "SELECT inventories.id, inventories.quantity, inventories.margin, colors.color, sizes.size, types.types FROM `inventories` INNER JOIN `colors` on inventories.colour_id=colors.id INNER JOIN `sizes` on inventories.size_id=sizes.id INNER JOIN `types` on inventories.type_id=types.id WHERE inventories.id='" + inventory_id + "'";
    const listOfItem = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfItem);
});

router.get("/inventoryEdit/:inventory_id", async (req,res) => {

    const inventory_id = req.params.inventory_id

    const query1= "SELECT inventories.id, inventories.quantity, inventories.margin, colors.color, sizes.size, types.types FROM `inventories` INNER JOIN `colors` on inventories.colour_id=colors.id INNER JOIN `sizes` on inventories.size_id=sizes.id INNER JOIN `types` on inventories.type_id=types.id WHERE inventories.id='" + inventory_id + "'";
    const listOfItems = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfItems);
});


router.get("/sizes", async (req,res) => {


    const query= "SELECT size from sizes";
    const listOfSizes = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfSizes);
});

router.get("/types", async (req,res) => {


    const query= "SELECT types from types";
    const listOfTypes = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfTypes);
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

    
    // const checkQuery = "SELECT id from inventories where colour_id='" + id1 + "', size_id='" + id2 + "', type_id='" + id3 + "'";
    // const checkInventory = await sequelize.query(checkQuery, {type: sequelize.QueryTypes.SELECT});
    // console.log("ssssnew hiiii");
    // console.log(checkInventory);

    
    const count_query = "SELECT count(id) as co from `inventories` WHERE colour_id='" + id1 + "' AND size_id='" + id2 + "' AND type_id='" + id3 + "'";
    const count1 = await sequelize.query(count_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    const cnt = count1[0].co;
    console.log("count");

    console.log(cnt);


if(cnt==0){

    if(quantity>margin){

    const query = "INSERT INTO inventories (colour_id,size_id,type_id,quantity,margin) VALUES ('" + id1 + "','" + id2 + "','" + id3 + "','" + quantity + "','" + margin + "')";
    const addInvent = await sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
    res.json(addInvent); 

    }

}
    // else{

      
    // }
  

});


router.put("/inventory/:inventory_id", async (req,res) => {

    const inventory_id = req.params.inventory_id
  
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
    const colourID = colour_id[0].id;

    const size_id_query = "SELECT sizes.id FROM sizes WHERE sizes.size='" + size + "' ";
    const size_id = await sequelize.query(size_id_query, {type: sequelize.QueryTypes.SELECT});
    // res.json(size_id);
    const sizeID = size_id[0].id;

    const type_id_query = "SELECT types.id FROM types WHERE types.types='" + type + "' ";
    const type_id = await sequelize.query(type_id_query, {type: sequelize.QueryTypes.SELECT});
    // res.json(type_id);
    const typeID = type_id[0].id;

    const query = "UPDATE inventories SET colour_id='" + colourID + "', size_id='" + sizeID + "', type_id='" + typeID + "', quantity='" + quantity + "', margin='" + margin + "' WHERE inventories.id='" + inventory_id + "'";
    const updateInvent = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
    res.json(updateInvent); 
  

});

router.delete("/inventory", async (req,res) => {
  
    console.log(req.body);
    const id = req.body.id;
    const query = "DELETE FROM inventories WHERE inventories.id='" + id + "' ";

    const inventoryItemRemove = await sequelize.query(query, {type: sequelize.QueryTypes.DELETE});
    res.json(inventoryItemRemove);
});


module.exports = router;