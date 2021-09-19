const express = require("express");
const router = express.Router();
const { Wishlist, sequelize } = require('../models');

router.get("/:uid", async (req,res) => {
    const uid = req.params.uid;
    const query = "SELECT designs.id,designs.coverImage, designs.design_name, designs.price, designs.discountedPrice, inventories.margin FROM wishlists INNER JOIN designs ON wishlists.itemId=designs.id INNER JOIN inventories ON inventories.colour_id=designs.color_id AND inventories.type_id=designs.type_id INNER JOIN sizes ON sizes.id=inventories.size_id WHERE wishlists.userId='"+uid+"' GROUP BY wishlists.itemId";
    const listOfTshirts = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(listOfTshirts);
});

router.put("/remove", async (req,res) => {
    try{
        const itemId = req.body.itemId;
        const uid = req.body.userId;
        const query = "DELETE FROM wishlists WHERE userId='"+uid+"' AND itemId='"+itemId+"'";
        const removewishlist = await sequelize.query(query, { type: sequelize.QueryTypes.DELETE });
        res.json({data:1});
    }
    catch(e){
        res.json({data:0});
    }
   
});

router.post("/", async (req, res) => {
    const post = req.body;
    await Wishlist.create(post);
    res.json(post);
      
   
});




module.exports = router;