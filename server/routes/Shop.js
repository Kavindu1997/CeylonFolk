const { getDate } = require("date-fns");
const express = require("express");
const router = express.Router();
const { Designs, sequelize } = require('../models');

router.get("/", async (req, res) => {
    const query = "SELECT designs.id,designs.collection_id,designs.design_name,designs.color_id,designs.type_id,designs.coverImage,designs.discountedPrice,designs.price,offers.rate,0 as isInWishList FROM `designs` LEFT JOIN offers ON designs.collection_id = offers.collection_id GROUP by design_name";
    const listOfDesignsDB = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(listOfDesignsDB);
    // res.render("upload");
});

router.post("/specialOffers/", async (req, res) => {
    const collection_offer_id = req.body.collection_offer_id;
    const uId = req.body.uid;
    const query = "SELECT *, designs.id AS ID, CASE WHEN wishlists.itemId IS NULL THEN 0 ELSE 1 END AS isInWishList FROM designs LEFT JOIN wishlists ON wishlists.itemId = designs.id AND wishlists.userId = '"+uId+"' WHERE designs.collection_id='"+collection_offer_id+"' ORDER BY `designs`.`id` ASC";
    const listOfOffers = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(listOfOffers);
});



router.post("/shop", async (req, res) => {
    const id = req.body.id
    const uId = req.body.uId;
    // console.log(id)
    const query = "SELECT *, designs.id AS ID, CASE WHEN wishlists.itemId IS NOT NULL THEN 1 ELSE 0 END AS isInWishList FROM designs LEFT JOIN wishlists ON wishlists.itemId = designs.id AND wishlists.userId = '"+uId+"' WHERE type_id = '"+id+"' GROUP by design_name";
    const listOftypes = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(listOftypes);
});

router.post("/addwishlistType", async (req, res) => {
    var data = { status: 0, data: [] }
    const id = req.body.id;
    const uId = req.body.uid;
    const typeid = req.body.typeid;
    try {
        const query1 = "SELECT itemId FROM wishlists WHERE itemId ='" + id + "' AND userId='" + uId + "'";
        const wishlistItem = await sequelize.query(query1, { type: sequelize.QueryTypes.SELECT });
        console.log(wishlistItem)
        if (wishlistItem.length > 0) {
            const query2 = "DELETE FROM wishlists WHERE userId='" + uId + "' AND itemId='" + id + "'";
            const removewishlist = await sequelize.query(query2, { type: sequelize.QueryTypes.DELETE });
            // res.json(removewishlist);
        } else {
            const query = "INSERT INTO wishlists(`itemId`,`userId`) VALUES('" + id + "','" +uId + "')";
            const wishlist = await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
            // res.json(wishlist);

        }
        data.status = 1
    }
    catch (e) {
        data.status = 0
    }

    const query = "SELECT *, designs.id AS ID, CASE WHEN wishlists.itemId IS NOT NULL THEN 1 ELSE 0 END AS isInWishList FROM designs LEFT JOIN wishlists ON wishlists.itemId = designs.id AND wishlists.userId = '"+uId+"' WHERE type_id = '"+typeid+"' GROUP by design_name"
    const listOfDesignsDB = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    data.data = listOfDesignsDB
    res.json(data);
})

router.get("/offers", async (req, res) => {

    let today = new Date().toISOString().slice(0, 10)

    const query = "SELECT collections.id,collections.collection_name, collections.coverImage, offers.rate,offers.to FROM `collections` INNER JOIN `offers` ON collections.id=offers.collection_id WHERE offers.to >='" + today + "' ORDER BY offers.id DESC LIMIT 4";
    const listOfOffers = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    console.log(listOfOffers);
    res.json(listOfOffers);


});

router.get("/alloffers", async (req, res) => {

    let today = new Date().toISOString().slice(0, 10)

    const query = "SELECT collections.id,collections.collection_name, collections.coverImage, offers.rate,offers.to FROM `collections` INNER JOIN `offers` ON collections.id=offers.collection_id WHERE offers.to >='" + today + "' ";
    const listOfOffers = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    console.log(listOfOffers);
    res.json(listOfOffers);


});

