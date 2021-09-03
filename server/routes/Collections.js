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

router.post("/", upload.single('photo'), 
(req, res) => {
    const { collectionName } = req.body;
    const imagePath = 'public/collections/' + req.file.filename;
    Collections.create({
        collection_name: collectionName,
        coverImage: imagePath
    })
    res.status(200).json({
        success: "Success"
    })
}
);

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

module.exports = router;