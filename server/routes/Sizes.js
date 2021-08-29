const express = require("express");
const router = express.Router();
const { Size, sequelize } = require('../models/');


router.get("/", async (req,res) => {


    const query= "SELECT size from sizes";
    const listOfSizes = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfSizes);
});



router.post("/", async (req,res) => {
  
    console.log(req.body);
    const size = req.body.size;

    console.log("sssssx");
    console.log(size);
   
    const query = "INSERT INTO sizes (size) VALUES ('" + size + "')";
    const addSize = await sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
    res.json(addSize); 

  

  
  

});


module.exports = router;