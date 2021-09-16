const { getDate } = require("date-fns");
const express = require("express");
const router = express.Router();
const { Designs, sequelize } = require('../models');

router.get("/", async (req, res) => {
    const query = "SELECT *,0 as isInWishList FROM `designs`  GROUP by design_name";
    const listOfDesignsDB = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(listOfDesignsDB);
    // res.render("upload");
});

router.get("/shop/:id", async (req, res) => {
    const id = req.params.id
    // console.log(id)
    const query = "SELECT * FROM designs WHERE type_id='" + id + "'";
    const listOftypes = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(listOftypes);
});

router.get("/offers", async (req,res) => {
 
    let today = new Date().toISOString().slice(0, 10)
  
    const query = "SELECT collections.collection_name, collections.coverImage, offers.rate,offers.to FROM `collections` INNER JOIN `offers` ON collections.id=offers.collection_id WHERE offers.to >='"+today+"' ";
        const listOfOffers = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        console.log(listOfOffers);
        res.json(listOfOffers);

   console.log("hello");


//  const query1 = "SELECT designs.design_name,designs.coverImage,designs.price from `designs`";
//         const listOfkkk = await sequelize.query(query1, { type: sequelize.QueryTypes.SELECT });
//         console.log(listOfkkk);

});


router.get("/shops/:id", async (req, res) => {
    const uid = req.params.id;
    const query = "SELECT designs.id,designs.collection_id,designs.design_name,designs.color_id,designs.type_id,designs.coverImage,designs.price, CASE WHEN wishlists.itemId IS NULL THEN 0 ELSE 1 END AS isInWishList FROM `designs` LEFT JOIN wishlists ON wishlists.itemId = designs.id AND wishlists.userId = '" + uid + "' GROUP BY design_name"
    const listOfDesignsDB = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(listOfDesignsDB);
    // res.render("upload");
});

router.get('/byId/:id', (req, res) => {
    const id = req.params.id
})

router.post("/", async (req, res) => {
    //// console.log(req.file);
    const post = req.body;
    await Designs.create(post);
    res.json("success");
});