router.get("/topseller/:uId", async (req, res) => {
    const uId = req.params.uId;
    const query = "SELECT orderitems.itemId, designs.design_name, designs.coverImage, designs.price, designs.discountedPrice, offers.rate, SUM(orderitems.quantity), CASE WHEN wishlists.itemId IS NOT NULL THEN 1 ELSE 0 END AS isInWishList FROM orderitems INNER JOIN designs ON orderitems.itemId = designs.id LEFT JOIN offers ON designs.collection_id = offers.collection_id LEFT JOIN wishlists ON wishlists.itemId = designs.id AND wishlists.userId = '"+uId+"' WHERE isDeleted = 0 GROUP BY itemId ORDER BY SUM(orderitems.quantity) DESC LIMIT 4";
    const listOfTopSellers = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    console.log(listOfTopSellers);
    
    res.json(listOfTopSellers);


});

router.post("/addwishlist", async (req, res) => {
    var data = { status: 0, data: [] }
    const itemId = req.body.id;
    const uId = req.body.uid;
    try {
        const query1 = "SELECT itemId FROM wishlists WHERE itemId ='" + itemId + "' AND userId='" + uId + "'";
        const wishlistItem = await sequelize.query(query1, { type: sequelize.QueryTypes.SELECT });
        console.log(wishlistItem)
        if (wishlistItem.length > 0) {
            const query2 = "DELETE FROM wishlists WHERE userId='" + uId + "' AND itemId='" + itemId + "'";
            const removewishlist = await sequelize.query(query2, { type: sequelize.QueryTypes.DELETE });
            // res.json(removewishlist);
        } else {
            const query = "INSERT INTO wishlists(`itemId`,`userId`) VALUES('" + itemId + "','" +uId + "')";
            const wishlist = await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
            // res.json(wishlist);

        }
        data.status = 1
    }
    catch (e) {
        data.status = 0
    }

    const query = "SELECT orderitems.itemId, designs.design_name, designs.coverImage, designs.price, designs.discountedPrice, offers.rate, SUM(orderitems.quantity), CASE WHEN wishlists.itemId IS NOT NULL THEN 1 ELSE 0 END AS isInWishList FROM orderitems INNER JOIN designs ON orderitems.itemId = designs.id LEFT JOIN offers ON designs.collection_id = offers.collection_id LEFT JOIN wishlists ON wishlists.itemId = designs.id AND wishlists.userId = '"+uId+"' WHERE isDeleted = 0 GROUP BY itemId ORDER BY SUM(orderitems.quantity) DESC LIMIT 4"
    const listOfDesignsDB = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    data.data = listOfDesignsDB
    res.json(data);
})


router.get("/shops/:id", async (req, res) => {
    const uid = req.params.id;
    const query = "SELECT designs.id,designs.collection_id,designs.design_name,designs.color_id,designs.type_id,designs.coverImage,designs.discountedPrice,designs.price,offers.rate, CASE WHEN wishlists.itemId IS NULL THEN 0 ELSE 1 END AS isInWishList FROM `designs` LEFT JOIN wishlists ON wishlists.itemId = designs.id AND wishlists.userId = '" + uid + "' LEFT JOIN offers ON designs.collection_id = offers.collection_id GROUP BY design_name"
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

    const query = "SELECT designs.id, designs.collection_id, designs.design_name, designs.color_id, designs.type_id, designs.coverImage, designs.discountedPrice, designs.price,offers.rate, CASE WHEN wishlists.itemId IS NULL THEN 0 ELSE 1 END AS isInWishList FROM `designs` LEFT JOIN wishlists ON wishlists.itemId = designs.id AND wishlists.userId =" + uId + " INNER JOIN colors ON colors.id = designs.color_id INNER JOIN inventories ON inventories.colour_id = designs.color_id AND inventories.type_id=designs.type_id INNER JOIN sizes ON sizes.id = inventories.size_id INNER JOIN TYPES ON TYPES .id = designs.type_id INNER JOIN collections ON collections.id = designs.collection_id LEFT JOIN offers ON designs.collection_id = offers.collection_id WHERE collections.collection_name=" + Collection + " AND colors.color_name=" + Colour + " AND types.types=" + Type + " AND sizes.size=" + Size + " GROUP BY design_name"
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