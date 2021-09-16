const express = require("express");
const router = express.Router();
const { Collections,sequelize } = require('../models/');

const collectionController = require('../controller/collection.controller');

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
async(req, res) => {
    const { collectionName } = req.body;
    const imagePath = 'public/collections/' + req.file.filename;

    const count = "SELECT count(id) as cnt FROM `collections` where collections.collection_name='" + collectionName + "' ";
    const countCollections = await sequelize.query(count, {type: sequelize.QueryTypes.SELECT});
    // console.log(countColors[0].cnt);

    if(countCollections[0].cnt==0){

    
    Collections.create({
        collection_name: collectionName,
        coverImage: imagePath
    })
    res.status(200).json({
        success: "Success"
    })
}
}
);

router.get("/", async (req, res) => {
    const listOfCollections = await Collections.findAll();
    res.json(listOfCollections);
});

router.delete("/remove", async (req,res) => {
  
   

    try{
        console.log(req.body);
        const id = req.body.id;
        const query = "DELETE FROM collections WHERE collections.id='" + id + "' ";
        const collectionRemove = await sequelize.query(query, {type: sequelize.QueryTypes.DELETE});

        const queryDeleteDesign = "DELETE FROM designs WHERE designs.collection_id='" + id + "' ";
        const designsRemove = await sequelize.query(queryDeleteDesign, {type: sequelize.QueryTypes.DELETE});
        // res.json(collectionRemove);
        res.json({data:1});
    }
    catch(e){
        res.json({data:0});
    }

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

router.get('/searchRecord/:search',collectionController.getCollectionByName);

// router.get("/searchRecord/:search", async (req,res) => {

//     const search = req.params.search
//     dbConn.query('SELECT collections.collection_name FROM `collections` WHERE collection_name LIKE ?', search+'%' , (err, res)=>{
//         if(err){
//             console.log('Error while fetching employee by id', err);
//             result(null, err);
//         }else{
//             result(null, res);
//         }
//     })

// });

module.exports = router;