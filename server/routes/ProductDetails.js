const express = require("express");
const router = express.Router();
const { ProductDetails } = require('../models');
// const multer = require('multer');
// const path = require('path');
// const storage = multer.diskStorage({
//     destination:(req, file, cb) => {
//         cb(null,'/images')
//     },
//     filename:(req, file, cb) => {
//         console.log(file)
//         cb(null, Date.now()+ path.extname(file.originalname))
//     }
// })
// const upload = multer({storage:storage});

router.get("/", async (req,res) => {
    const listOfForms = await  ProductDetails.findAll();
    res.json(listOfForms);
    // res.render("upload");
});

router.post("/",async (req, res) => {
    //     console.log(req.file);
        const post = req.body;
        await ProductDetails.create(post);
        res.json("success");
});

// router.get("/", async (req,res) => {
//     const listOfTshirts = await Wishlist.findAll();
//     res.json(listOfTshirts);
// });

// router.post("/", async (req, res) => {
//     const post = req.body;
//     await Wishlist.create(post);
//     res.json(post);
      
   
// });

// router.get("/",(req,res) => {
//     res.json("Hello World");
// });



module.exports = router;