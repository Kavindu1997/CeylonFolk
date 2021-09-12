const express = require("express");
const router = express.Router();
const { Offers, sequelize } = require('../models/');


router.get("/", async (req,res) => {


    const query= "SELECT offers.collection_id,offers.rate,offers.from,offers.to, collections.collection_name from `offers` INNER JOIN `collections` ON offers.collection_id=collections.id";
    const listOfOffers = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfOffers);
});



router.post("/", async (req,res) => {
    
    const query= "SELECT * from offers";
    const listOfOffers = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    // console.log(listOfOffers);

    const { collection_id,rate, from,to } = req.body;
    // console.log(fullName)
    Offers.create({
        collection_id: collection_id,
        rate:rate,
        from: from,
        to:to
    })
    res.json("SUCCESS");
  
  

});


module.exports = router;