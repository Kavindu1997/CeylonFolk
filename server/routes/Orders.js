const express = require("express");
const router = express.Router();
const { Orders, sequelize } = require('../models');

router.get("/getHistory/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE customerId = '"+id+"' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
});

router.get("/order/:oId", async (req, res) => {
    const oId = req.params.oId;
    const query = "SELECT designs.id, designs.coverImage, designs.design_name, orderitems.quantity, orderitems.size, designs.price, SUM( orderitems.quantity * designs.price ) AS totals, CASE WHEN orders.PaymentMethod = '7' AND orders.status = '1' THEN 1 WHEN orders.PaymentMethod = '9' AND orders.status = '4' THEN 1 ELSE 0 END AS canbecancel FROM orderitems INNER JOIN designs ON designs.id = orderitems.itemId INNER JOIN orders ON orders.orderId = orderitems.orderId INNER JOIN masterdata ON masterdata.id = orders.status WHERE orders.orderId = '"+oId+"' GROUP BY orderitems.itemId, orderitems.size";
    const orderDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderDetails);
});

router.post("/cancelItem", async(req,res) => {
    const orderId = req.body.orderId;
    const itemId = req.body.itemId;
    const size = req.body.size;
    const removeWholeOrder = req.body.removeWholeOrder;
  
    const query = "DELETE FROM orderitems WHERE orderId='"+orderId+"' AND itemId='"+itemId+"' AND size='"+size+"'";
    const deleteItem = await sequelize.query(query, { type: sequelize.QueryTypes.DELETE });
    if(removeWholeOrder == 1){
        const query = "DELETE FROM orders WHERE orderId='"+orderId+"'";
        const deleteItem1 = await sequelize.query(query, { type: sequelize.QueryTypes.DELETE });
    }
    res.json(deleteItem);
})


module.exports = router;