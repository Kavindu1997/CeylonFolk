const express = require("express");
const router = express.Router();
const { Types,sequelize } = require('../models/');

const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/tshirt_types')
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
 
try{
  

    const { types,price} = req.body;

    const count = "SELECT count(id) as cnt FROM `types` where types.types='" + types + "'";
    const countTypes = await sequelize.query(count, {type: sequelize.QueryTypes.SELECT});
    
    const imagePath = 'public/tshirt_types/' + req.file.filename;

    if(price>0){

        if(countTypes[0].cnt==0){
            Types.create({
                types:types,
                coverImage: imagePath,
                price:price,
            })
            res.status(200).json({
                success: "Success"
            })
        
            res.json({data:1});
        }
        else{
            res.json({data:3}); 
        }

    }
    else{
        res.json({data:2}); 
    }

    
}
catch(e){
    res.json({data:0});
}


});

router.get("/", async (req, res) => {
    const listOfTypes = await Types.findAll();
    res.json(listOfTypes);
});

router.get("/:types_id", async (req,res) => {

    const types_id = req.params.types_id;

    const query= "SELECT * from `types` WHERE types.id='" + types_id + "' ";
    const listOfTypes = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    res.json(listOfTypes);
});

router.delete("/", async (req,res) => {

    try{
        console.log(req.body);
        const id = req.body.id;
        const query = "DELETE FROM types WHERE types.id='" + id + "' ";
        const typeRemove = await sequelize.query(query, {type: sequelize.QueryTypes.DELETE});

        const queryInventory = "DELETE FROM inventories WHERE type_id='" + id + "' ";
        const inventoryRemove = await sequelize.query(queryInventory, {type: sequelize.QueryTypes.DELETE});

        const queryDesigns = "DELETE FROM designs WHERE type_id='" + id + "' ";
        const designRemove = await sequelize.query(queryDesigns, {type: sequelize.QueryTypes.DELETE});

        res.json({data:1});
    }
    catch(e){
        res.json({data:0});
    }


});



router.put("/:types_id", async (req,res) => {

   
            try {
               
                const types_id = req.params.types_id;
                const types = req.body.types;
                const price= req.body.price;
    
            
                    if(types=='' && price!=''){
                        if(price>0){
                            const query = "UPDATE types SET price='" + price + "' WHERE types.id='" + types_id + "'";
                            const updateTypes = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
                            res.json({ data: 1 });

                        }
                        else{
                            res.json({ data: 0 });
                        }
                          
                
                    }
                    else if(types!='' && price==''){

                        const count = "SELECT count(id) as cnt FROM `types` where types.types='" + types + "'";
                        const countTypes = await sequelize.query(count, {type: sequelize.QueryTypes.SELECT});

                        if(countTypes[0].cnt==0){
                            const query = "UPDATE types SET types='" + types + "' WHERE types.id='" + types_id + "'";
                        const updateTypes = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
                        res.json({ data: 1 });
                  
                        }
                        else{
                            res.json({ data: 0 });
                        }
            
                        
                    }
                    else if(types!='' && price!=''){
                        const count = "SELECT count(id) as cnt FROM `types` where types.types='" + types + "'";
                        const countTypes = await sequelize.query(count, {type: sequelize.QueryTypes.SELECT});

                        if(price>0){

                            if(countTypes[0].cnt==0){
                                const query = "UPDATE types SET types='" + types + "',price='" + price + "' WHERE types.id='" + types_id + "'";
                            const updateTypes = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
                            res.json({ data: 1 });
                            }
                            else{
                                res.json({ data: 0 });
                            }
                            
                
                        }
                        else{
                            res.json({ data: 0 });
                        }
            
                          
                        }
                        else{
                            res.json({ data: 0 });
                        }
            
            
              
            }
            catch (e) {
                res.json({ data: 0 });
            }

});



module.exports = router;