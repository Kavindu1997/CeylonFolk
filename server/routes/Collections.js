const express = require("express");
const router = express.Router();
const { Collections,sequelize } = require('../models/');

const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/collections')
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

router.post("/", upload.single('photo'), (req, res) => {
    const { collectionName } = req.body;
    const imagePath = 'public/collections/' + req.file.filename;
    Collections.create({
        collection_name: collectionName,
        coverImage: imagePath
    })
    res.status(200).json({
        success: "Success"
    })
});

router.get("/", async (req, res) => {
    const listOfCollections = await Collections.findAll();
    res.json(listOfCollections);
});

router.delete("/remove", async (req,res) => {
  
    console.log(req.body);
    const id = req.body.id;
    const query = "DELETE FROM collections WHERE collections.id='" + id + "' ";

    const collectionRemove = await sequelize.query(query, {type: sequelize.QueryTypes.DELETE});
    res.json(collectionRemove);
});


router.put("/edit/:collection_id", upload.single('photo'), async(req, res) => {
    const collection_id = req.params.collection_id
    const { collectionName } = req.body;
    const imagePath = 'public/collections/' + req.file.filename;
    // Collections.create({
    //     collection_name: collectionName,
    //     coverImage: imagePath
    // })
    
    const query = "UPDATE collections SET collection_name='" + collectionName + "' , coverImage='" + imagePath + "' WHERE collections.id='" + collection_id + "'";
    const updateColllection = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
    res.json(updateColllection); 
    res.status(200).json({
        success: "Success"
    })
});

// router.put("/edit/:collection_id",  upload.single('photo'), async(req,res) => {

//     const collection_id = req.params.collection_id
  
//     console.log(req.body);
//     const collection_name = req.body.collectionName;
//     const imagePath = 'public/collections/' + req.file.filename;

//     const query = "UPDATE collections SET collection_name='" + collection_name + "' coverImage='" + imagePath + "' WHERE collections.id='" + collection_id + "'";
//     const updateColllection = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
//     res.json(updateColllection); 
  

// });

router.get("/oneCollection/:collection_id", async (req,res) => {

    const collection_id = req.params.collection_id
  
    const query1= "SELECT collections.id, collections.collection_name, collections.coverImage from `collections` WHERE collections.id='" + collection_id + "'";
    const listOfCollection = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfCollection);
});

module.exports = router;