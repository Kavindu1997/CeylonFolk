const express = require("express");
const router = express.Router();
const { Cart, sequelize } = require('../models');
const { Desings } = require('../models');
const { Users } = require('../models');
const { Orders } = require('../models');
const { OrderItems } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/order", async (req, res) => {
    var uid = req.body.id;
    var oId = req.body.orderId;
    console.log(uid)
    const query = "SELECT designs.coverImage,designs.design_name, orderitems.quantity, orderitems.size, designs.price, SUM(orderitems.quantity*designs.price) AS totals FROM orderitems INNER JOIN designs ON designs.id=orderitems.itemId INNER JOIN orders ON orders.orderId=orderitems.orderId INNER JOIN masterdata ON masterdata.id=orders.status WHERE orders.customerId='" + uid + "' AND orders.orderId='" + oId + "' AND masterdata.id='4' GROUP BY orderitems.itemId, orderitems.size";
    const fetchOrder = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(fetchOrder);
});

const path = require('path');

const multer = require('multer');
const { request } = require("http");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/bankSlips')
    },
    filename: (req, file, cb) => {
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

router.post("/", upload.single('photo'), async (req, res) => {
    const orderId = req.body.orderId;
    const imagePath = 'public/collections/' + req.file.filename;
    const uid = req.body.uid;
    const date = req.body.date;
    console.log(date)
    const query = "INSERT INTO deposits (customerId,orderId,slip,uploadedDate) VALUES('"+uid+"','"+orderId+"','"+imagePath+"','"+date+"')";
    const uploadslip = await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
    const query1 = "UPDATE orders SET status='5' WHERE orderId='"+orderId+"'";
    const updateOrder = await sequelize.query(query1, { type: sequelize.QueryTypes.UPDATE });
    res.json(uploadslip);
});



module.exports = router;