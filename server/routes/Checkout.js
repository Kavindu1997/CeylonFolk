const express = require("express");
const router = express.Router();
const { Cart, sequelize } = require('../models');
const { CartItems } = require('../models');
const { Items } = require('../models');
const { Customers } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/customer/:id", async (req,res) => {
    const id = req.params.id;
    const query = "SELECT * FROM users WHERE id='" + id + "'";
    const customerDetails = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    res.json(customerDetails);
});

router.put("/remove", async (req,res) => {
    const uid = req.body.userId;
    const id = req.body.itemId;
    const query = "UPDATE carts SET carts.isDeleted=1 WHERE carts.itemId='" + id + "' AND carts.customerId='" + uid + "' AND carts.isBought=0";
    const itemRemove = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
    res.json(itemRemove);
});

router.post("/addToCart", async (req,res) => {
    const id = req.body.productId;
    const qty = req.body.quantity;
    const uid = req.body.userId;
    const size = req.body.size;
    const query = "INSERT INTO carts (customerId,itemId,quantity,size) VALUES('" + uid + "','" + id + "','" + qty + "','" + size + "')";
    const addCart = await sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
    res.json(addCart);
});

router.post("/addToCartBatchwise", async (req,res) => {
    var cart = [];
    cart = req.body.cart;
    var uid = req.body.uid;
    for(let i = 0; i<cart.length ; i++){
        try{
            var query = "INSERT INTO carts (customerId,itemId,quantity,size) VALUES('" + uid + "','" + cart[i].itemId + "','" + cart[i].quantity + "','" + cart[i].size + "')";
            var addCart = await sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
        }catch(e){

        }
    }
    res.json(cart.length);
});

router.get("/items/:id", async (req,res) => {
    const id = req.params.id;
    const query = "SELECT carts.customerId,items.name,carts.quantity,items.image, items.price, carts.itemId, SUM(carts.quantity*items.price) as totals FROM `items` INNER JOIN `carts` ON items.itemID=carts.itemId INNER JOIN `users` ON users.id=carts.customerId WHERE carts.isDeleted=0 And carts.isBought=0 And users.id='" + id + "' GROUP BY carts.itemId"; 
    const itemDetails = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    res.json(itemDetails);
});

router.get("/total/:id", async (req,res) => {
    const id = req.params.id;
    const query   = "SELECT carts.customerId, SUM(carts.quantity*items.price) as total FROM `items` INNER JOIN `carts` ON items.itemID=carts.itemId INNER JOIN `users` ON users.id=carts.customerId WHERE  carts.isDeleted=0 And carts.isBought=0 and users.id= "+ id;
    console.log(query);
    const totalDetails = await sequelize.query( query, 
    {
        type: sequelize.QueryTypes.SELECT});
    res.json(totalDetails);
    
});

// router.post("/", async (req, res) => {
//     const post = req.body;
//     await Wishlist.create(post);
//     res.json(post);
      
   
// });




module.exports = router;