const express = require("express");
const router = express.Router();
const { Inventory, sequelize } = require('../models/');

router.get("/inventory", async (req,res) => {
    const listOfItems = await Inventory.findAll();
    res.json(listOfItems);
});

// router.post("/inventory", (req, res) => {
//     const { colour, size, type, quantity, margin } = req.body;
      

//         const query= "SELECT id FROM colors WHERE colors.color='" + colour + "' ";
//         const ddd = await sequelize.query(query, {type: sequelize.QueryTypes.get});

//         console.log(ddd);

//         Inventory.create({
        
//             colour:colour ,
//             size:size,
//             type: type,
//             quantity: quantity,
//             margin: margin,
           
//         })
//         res.json("SUCCESS");
   
// });

router.post("/inventory", async (req,res) => {
  
    console.log(req.body);
    const colour = req.body.colour;
    const size = req.body.size;
    const type = req.body.type;
    const quantity = req.body.quantity;
    const margin = req.body.margin;

    const colour_id_query = "SELECT colors.id FROM colors WHERE colors.color='" + colour + "' ";
    const colour_id = await sequelize.query(colour_id_query, {type: sequelize.QueryTypes.SELECT});
    res.json(colour_id.colors.id);
    const id1 = colour_id.colors.id;

    const size_id_query = "SELECT sizes.id FROM sizes WHERE sizes.size='" + size + "' ";
    const size_id = await sequelize.query(size_id_query, {type: sequelize.QueryTypes.SELECT});
    // res.json(size_id);
    const id2 = size_id.id;

    const type_id_query = "SELECT types.id FROM types WHERE types.types='" + type + "' ";
    const type_id = await sequelize.query(type_id_query, {type: sequelize.QueryTypes.SELECT});
    // res.json(type_id);
    const id3 = type_id.id;

    // const id4 = 4;

     const query = "INSERT INTO inventories (colour_id,size_id,type_id,quantity,margin) VALUES ('" + id1 + "','" + id2 + "','" + id3 + "','" + quantity + "','" + margin + "')";
    const addInvent = await sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
    res.json(addInvent); 
  
   

    // const query = "INSERT INTO inventories (colour_id,size_id, type_id, quantity,margin) VALUES (colour_id,size_id, type_id, quantity,margin)";

    // const AddInventory = await sequelize.query(query, {type: sequelize.QueryTypes.post});
    // res.json(AddInventory);

        //      Inventory.create({
        
        //     colour_id:colour_id_ ,
        //     size_id:size_id,
        //     type_id: type_id,
        //     quantity: quantity,
        //     margin: margin,
           
        // })  


});

module.exports = router;