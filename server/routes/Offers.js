const express = require("express");
const router = express.Router();
const { Offers, sequelize } = require('../models/');


router.get("/", async (req,res) => {

    let today = new Date().toISOString().slice(0, 10)
    const query1 = "DELETE FROM offers WHERE offers.to <'"+today+"'  ";

    const deleteOffersRemove = await sequelize.query(query1, {type: sequelize.QueryTypes.DELETE});

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

    const count = "SELECT count(id) as cnt FROM `offers` where offers.collection_id='" + collection_id + "' ";
    const countOffers = await sequelize.query(count, {type: sequelize.QueryTypes.SELECT});

    if(rate<100 && rate >0 && from < to && countOffers[0].cnt==0){

    Offers.create({
        collection_id: collection_id,
        rate:rate,
        from: from,
        to:to
    })
    res.json("SUCCESS");
    console.log("success")

    // const queryInsert = "INSERT INTO offers (collection_id,rate,from,to) VALUES ('" + collection_id + "','" + rate + "','" + from + "','" + to + "')";
    // const addSize = await sequelize.query(queryInsert, {type: sequelize.QueryTypes.INSERT});

    const queryCount= "SELECT count(id) as count FROM `designs` WHERE designs.collection_id='" + collection_id + "' ";
    const Countoffers = await sequelize.query(queryCount, {type: sequelize.QueryTypes.SELECT});
    console.log(Countoffers[0].count);
    const cnt=Countoffers[0].count;

    // const queryNew = "SELECT designs.id as design_id, designs.price as design_price, count(id) as count FROM `designs` WHERE designs.collection_id='" + collection_id + "' ";
    const queryNew = "SELECT * FROM `designs` WHERE designs.collection_id='" + collection_id + "' ";
    const NewOffer = await sequelize.query(queryNew, {type: sequelize.QueryTypes.SELECT});
    console.log("new");
    // console.log(NewOffer[0].design_id);
    // // console.log(NewOffer[1].design_id);
    // console.log(NewOffer[0].design_price);
    // console.log(NewOffer[0].count);
    console.log(NewOffer);
    console.log(NewOffer[0].id);
    console.log(NewOffer[1].id);
    // console.log(NewOffer[0].design_price);

   

    for (let i = 0; i < cnt; i++) {

        const design_id=NewOffer[i].id;
        const price=NewOffer[i].price;
        const discounted_price = price- price*(rate/100);
        console.log("datacorrect=",discounted_price);

        const queryDesign = "UPDATE designs SET discountedPrice='" + discounted_price + "'  WHERE designs.id='" + design_id + "' ";
        const updateColllection = await sequelize.query(queryDesign, {type: sequelize.QueryTypes.UPDATE});


    }

 
}


//    console.log(rate);


    // res.json(addInvent); 

   
  
  

});


module.exports = router;