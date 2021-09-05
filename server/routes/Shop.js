const express = require("express");
const router = express.Router();
const { Designs, sequelize } = require('../models');

router.get("/", async (req,res) => {
    const query ="SELECT *, 0 as isInWishList FROM `designs`  GROUP by design_name";
    const listOfDesignsDB = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(listOfDesignsDB);
    // res.render("upload");
});

router.get("/shops/:id", async (req,res) => {
    const uid = req.params.id;
    const query ="SELECT designs.id,designs.collection_id,designs.design_name,designs.color_id,designs.type_id,designs.coverImage,designs.price, CASE WHEN wishlists.itemId IS NULL THEN 0 ELSE 1 END AS isInWishList FROM `designs` LEFT JOIN wishlists ON wishlists.itemId = designs.id AND wishlists.userId = '"+uid+"' GROUP BY design_name";
   const listOfDesignsDB = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
   res.json(listOfDesignsDB);
    // res.render("upload");
});


router.get('/byId/:id', (req,res) => {
    const id = req.params.id
})

router.post("/",async (req, res) => {
    //console.log(req.file);
        const post = req.body;
        await Designs.create(post);
        res.json("success");
});

module.exports = router;