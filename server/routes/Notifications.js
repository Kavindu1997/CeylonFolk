const express = require("express");
const router = express.Router();
const { Contactus,sequelize } = require('../models/');

router.get("/", async (req,res) => {

  
  
    const query= "SELECT * from `contactus` ";
    const listOfNotifications = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfNotifications);
});


module.exports = router;