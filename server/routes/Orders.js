const express = require("express");
const router = express.Router();
const { Orders, sequelize } = require('../models');

router.get("/getHistory/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE customerId = '22' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
});

router.get("/order/:oId", async (req, res) => {
    const oId = req.params.oId;
    const query = "SELECT designs.id,designs.coverImage,designs.design_name, orderitems.quantity, orderitems.size, designs.price, SUM(orderitems.quantity*designs.price) AS totals FROM orderitems INNER JOIN designs ON designs.id=orderitems.itemId INNER JOIN orders ON orders.orderId=orderitems.orderId INNER JOIN masterdata ON masterdata.id=orders.status WHERE orders.orderId='" + oId + "' GROUP BY orderitems.itemId, orderitems.size";
    const orderDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderDetails);
});


module.exports = router;