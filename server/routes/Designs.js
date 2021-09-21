const express = require("express");
const router = express.Router();
const { Designs,sequelize } = require('../models/');

const designController = require('../controller/design.controller');

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

try {
  
    const { designName,color,types,price,collection_id } = req.body;
    const imagePath = 'public/designs/' + req.file.filename;
    const colour_id_query = "SELECT id FROM colors WHERE colors.color='" + color + "' ";
    const colour_id = await sequelize.query(colour_id_query, {type: sequelize.QueryTypes.SELECT});
    
    const id_colour = colour_id[0].id;

    const type_id_query = "SELECT types.id FROM types WHERE types.types='" + types + "' ";
    const type_id = await sequelize.query(type_id_query, {type: sequelize.QueryTypes.SELECT});
    const id_type = type_id[0].id;

    const count = "SELECT count(id) as cnt FROM `inventories` where inventories.colour_id='" + id_colour + "' AND inventories.type_id='" + id_type + "'";
    const countInventory = await sequelize.query(count, {type: sequelize.QueryTypes.SELECT});
  

    const countDesignsQuery = "SELECT count(id) as count FROM `designs` where designs.design_name='" + designName + "'";
    const countDesigns = await sequelize.query(countDesignsQuery, {type: sequelize.QueryTypes.SELECT});
 
  
if(countDesigns[0].count==0){
    if(countInventory[0].cnt!=0){
        if(price>0 && color!=''){

            Designs.create({
                collection_id:collection_id,
                design_name: designName,
                color_id:id_colour,
                type_id:id_type,
                coverImage: imagePath,
                price:price,
            })
            res.json({ data: 1 });
        }
        else{
            res.json({ data: 4 }); 
        }


    
}
else{

    res.json({ data: 2 });
}

}
else{
    res.json({ data: 3 });

}


  
}
catch (e) {
    res.json({ data: 0 });
}
 

});

// router.get("/", async (req, res) => {
//     const listOfCollections = await Collections.findAll();
//     res.json(listOfCollections);
// });

router.get("/:collection_id", async (req,res) => {

    const collection_id = req.params.collection_id

//console.log(collection_id);

    // const query= "SELECT designs.design_name, designs.coverImage, designs.price, colors.color, types.types, collections.collection_name from `designs` INNER JOIN `colors` ON designs.color_id= colors.id INNER JOIN `types` ON designs.type_id= types.id INNER JOIN `collections` ON designs.collection_id=collections.id WHERE designs.collection_id='" + collection_id + "'";

    const query="SELECT designs.id,designs.design_name, designs.coverImage, designs.price, types.types, colors.color from `designs` INNER JOIN `types` ON designs.type_id= types.id INNER JOIN `colors` ON designs.color_id= colors.id  WHERE designs.collection_id='" + collection_id + "'";
    const listOfDesigns = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    console.log("dddd");
    console.log(listOfDesigns);
    res.json(listOfDesigns);
});

router.get("/viewDesign/:collection_id", async (req,res) => {

  

//console.log(collection_id);

    // const query= "SELECT designs.design_name, designs.coverImage, designs.price, colors.color, types.types, collections.collection_name from `designs` INNER JOIN `colors` ON designs.color_id= colors.id INNER JOIN `types` ON designs.type_id= types.id INNER JOIN `collections` ON designs.collection_id=collections.id WHERE designs.collection_id='" + collection_id + "'";

    const query="SELECT designs.design_name, designs.coverImage, designs.price, types.types, colors.color, collections.collection_name from `designs` INNER JOIN `types` ON designs.type_id= types.id INNER JOIN `colors` ON designs.color_id= colors.id INNER JOIN `collections` on designs.collection_id=collections.id ";
    const listOfDesigns = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    console.log("dddd");
    console.log(listOfDesigns);
    res.json(listOfDesigns);
});

router.delete("/remove", async (req,res) => {
  
    console.log(req.body);
    const id = req.body.id;
    const query = "DELETE FROM collections WHERE collections.id='" + id + "' ";

    const collectionRemove = await sequelize.query(query, {type: sequelize.QueryTypes.DELETE});
    res.json(collectionRemove);
});

