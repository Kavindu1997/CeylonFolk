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
    const oid = req.body.orderId;
    const total = req.body.totalAmount;
    const pmt = req.body.payment;
    const stu = req.body.status;
    const items= req.body.itemArray;
    const add = req.body.delivery
    const date = req.body.placedDate;
    const contactNo = req.body.phoneNo;
    const query = "INSERT INTO orders (orderId,customerId,fullAmount,PaymentMethod,status, deliveryAddress,contactNo, placedDate) VALUES ('" + oid + "','" + uid + "','" + total + "','" + pmt + "','" + stu + "','" + add + "','" + contactNo + "','" + date + "')";
    const cashOnOrder = await sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
    console.log(query)
    res.json(cashOnOrder);   
    for(let i=0;i<items.length;i++){
        const query1 = "INSERT INTO orderitems (orderId, itemId, quantity, size) VALUES ('" + oid + "','" + items[i].itemId + "','" + items[i].quantity + "','" + items[i].size + "')";
        const cashOrderItem = await sequelize.query(query1, {type: sequelize.QueryTypes.INSERT});
        
    }
    res.json(cashOrderItem); 
});

router.put("/deleteCart", async (req,res) => {
    const uid = req.body.userId;
    const oid = req.body.orderId;
    const total = req.body.totalAmount;
    const pmt = req.body.payment;
    const stu = req.body.status;
    const items= req.body.itemArray;
    for(let i=0;i<items.length;i++){
        const query = "UPDATE carts SET carts.isDeleted=1, isBought=1 WHERE carts.itemId='" + items[i].itemId + "' AND carts.customerId='" + uid + "' AND carts.isBought=0 AND carts.isDeleted=0";
        const cartRemove = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
    }
    res.json(cartRemove);
});

router.put("/remove", async (req,res) => {
    const uid = req.body.userId;
    const id = req.body.itemId;
    const query = "UPDATE carts SET carts.isDeleted=1 WHERE carts.id='" + id + "' AND carts.customerId='" + uid + "' AND carts.isBought=0";
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
    const query = "SELECT carts.id,carts.customerId,designs.designName AS name,SUM(carts.quantity) AS quantity,designs.designImage AS image, designs.price, carts.itemId,carts.size, SUM(carts.quantity*designs.price) as totals FROM `designs` INNER JOIN `carts` ON designs.designId=carts.itemId INNER JOIN `users` ON users.id=carts.customerId WHERE carts.isDeleted=0 And carts.isBought=0 And users.id='" + id + "' GROUP BY carts.id"; 
    const itemDetails = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    res.json(itemDetails);
});

router.get("/count/:id", async (req,res) => {
    const id = req.params.id;
    const query = "SELECT COUNT( * ) AS count FROM `carts` WHERE carts.isDeleted=0 And carts.isBought=0 And carts.customerId='" + id + "' GROUP BY carts.id"; 
    const countDetails = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    res.json(countDetails);
});

router.get("/total/:id", async (req,res) => {
    const id = req.params.id;
    const query   = "SELECT carts.customerId, SUM(carts.quantity*designs.price) as total FROM `designs` INNER JOIN `carts` ON designs.designId=carts.itemId INNER JOIN `users` ON users.id=carts.customerId WHERE  carts.isDeleted=0 And carts.isBought=0 and users.id= "+ id;
    console.log(query);
    const totalDetails = await sequelize.query( query, 
    {
        type: sequelize.QueryTypes.SELECT});
    res.json(totalDetails);
    
});





module.exports = router;