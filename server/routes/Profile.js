const express = require("express");
const router = express.Router();
const { Cart, sequelize } = require('../models');
const { Desings } = require('../models');
const { Users } = require('../models');
const { Orders } = require('../models');
const { OrderItems } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

router.post("/getUserPassword", async(req,res) => {
    const { loginEmail, loginPassword } = req.body;

    const user = await Users.findOne({ where: { email: loginEmail } });

    bcrypt.compare(loginPassword, user.password).then((match) => {
        if (!match) res.json({  data: 0});
        res.json({data: 1});
    });
   
})

router.put("/updateUser", async(req,res) => {
    const uid = req.body.uid;
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const contactNo = req.body.contactNo;
    console.log("fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
    console.log(req.body)
    const password = req.body.password;
    const shouldchangepw = req.body.shouldchangeps;
    var userupdate
    if(shouldchangepw == 1){
        bcrypt.hash(password, 10).then(async(hash) =>  {
            const query = "UPDATE users SET firstName='"+fName+"', lastName='"+lName+"', password='"+hash+"' WHERE id='"+uid+"'";
            userupdate = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
        })
    }else{
        const query = "UPDATE users SET firstName='"+fName+"', lastName='"+lName+"', contactNo='"+contactNo+"' WHERE id='"+uid+"'";
        userupdate = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE }); 
    }

    
    res.json(userupdate)

})

module.exports = router;