const express = require("express");
const router = express.Router();
const { Size, sequelize } = require('../models/');


router.get("/", async (req,res) => {


    const query= "SELECT id,size from sizes";
    const listOfSizes = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfSizes);
});



router.post("/", async (req,res) => {
  
    try{
       
        const size = req.body.size;
    
        const count = "SELECT count(id) as cnt FROM `sizes` where sizes.size='" + size + "'";
        const countSizes = await sequelize.query(count, {type: sequelize.QueryTypes.SELECT});
     

        if(countSizes[0].cnt==0){
            const query = "INSERT INTO sizes (size) VALUES ('" + size + "')";
        const addSize = await sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
       
        res.json({data:1});
        }
        else{
            res.json({data:2});
        }
       
        
    }
    catch(e){
        res.json({data:0});
    }


});

router.delete("/", async (req,res) => {

    try{
        console.log(req.body);
        const id = req.body.id;
        const query = "DELETE FROM sizes WHERE sizes.id='" + id + "' ";
    
        const sizeRemove = await sequelize.query(query, {type: sequelize.QueryTypes.DELETE});

        const removeInventoryQuery = "DELETE FROM inventories WHERE inventories.size_id='" + id + "' ";
    
        const inventoryRemove = await sequelize.query(removeInventoryQuery, {type: sequelize.QueryTypes.DELETE});
        res.json({data:1});
    }
    catch(e){
        res.json({data:0});
    }


});

module.exports = router;