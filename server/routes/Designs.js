const express = require("express");
const router = express.Router();
const { Designs,sequelize } = require('../models/');

const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/designs')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const isImage = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('only jpeg and png Images is allowed..'));
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: isImage,
});

router.post("/", upload.single('photo'), async(req, res) => {


 
    const { designName,colour,types,price,collection_id } = req.body;

    
    const imagePath = 'public/designs/' + req.file.filename;

    const colour_id_query = "SELECT id FROM colors WHERE colors.color='" + colour + "' ";
    const colour_id = await sequelize.query(colour_id_query, {type: sequelize.QueryTypes.SELECT});
    // res.json(colour_id.colors.id);
    // console.log(colour_id[0].id);
    const id_colour = colour_id[0].id;

    const type_id_query = "SELECT types.id FROM types WHERE types.types='" + types + "' ";
    const type_id = await sequelize.query(type_id_query, {type: sequelize.QueryTypes.SELECT});
    // res.json(type_id);
    const id_type = type_id[0].id;

    Designs.create({
        collection_id:collection_id,
        design_name: designName,
        color_id:id_colour,
        type_id:id_type,
        coverImage: imagePath,
        price:price,
    })
    res.status(200).json({
        success: "Success"
    })
});

// router.get("/", async (req, res) => {
//     const listOfCollections = await Collections.findAll();
//     res.json(listOfCollections);
// });

router.get("/:collection_id", async (req,res) => {

    const collection_id = req.params.collection_id

// console.log(collection_id);

    const query= "SELECT designs.design_name, designs.coverImage, designs.price, colors.color, types.types, collections.collection_name from `designs` INNER JOIN `colors` ON designs.color_id= colors.id INNER JOIN `types` ON designs.type_id= types.id INNER JOIN `collections` ON designs.collection_id=collections.id WHERE designs.collection_id='" + collection_id + "'";
    // const query="SELECT * from `designs`";
    const listOfDesigns = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfDesigns);
});

router.delete("/remove", async (req,res) => {
  
    console.log(req.body);
    const id = req.body.id;
    const query = "DELETE FROM collections WHERE collections.id='" + id + "' ";

    const collectionRemove = await sequelize.query(query, {type: sequelize.QueryTypes.DELETE});
    res.json(collectionRemove);
});

module.exports = router;