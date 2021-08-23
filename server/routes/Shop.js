const express = require("express");
const router = express.Router();
const { Designs } = require('../models');

router.get("/", async (req,res) => {
    const listOfDesigns = await  Designs.findAll({group:['design_name']});
    res.json(listOfDesigns);
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