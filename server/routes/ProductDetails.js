const { response } = require("express");
const express = require("express");
const router = express.Router();
const { Designs,sequelize } = require('../models');

router.get("/byId/:id", async (req,res) => {
    const id = req.params.id
    const query1 = "SELECT designs.designId,designs.color,designs.designName,designs.designImage,inventories.size,inventories.quantity,inventories.inventoryId FROM `designs` INNER JOIN `inventories` ON designs.color=inventories.colour WHERE inventories.colour=(SELECT designs.color FROM `designs` WHERE designs.designId='"+id+"') AND  designs.designId='"+id+"'";
    const sizeList = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});
    res.json(sizeList);
    // const product = await Designs.findByPk(id)
    // if(product){
        // const query1 = "SELECT color FROM `designs` WHERE designId='"+id+"'";
        // const sList = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});
        
        // console.log(res.json(sList));
        // res.json(sList.color);
        // const color = sList.color;
        
        // const query2 = "SELECT designs.designId,designs.color,inventories.size FROM `designs` INNER JOIN `inventories` ON designs.color=inventories.colour WHERE inventories.colour='"+color+"'"; 
        // const sizeList = await sequelize.query(query2, {type: sequelize.QueryTypes.SELECT});
        // res.json(sizeList);
    // }
    // res.json(product);
});

router.get("/byPid/:id", async (req,res) => {
    const id = req.params.id;
    const product = await Designs.findByPk(id)
    res.json(product);
});

// router.get("/size/:color", async (req,res) => {
//     const color = req.params.color;
//     const query = "SELECT designs.designId,designs.color,inventories.size FROM `designs` INNER JOIN `inventories` ON designs.color=inventories.colour WHERE inventories.colour='"+color+"'"; 
//     const sizeList = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
//     res.json(sizeList);
// });

router.get("/byIdImages/:id", async (req,res) => {
    const id = req.params.id
    const query2 = "SELECT designs.designId,designs.designName,designs.color,designs.designImage FROM `designs`  WHERE designs.designName=(SELECT designs.designName FROM `designs` WHERE designs.designId='"+id+"')";
    const imageList = await sequelize.query(query2, {type: sequelize.QueryTypes.SELECT});
    res.json(imageList);
});

router.get("/imagesArray/:id", async (req,res) => {
    const id = req.params.id
    const query2 = "SELECT designs.designId,designs.designImage FROM `designs`  WHERE designs.designName=(SELECT designs.designName FROM `designs` WHERE designs.designId='"+id+"')";
    const imageList = await sequelize.query(query2, {type: sequelize.QueryTypes.SELECT});
    res.json(imageList);
});

router.get("/mapSize/:id", async (req,res) => {
    const id = req.params.id
    const query1 = "SELECT designs.designId,designs.color,designs.designName,designs.designImage,inventories.size,inventories.quantity,inventories.inventoryId FROM `designs` INNER JOIN `inventories` ON designs.color=inventories.colour WHERE designs.designName=(SELECT designs.designName FROM `designs` WHERE designs.designId='"+id+"') ";
    const designSizeList = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});
    res.json(designSizeList);
});

router.get("/quantity/:id", async (req,res) => {
    const id = req.params.id
    const query1 = "SELECT inventories.quantity FROM designs INNER JOIN inventories ON designs.color=inventories.colour WHERE inventories.colour=(SELECT designs.color FROM designs WHERE designs.designId='"+id+"') AND  designs.designId='"+id+"'";
    const designSizeList = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});
    res.json(designSizeList);
});

// router.post("/",async (req, res) => {
//     //     console.log(req.file);
//         const post = req.body;
//         await ProductDetails.create(post);
//         res.json("success");
// });

module.exports = router;