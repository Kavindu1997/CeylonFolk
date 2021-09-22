const express = require("express");
const router = express.Router();
const { Offers, sequelize } = require('../models/');


router.get("/", async (req,res) => {

    let today = new Date().toISOString().slice(0, 10)
    // const query1 = "DELETE FROM offers WHERE offers.to <'"+today+"'  ";
    // const deleteOffersRemove = await sequelize.query(query1, {type: sequelize.QueryTypes.DELETE});

    // const queryUpdateDesign = "UPDATE designs SET discountedPrice=null  WHERE designs.collection_id='" + id + "' ";
    // const updateDesign = await sequelize.query(queryUpdateDesign, {type: sequelize.QueryTypes.UPDATE});

    const query= "SELECT offers.collection_id,offers.rate,offers.from,offers.to, collections.collection_name from `offers` INNER JOIN `collections` ON offers.collection_id=collections.id";
    const listOfOffers = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfOffers);
});

router.get("/offerItem/:collection_id", async (req,res) => {

    const collection_id = req.params.collection_id;

    const query= "SELECT offers.rate,offers.to from `offers` WHERE offers.collection_id='" + collection_id + "' ";
    const listOfOffers = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfOffers);
});


router.post("/", async (req,res) => {
 

try{

      
    const today = new Date().toISOString().slice(0, 10);
    console.log("checkdate");
    console.log(today);
    const query= "SELECT * from offers";
    const listOfOffers = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    

    const { collection_id,rate,to } = req.body;
   

    const count = "SELECT count(id) as cnt FROM `offers` where offers.collection_id='" + collection_id + "' ";
    const countOffers = await sequelize.query(count, {type: sequelize.QueryTypes.SELECT});

    if(collection_id!=null){

        if( countOffers[0].cnt==0){
          
        if(to>=today){
        if(rate<100 && rate >0 ){

            Offers.create({
                collection_id: collection_id,
                rate:rate,
                from: today,
                to:to
            })
        
            const queryCount= "SELECT count(id) as count FROM `designs` WHERE designs.collection_id='" + collection_id + "' ";
            const Countoffers = await sequelize.query(queryCount, {type: sequelize.QueryTypes.SELECT});
            const cnt=Countoffers[0].count;
        
            const queryNew = "SELECT * FROM `designs` WHERE designs.collection_id='" + collection_id + "' ";
            const NewOffer = await sequelize.query(queryNew, {type: sequelize.QueryTypes.SELECT});
        
            for (let i = 0; i < cnt; i++) {
        
                const design_id=NewOffer[i].id;
                const price=NewOffer[i].price;
                const discounted_price = price- price*(rate/100);
                console.log("datacorrect=",discounted_price);
        
                const queryDesign = "UPDATE designs SET discountedPrice='" + discounted_price + "'  WHERE designs.id='" + design_id + "' ";
                const updateColllection = await sequelize.query(queryDesign, {type: sequelize.QueryTypes.UPDATE});
        
        
            }
            res.json({data:1});
         
        }
        else{
        
            res.json({data:3});
        }
    }
    else{
        res.json({data:4});
    }
    }
    else{
        res.json({data:5});
    }
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
    
        const query = "DELETE FROM offers WHERE offers.collection_id='" + id + "' ";
        const offerRemove = await sequelize.query(query, {type: sequelize.QueryTypes.DELETE});

        const queryUpdateDesign = "UPDATE designs SET discountedPrice=null  WHERE designs.collection_id='" + id + "' ";
        const updateDesign = await sequelize.query(queryUpdateDesign, {type: sequelize.QueryTypes.UPDATE});
       
        res.json({data:1});
    }
    catch(e){
        res.json({data:0});
    }


});


router.put("/:collection_id", async (req,res) => {

              try {
          
                const collection_id = req.params.collection_id;
                const today = new Date().toISOString().slice(0, 10);
                const rate = req.body.rate;
                const to = req.body.to;
            
          
                    if(rate=='' && to!=null){
            
                        if(to>=today){
            
                            
                        const query = "UPDATE offers SET offers.to='" + to + "' WHERE offers.collection_id='" + collection_id + "'";
                        const updateOffers = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
                        res.json({ data: 1 });
                        }
                        else{
                            res.json({ data: 2 });
                        }
                
                    }
                    else if(rate!='' && to==''){
            
                        if(rate<100 && rate >0){
                     
                            const query = "UPDATE offers SET rate='" + rate + "' WHERE offers.collection_id='" + collection_id + "'";
                            const updateOffers = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
                         
            
            
            // update design table with new rate
                            const queryCount= "SELECT count(id) as count FROM `designs` WHERE designs.collection_id='" + collection_id + "' ";
                            const Countoffers = await sequelize.query(queryCount, {type: sequelize.QueryTypes.SELECT});
                            const cnt=Countoffers[0].count;
                        
                            const queryNew = "SELECT * FROM `designs` WHERE designs.collection_id='" + collection_id + "' ";
                            const NewOffer = await sequelize.query(queryNew, {type: sequelize.QueryTypes.SELECT});
                        
                            for (let i = 0; i < cnt; i++) {
                        
                                const design_id=NewOffer[i].id;
                                const price=NewOffer[i].price;
                                const discounted_price = price- price*(rate/100);
                        
                                const queryDesign = "UPDATE designs SET discountedPrice='" + discounted_price + "'  WHERE designs.id='" + design_id + "' ";
                                const updateColllection = await sequelize.query(queryDesign, {type: sequelize.QueryTypes.UPDATE});
                        
                        
                            }
                            res.json({ data: 1 });
            
                        }
                        else{
                            res.json({ data: 3 });
                        }
                        
                  
                    }
                    else if(rate!='' && to!=''){
                        if(rate<100 && rate >0 ){
                        if(to>=today){
            
                            const query = "UPDATE offers SET rate='" + rate + "',offers.to='" + to + "'   WHERE offers.collection_id='" + collection_id + "'";
                            const updateOffers = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
                            res.json({ data: 1 });

                                  // update design table with new rate
                        const queryCount= "SELECT count(id) as count FROM `designs` WHERE designs.collection_id='" + collection_id + "' ";
                        const Countoffers = await sequelize.query(queryCount, {type: sequelize.QueryTypes.SELECT});
                       
                        const cnt=Countoffers[0].count;
                    
                        const queryNew = "SELECT * FROM `designs` WHERE designs.collection_id='" + collection_id + "' ";
                        const NewOffer = await sequelize.query(queryNew, {type: sequelize.QueryTypes.SELECT});
                    
                        for (let i = 0; i < cnt; i++) {
                    
                            const design_id=NewOffer[i].id;
                            const price=NewOffer[i].price;
                            const discounted_price = price- price*(rate/100);
                            
                    
                            const queryDesign = "UPDATE designs SET discountedPrice='" + discounted_price + "'  WHERE designs.id='" + design_id + "' ";
                            const updateColllection = await sequelize.query(queryDesign, {type: sequelize.QueryTypes.UPDATE});
                    
                    
                        }
                        res.json({ data: 1 });
                        }
                        else{
                            res.json({ data: 2}); 
                        }
                    }
                    else{
                        res.json({ data: 3}); 
                    }
                                 
                    }
                       
            
               
            }
            catch (e) {
                res.json({ data: 0 });
            }
});

module.exports = router;