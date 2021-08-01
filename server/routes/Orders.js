const express = require("express");
const router = express.Router();
const { Orders } = require('../models');


router.post("/cashOn", async (req, res) => {
    const uid = req.body.userId;
    const amt = req.body.amount;
    const pmt = req.body.payment;
    const stu = req.body.status;
    // const amount = "SELECT SUM(carts.quantity*items.price) as total FROM `items` INNER JOIN `carts` ON items.itemID=carts.itemId INNER JOIN `users` ON users.id=carts.customerId WHERE  carts.isDeleted=0 And carts.isBought=0 and users.id= "+ uid;
    const query = "INSERT INTO orders (customerId,fullAmount,PaymentMethod,status) VALUES ('" + uid + "','" + amt + "','" + pmt + "','" + stu + "')";
    const cashOnOrder = await sequelize.query(query, {type: sequelize.QueryTypes.INSERT});
    res.json(cashOnOrder);   
});


module.exports = router;