// router.put("/edit/:design_id", upload.single('photo'), async(req, res) => {
//     const design_id = req.params.design_id
//     const { designName,color,types,price,collection_id } = req.body;
//     const imagePath = 'public/designs/' + req.file.filename;

//     console.log("sssss");

//     const colour_id_query = "SELECT id FROM colors WHERE colors.color='" + color + "' ";
//     const colour_id = await sequelize.query(colour_id_query, {type: sequelize.QueryTypes.SELECT});
//     // res.json(colour_id.colors.id);
//     // console.log(colour_id[0].id);
//     const id_colour = colour_id[0].id;

//     const type_id_query = "SELECT types.id FROM types WHERE types.types='" + types + "' ";
//     const type_id = await sequelize.query(type_id_query, {type: sequelize.QueryTypes.SELECT});
//     // res.json(type_id);
//     const id_type = type_id[0].id;

//     const query = "UPDATE designs SET collection_id='" + collection_id + "' ,design_name='" + designName + "' ,color_id='" + id_colour+ "',type_id='" + id_type + "', coverImage='" + imagePath + "', price='" + price + "' WHERE designs.id='" + design_id + "'";
//     const updateDesign = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
//     res.json(updateDesign); 
//     res.status(200).json({
//         success: "Success"
//     })
// });


router.put("/editImage/:design_id", upload.single('photo'), async(req, res) => {
  
    try {
   
        const design_id = req.params.design_id
        const imagePath = 'public/designs/' + req.file.filename;
    
        const query = "UPDATE designs SET coverImage='" + imagePath + "'WHERE designs.id='" + design_id + "'";
        const updateDesign = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
       
        res.json({ data: 1 });
    }
    catch (e) {
        res.json({ data: 0 });
    }


});

router.put("/editPrice/:design_id", async(req, res) => {
   
    try {
        const design_id = req.params.design_id
        const price= req.body.price;

        if(price>0){
            const query = "UPDATE designs SET price='" + price + "'WHERE designs.id='" + design_id + "'";
            const updateDesign = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
            res.json({ data: 1 });
        }
        else{
            res.json({ data: 2 });  
        }
    
     
    }
    catch (e) {
        res.json({ data: 0 });
    }


});

router.put("/editDesignName/:design_id", async(req, res) => {
  

try {
   
    const design_id = req.params.design_id
    const designName= req.body.designName;

    const countDesignsQuery = "SELECT count(id) as count FROM `designs` where designs.design_name='" + designName + "'";
    const countDesigns = await sequelize.query(countDesignsQuery, {type: sequelize.QueryTypes.SELECT});

    if(countDesigns[0].count==0){
    const query = "UPDATE designs SET design_name='" + designName + "'WHERE designs.id='" + design_id + "'";
    const updateDesign = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
    
    res.json({ data: 1 });
}
else{

    res.json({ data: 2 });
}

   
}
catch (e) {
    res.json({ data: 0 });
}

});



router.delete("/", async (req,res) => {

    try{
        console.log(req.body);
        const id = req.body.id;
        const query = "DELETE FROM designs WHERE designs.id='" + id + "' ";
    
        const designRemove = await sequelize.query(query, {type: sequelize.QueryTypes.DELETE});
        res.json({data:1});
    }
    catch(e){
        res.json({data:0});
    }

});

router.get("/oneDesign/:design_id", async (req,res) => {

    const design_id = req.params.design_id
  
    const query1= "SELECT designs.id, designs.design_name, designs.coverImage, designs.price from `designs` WHERE designs.id='" + design_id + "'";
    const listOfDesign = await sequelize.query(query1, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfDesign);
});

router.get('/searchRecordDesignName/:search',designController.getDesignByDesignName);
router.get('/searchRecordCollectionName/:search',designController.getDesignByCollectionName);
router.get('/searchRecordType/:search',designController.getDesignByType);
router.get('/searchRecordPrice/:search',designController.getDesignByPrice);

module.exports = router;