router.get("/filterRecords", async (req, res, next) => {


    // let Collection = req.query.Collection;
    // console.log(Collection) ;

    // let Colour = req.query.Colour;
    // console.log(Colour) ;

    // let Type = req.query.Type;
    // console.log(Type) ;

    // let Size = req.query.Size;
    // console.log(Size) ;
    const uId = req.query.uId === '0' ? "0" : "'" + req.query.uId + "'";
    const Collection = req.query.Collection === "" ? "collections.collection_name" : "'" + req.query.Collection + "'";
    const Colour = req.query.Colour === "" ? "colors.color_name" : "'" + req.query.Colour + "'";
    const Type = req.query.Type === "" ? "types.types" : "'" + req.query.Type + "'";
    const Size = req.query.Size === "" ? "sizes.size" : "'" + req.query.Size + "'";

    const query = "SELECT designs.id, designs.collection_id, designs.design_name, designs.color_id, designs.type_id, designs.coverImage, designs.price, CASE WHEN wishlists.itemId IS NULL THEN 0 ELSE 1 END AS isInWishList FROM `designs` LEFT JOIN wishlists ON wishlists.itemId = designs.id AND wishlists.userId =" + uId + " INNER JOIN colors ON colors.id = designs.color_id INNER JOIN inventories ON inventories.colour_id = designs.color_id AND inventories.type_id=designs.type_id INNER JOIN sizes ON sizes.id = inventories.size_id INNER JOIN TYPES ON TYPES .id = designs.type_id INNER JOIN collections ON collections.id = designs.collection_id WHERE collections.collection_name=" + Collection + " AND colors.color_name=" + Colour + " AND types.types=" + Type + " AND sizes.size=" + Size + " GROUP BY design_name"
    const listOfDesignsDB = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(listOfDesignsDB);



    // if(Collection!="" & Colour!="" & Type!="" & Size!=""){


    //     const colour_id_query = "SELECT id FROM `colors` INNER JOIN CASE WHEN wishlists.itemId IS NULL THEN 0 ELSE 1 END AS isInWishList WHERE colors.color_name='" + Colour + "' ";
    // const colour_id = await sequelize.query(colour_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(colour_id.colors.id);
    // console.log(colour_id[0].id);
    // const colorId = colour_id[0].id;

    // const collection_id_query = "SELECT id FROM collections CASE WHEN wishlists.itemId IS NULL THEN 0 ELSE 1 END AS isInWishList WHERE collections.collection_name='" + Collection + "' ";
    // const collection_id = await sequelize.query(collection_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(size_id);
    // console.log(collection_id[0].id);
    // const collectionId = collection_id[0].id;

    // const type_id_query = "SELECT id FROM types CASE WHEN wishlists.itemId IS NULL THEN 0 ELSE 1 END AS isInWishList WHERE types.types='" + Type + "' ";
    // const type_id = await sequelize.query(type_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(type_id[0].id);
    // const typeId = type_id[0].id;

    // const size_id_query = "SELECT id FROM sizes CASE WHEN wishlists.itemId IS NULL THEN 0 ELSE 1 END AS isInWishList WHERE sizes.size='" + Size + "' ";
    // const size_id = await sequelize.query(size_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(size_id[0].id);
    // const sizeId = size_id[0].id;

    // const count_query = "SELECT count(id) as COUNT from `inventories` WHERE colour_id='" + colorId + "' and size_id='" + sizeId + "' and type_id='" + typeId + "'";
    // const count = await sequelize.query(count_query, {type: sequelize.QueryTypes.SELECT});
    // const Count = count[0].COUNT;

    // console.log(Count);

    // if(Count>0){

    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs` INNER JOIN `collections` ON designs.collection_id=collections.id WHERE collections.collection_name='" + Collection + "' and designs.color_id='" + colorId + "' and designs.type_id='" + typeId + "' ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    //     res.json(listOfFilter);
    //     console.log(listOfFilter);


    // }

    // else{

    //     console.log("its not in the inventory");
    //     const listOfFilter = null;


    //     res.json(listOfFilter);
    //     console.log(listOfFilter);
    // }

}




    // }

    // else if(Collection!="" & Colour=="" & Type=="" & Size==""){

    // const collection_id_query = "SELECT id FROM collections WHERE collections.collection_name='" + Collection + "' ";
    // const collection_id = await sequelize.query(collection_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(size_id);
    // console.log(collection_id[0].id);
    // const collectionId = collection_id[0].id;

    // // const count_query = "SELECT count(id) as COUNT from `inventories` WHERE colour_id='" + colorId + "' and size_id='" + sizeId + "' and type_id='" + typeId + "'";
    // // const count = await sequelize.query(count_query, {type: sequelize.QueryTypes.SELECT});
    // // const Count = count[0].COUNT;
    // // console.log(Count);  

    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs` INNER JOIN `collections` ON designs.collection_id=collections.id WHERE collections.collection_name='" + Collection + "'  ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    //     res.json(listOfFilter);
    //     console.log(listOfFilter);


    // }

    // else if(Collection!="" & Colour!="" & Type=="" & Size==""){


    //     const colour_id_query = "SELECT id FROM `colors` WHERE colors.color_name='" + Colour + "' ";
    // const colour_id = await sequelize.query(colour_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(colour_id.colors.id);
    // console.log(colour_id[0].id);
    // const colorId = colour_id[0].id;

    // const collection_id_query = "SELECT id FROM collections WHERE collections.collection_name='" + Collection + "' ";
    // const collection_id = await sequelize.query(collection_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(size_id);
    // console.log(collection_id[0].id);
    // const collectionId = collection_id[0].id;

    // // const count_query = "SELECT count(id) as COUNT from `inventories` WHERE colour_id='" + colorId + "' ";
    // // const count = await sequelize.query(count_query, {type: sequelize.QueryTypes.SELECT});
    // // const Count = count[0].COUNT;
    // // console.log(Count);  




    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs` INNER JOIN `collections` ON designs.collection_id=collections.id WHERE collections.collection_name='" + Collection + "' and designs.color_id='" + colorId + "' ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    //     res.json(listOfFilter);
    //     console.log(listOfFilter);


    // }

    // else if(Collection!="" & Colour=="" & Type!="" & Size==""){


    // const collection_id_query = "SELECT id FROM collections WHERE collections.collection_name='" + Collection + "' ";
    // const collection_id = await sequelize.query(collection_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(size_id);
    // console.log(collection_id[0].id);
    // const collectionId = collection_id[0].id;

    // const type_id_query = "SELECT id FROM types WHERE types.types='" + Type + "' ";
    // const type_id = await sequelize.query(type_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(type_id[0].id);
    // const typeId = type_id[0].id;

    // // const count_query = "SELECT count(id) as COUNT from `inventories` WHERE colour_id='" + colorId + "' and size_id='" + sizeId + "' and type_id='" + typeId + "'";
    // // const count = await sequelize.query(count_query, {type: sequelize.QueryTypes.SELECT});
    // // const Count = count[0].COUNT;
    // // console.log(Count);

    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs` INNER JOIN `collections` ON designs.collection_id=collections.id WHERE collections.collection_name='" + Collection + "' and designs.type_id='" + typeId + "' ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    //     res.json(listOfFilter);
    //     console.log(listOfFilter);


    // }

    // else if(Collection!="" & Colour=="" & Type=="" & Size!=""){

    // const collection_id_query = "SELECT id FROM collections WHERE collections.collection_name='" + Collection + "' ";
    // const collection_id = await sequelize.query(collection_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(size_id);
    // console.log(collection_id[0].id);
    // const collectionId = collection_id[0].id;

    // const size_id_query = "SELECT id FROM sizes WHERE sizes.size='" + Size + "' ";
    // const size_id = await sequelize.query(size_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(size_id[0].id);
    // const sizeId = size_id[0].id;

    // const count_query = "SELECT count(id) as COUNT from `inventories` WHERE size_id='" + sizeId + "' ";
    // const count = await sequelize.query(count_query, {type: sequelize.QueryTypes.SELECT});
    // const Count = count[0].COUNT;

    // console.log(Count);

    // if(Count>0){

    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs` INNER JOIN `collections` ON designs.collection_id=collections.id WHERE collections.collection_name='" + Collection + "' ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    //     res.json(listOfFilter);
    //     console.log(listOfFilter);

    // }

    // else{

    //     console.log("its not in the inventory");
    // }




    // }

    // else if(Collection!="" & Colour!="" & Type!="" & Size==""){

    //     const colour_id_query = "SELECT id FROM `colors` WHERE colors.color_name='" + Colour + "' ";
    // const colour_id = await sequelize.query(colour_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(colour_id.colors.id);
    // console.log(colour_id[0].id);
    // const colorId = colour_id[0].id;


    // const collection_id_query = "SELECT id FROM collections WHERE collections.collection_name='" + Collection + "' ";
    // const collection_id = await sequelize.query(collection_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(size_id);
    // console.log(collection_id[0].id);
    // const collectionId = collection_id[0].id;

    // const type_id_query = "SELECT id FROM types WHERE types.types='" + Type + "' ";
    // const type_id = await sequelize.query(type_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(type_id[0].id);
    // const typeId = type_id[0].id;

    // // const count_query = "SELECT count(id) as COUNT from `inventories` WHERE colour_id='" + colorId + "' and size_id='" + sizeId + "' and type_id='" + typeId + "'";
    // // const count = await sequelize.query(count_query, {type: sequelize.QueryTypes.SELECT});
    // // const Count = count[0].COUNT;
    // // console.log(Count);



    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs` INNER JOIN `collections` ON designs.collection_id=collections.id WHERE collections.collection_name='" + Collection + "' and designs.color_id='" + colorId + "' and designs.type_id='" + typeId + "' ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    //     res.json(listOfFilter);
    //     console.log(listOfFilter);




    // }

    // else if(Collection!="" & Colour!="" & Type=="" & Size!=""){


    //     const colour_id_query = "SELECT id FROM `colors` WHERE colors.color_name='" + Colour + "' ";
    // const colour_id = await sequelize.query(colour_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(colour_id.colors.id);
    // console.log(colour_id[0].id);
    // const colorId = colour_id[0].id;

    // const collection_id_query = "SELECT id FROM collections WHERE collections.collection_name='" + Collection + "' ";
    // const collection_id = await sequelize.query(collection_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(size_id);
    // console.log(collection_id[0].id);
    // const collectionId = collection_id[0].id;

    // const size_id_query = "SELECT id FROM sizes WHERE sizes.size='" + Size + "' ";
    // const size_id = await sequelize.query(size_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(size_id[0].id);
    // const sizeId = size_id[0].id;

    // const count_query = "SELECT count(id) as COUNT from `inventories` WHERE colour_id='" + colorId + "' and size_id='" + sizeId + "' ";
    // const count = await sequelize.query(count_query, {type: sequelize.QueryTypes.SELECT});
    // const Count = count[0].COUNT;
    // console.log(Count);

    // if(Count>0){

    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs` INNER JOIN `collections` ON designs.collection_id=collections.id WHERE collections.collection_name='" + Collection + "' and designs.color_id='" + colorId + "' ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});


    //     res.json(listOfFilter);
    //     console.log(listOfFilter);

    // }

    // else{

    //     console.log("its not in the inventory");
    // }



    // }

    // else if(Collection!="" & Colour=="" & Type!="" & Size!=""){


    // const collection_id_query = "SELECT id FROM collections WHERE collections.collection_name='" + Collection + "' ";
    // const collection_id = await sequelize.query(collection_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(size_id);
    // console.log(collection_id[0].id);
    // const collectionId = collection_id[0].id;

    // const type_id_query = "SELECT id FROM types WHERE types.types='" + Type + "' ";
    // const type_id = await sequelize.query(type_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(type_id[0].id);
    // const typeId = type_id[0].id;

    // const size_id_query = "SELECT id FROM sizes WHERE sizes.size='" + Size + "' ";
    // const size_id = await sequelize.query(size_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(size_id[0].id);
    // const sizeId = size_id[0].id;

    // const count_query = "SELECT count(id) as COUNT from `inventories` WHERE  size_id='" + sizeId + "' and type_id='" + typeId + "'";
    // const count = await sequelize.query(count_query, {type: sequelize.QueryTypes.SELECT});
    // const Count = count[0].COUNT;

    // console.log(Count);

    // console.log("dddnew");


    // if(Count>0){

    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs` INNER JOIN `collections` ON designs.collection_id=collections.id WHERE collections.collection_name='" + Collection + "'  and designs.type_id='" + typeId + "' ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});


    //     res.json(listOfFilter);
    //     console.log(listOfFilter);


    // }

    // else{


    //     console.log("its not in the inventory");
    // }




    // }

    // else if(Collection=="" & Colour!="" & Type=="" & Size==""){

    //     const colour_id_query = "SELECT id FROM `colors` WHERE colors.color_name='" + Colour + "' ";
    // const colour_id = await sequelize.query(colour_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(colour_id.colors.id);
    // console.log(colour_id[0].id);
    // const colorId = colour_id[0].id;

    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs` WHERE designs.color_id='" + colorId + "' ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    //     res.json(listOfFilter);
    //     console.log(listOfFilter);

    // }

    // else if(Collection=="" & Colour!="" & Type!="" & Size==""){

    //     const colour_id_query = "SELECT id FROM `colors` WHERE colors.color_name='" + Colour + "' ";
    // const colour_id = await sequelize.query(colour_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(colour_id.colors.id);
    // console.log(colour_id[0].id);
    // const colorId = colour_id[0].id;

    // const type_id_query = "SELECT id FROM types WHERE types.types='" + Type + "' ";
    // const type_id = await sequelize.query(type_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(type_id[0].id);
    // const typeId = type_id[0].id;

    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs` WHERE designs.color_id='" + colorId + "' and designs.type_id='" + typeId + "' ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    //     res.json(listOfFilter);
    //     console.log(listOfFilter);


    // }

    // else if(Collection=="" & Colour!="" & Type=="" & Size!=""){

    //     const colour_id_query = "SELECT id FROM `colors` WHERE colors.color_name='" + Colour + "' ";
    // const colour_id = await sequelize.query(colour_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(colour_id.colors.id);
    // console.log(colour_id[0].id);
    // const colorId = colour_id[0].id;

    // const size_id_query = "SELECT id FROM sizes WHERE sizes.size='" + Size + "' ";
    // const size_id = await sequelize.query(size_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(size_id[0].id);
    // const sizeId = size_id[0].id;

    // const count_query = "SELECT count(id) as COUNT from `inventories` WHERE colour_id='" + colorId + "' and size_id='" + sizeId + "' ";
    // const count = await sequelize.query(count_query, {type: sequelize.QueryTypes.SELECT});
    // const Count = count[0].COUNT;

    // console.log(Count);


    // if(Count>0){

    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs` WHERE designs.color_id='" + colorId + "' ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    //     res.json(listOfFilter);
    //     console.log(listOfFilter);


    // }

    // else{

    //     console.log("its not in the inventory");
    // }




    // }

    // else if(Collection=="" & Colour!="" & Type!="" & Size!=""){

    //     const colour_id_query = "SELECT id FROM `colors` WHERE colors.color_name='" + Colour + "' ";
    // const colour_id = await sequelize.query(colour_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(colour_id.colors.id);
    // console.log(colour_id[0].id);
    // const colorId = colour_id[0].id;

    // const type_id_query = "SELECT id FROM types WHERE types.types='" + Type + "' ";
    // const type_id = await sequelize.query(type_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(type_id[0].id);
    // const typeId = type_id[0].id;

    // const size_id_query = "SELECT id FROM sizes WHERE sizes.size='" + Size + "' ";
    // const size_id = await sequelize.query(size_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(size_id[0].id);
    // const sizeId = size_id[0].id;

    // const count_query = "SELECT count(id) as COUNT from `inventories` WHERE colour_id='" + colorId + "' and size_id='" + sizeId + "' and type_id='" + typeId + "'";
    // const count = await sequelize.query(count_query, {type: sequelize.QueryTypes.SELECT});
    // const Count = count[0].COUNT;

    // console.log(Count);

    // console.log("dddnew");


    // if(Count>0){

    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs`  WHERE designs.color_id='" + colorId + "' and designs.type_id='" + typeId + "' ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    //     res.json(listOfFilter);
    //     console.log(listOfFilter);


    // }

    // else{

    //     console.log("its not in the inventory");
    // }




    // }

    // else if(Collection=="" & Colour=="" & Type!="" & Size==""){


    // const type_id_query = "SELECT id FROM types WHERE types.types='" + Type + "' ";
    // const type_id = await sequelize.query(type_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(type_id[0].id);
    // const typeId = type_id[0].id;



    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs`  WHERE designs.type_id='" + typeId + "' ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});


    //     res.json(listOfFilter);
    //     console.log(listOfFilter);


    // }
    // else if(Collection=="" & Colour=="" & Type!="" & Size!=""){


    // const type_id_query = "SELECT id FROM types WHERE types.types='" + Type + "' ";
    // const type_id = await sequelize.query(type_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(type_id[0].id);
    // const typeId = type_id[0].id;

    // const size_id_query = "SELECT id FROM sizes WHERE sizes.size='" + Size + "' ";
    // const size_id = await sequelize.query(size_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(size_id[0].id);
    // const sizeId = size_id[0].id;

    // const count_query = "SELECT count(id) as COUNT from `inventories` WHERE size_id='" + sizeId + "' and type_id='" + typeId + "'";
    // const count = await sequelize.query(count_query, {type: sequelize.QueryTypes.SELECT});
    // const Count = count[0].COUNT;

    // console.log(Count);

    // if(Count>0){

    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs` WHERE designs.type_id='" + typeId + "' ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    //     res.json(listOfFilter);
    //     console.log(listOfFilter);


    // }

    // else{

    //     console.log("its not in the inventory");
    // }




    // }
    // else if(Collection=="" & Colour=="" & Type=="" & Size!=""){


    // const size_id_query = "SELECT id FROM sizes WHERE sizes.size='" + Size + "' ";
    // const size_id = await sequelize.query(size_id_query, {type: sequelize.QueryTypes.SELECT});
    // // res.json(type_id);
    // console.log(size_id[0].id);
    // const sizeId = size_id[0].id;

    // const count_query = "SELECT count(id) as COUNT from `inventories` WHERE size_id='" + sizeId + "' ";
    // const count = await sequelize.query(count_query, {type: sequelize.QueryTypes.SELECT});
    // const Count = count[0].COUNT;
    // console.log(Count);

    // if(Count>0){

    //     const query= "SELECT designs.id,designs.design_name,designs.price,designs.coverImage FROM `designs` ";
    //     const listOfFilter = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});

    //     res.json(listOfFilter);
    //     console.log(listOfFilter);


    // }

    // else{

    //     console.log("its not in the inventory");
    // }




    // }

);

module.exports = router;