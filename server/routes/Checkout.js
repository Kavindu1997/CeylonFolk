const express = require("express");
const router = express.Router();
const { Cart, sequelize } = require('../models');
const { Items } = require('../models');
const { Users } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/customer/:id", async (req,res) => {
    const id = req.params.id;
    const query = "SELECT * FROM users WHERE id='" + id + "'";
    const customerDetails = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    res.json(customerDetails);
});

router.post("/cashOn", async (req, res) => {
    const uid = req.body.userId;
    const pmt = req.body.payment;
    const stu = req.body.status;
    const itmes= req.body.itemarray;
    const query = "INSERT INTO orders (customerId,fullAmount,PaymentMethod,status) VALUES ('" + uid + "',(SELECT SUM(carts.quantity*items.price) as total FROM `items` INNER JOIN `carts` ON items.itemID=carts.itemId INNER JOIN `users` ON users.id=carts.customerId WHERE  carts.isDeleted=0 And carts.isBought=0 and users.id='" + uid + "'),'" + pmt + "','" + stu + "')";
    const cashOnOrder = await sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
    res.json(cashOnOrder);   
    //const query1 = "INSERT INTO orderitems (orderId,itemId,quantity,size) VALUES ((SELECT orders.orderId FROM orders ORDER BY orders.orderId DESC LIMIT 1),(SELECT carts.itemId FROM carts WHERE  carts.isDeleted=0 And carts.isBought=0 and carts.id='" + uid + "'),'" + pmt + "','" + stu + "')";
    const query1 = "INSERT INTO orderitems (orderId,itemId, quantity, size) SELECT '9', itemId, quantity, size FROM carts WHERE carts.isDeleted=0 And carts.isBought=0 And users.id='" + uid + "' GROUP BY carts.size,carts.itemId"
    const cashOrderItem = await sequelize.query(query1, {type: sequelize.QueryTypes.INSERT});
    res.json(cashOrderItem);  
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
    const query = "SELECT carts.customerId,items.name,SUM(carts.quantity) AS quantity,items.image, items.price, carts.itemId,carts.size, SUM(carts.quantity*items.price) as totals FROM `items` INNER JOIN `carts` ON items.itemID=carts.itemId INNER JOIN `users` ON users.id=carts.customerId WHERE carts.isDeleted=0 And carts.isBought=0 And users.id='" + id + "' GROUP BY carts.size,carts.itemId"; 
    const itemDetails = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    res.json(itemDetails);
});

router.get("/count/:id", async (req,res) => {
    const id = req.params.id;
    const query = "SELECT COUNT( * ) AS count FROM `carts` WHERE carts.isDeleted=0 And carts.isBought=0 And carts.customerId='" + id + "' GROUP BY carts.size,carts.itemId"; 
    const countDetails = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    res.json(countDetails);
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





module.exports = router;