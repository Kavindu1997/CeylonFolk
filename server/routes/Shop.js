const express = require("express");
const router = express.Router();
const { Designs, sequelize } = require('../models');

router.get("/", async (req,res) => {
    const listOfDesigns = await  Designs.findAll({group:['design_name']});
    res.json(listOfDesigns);
    // res.render("upload");
});

router.get("/shop/:id", async (req,res) => {
    const id = req.params.id
    console.log(id)
    const query = "SELECT * FROM designs WHERE type_id='"+id+"'";
        const listOftypes = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(listOftypes);
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