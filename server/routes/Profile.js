const express = require("express");
const router = express.Router();
const { Cart, sequelize } = require('../models');
const { Desings } = require('../models');
const { Users } = require('../models');
const { Orders } = require('../models');
const { OrderItems } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");
const nodemailer = require('nodemailer');

router.get("/getUserDetails/:uid", async(req,res) => {
    const uid = req.params.uid;
    const query = "SELECT * FROM users WHERE id='"+uid+"'";
    const deposits = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    console.log(res)
    res.json(deposits);
})

module.exports = router;