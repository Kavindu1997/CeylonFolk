const express = require("express");
const router = express.Router();
const { Cart, sequelize } = require('../models');
const { Desings } = require('../models');
const { Users } = require('../models');
const { Orders } = require('../models');
const { OrderItems } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");
const nodemailer = require('nodemailer');

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
    const imagePath = 'public/bankSlips/' + req.file.filename;
    const uid = req.body.uid;
    const date = req.body.date;
    console.log(date)
    const query = "INSERT INTO deposits (customerId,orderId,slip,uploadedDate) VALUES('"+uid+"','"+orderId+"','"+imagePath+"','"+date+"')";
    const uploadslip = await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
    const query1 = "UPDATE orders SET status='5' WHERE orderId='"+orderId+"'";
    const updateOrder = await sequelize.query(query1, { type: sequelize.QueryTypes.UPDATE });
    res.json(uploadslip);
});

router.get("/allDepositSlips", async(req,res) => {
    const query = "SELECT * FROM deposits INNER JOIN users ON users.id=deposits.customerId INNER JOIN orders ON orders.orderId=deposits.orderId INNER JOIN orderitems ON orderitems.orderId=orders.orderId INNER JOIN masterdata ON masterdata.id=orders.status GROUP BY deposits.orderId";
    const deposits = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(deposits);
})

router.post("/paymentAccepted", async(req,res) => {
    console.log(req.body)
    const orderId = req.body.orderId;
    const query = "UPDATE deposits SET isValidated = '1',isProcessed='1' WHERE orderId='"+orderId+"' AND isValidated='0' AND isProcessed='0'";
    const acceptPayment = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    const query1 = "UPDATE orders SET status = '3' WHERE orderId='"+orderId+"' AND status='5'";
    const orderproccessing = await sequelize.query(query1, { type: sequelize.QueryTypes.UPDATE });
    const query2 = "SELECT * FROM users INNER JOIN deposits ON deposits.customerId=users.id INNER JOIN orders ON orders.orderId=deposits.orderId INNER JOIN masterdata ON masterdata.id=orders.PaymentMethod WHERE deposits.orderId='"+orderId+"'";
    const customerDetails = await sequelize.query(query2, {type: sequelize.QueryTypes.SELECT});
    res.json(acceptPayment);
    var emailDetails = {
        name: customerDetails[0].firstName +" "+ customerDetails[0].lastName,
        orderId: orderId,
        email: customerDetails[0].email,
        message: 'Dear customer, <br />Your payment has been successfully verified. Thank you for shopping with us.',
        description: customerDetails[0].decription,
        url: 'http://localhost:3000/myOrders?id='+customerDetails[0].customerId+'',
        subject: 'CeylonFolk payment confirmation',
        total: customerDetails[0].fullAmount,
        urlMsg: 'View order history'
    }
   
   var value = sendEmail(emailDetails)
})

router.post("/paymentRejected", async(req,res) => {
    const orderId = req.body.orderId;
    const query = "UPDATE deposits SET isRejected = '1' WHERE orderId='"+orderId+"' AND isValidated='0' AND isProcessed='0' AND isRejected='0'";
    const rejectPayment = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    const query1 = "UPDATE orders SET status = '38' WHERE orderId='"+orderId+"' AND status='5'";
    const orderproccessing = await sequelize.query(query1, { type: sequelize.QueryTypes.UPDATE });
    const query2 = "SELECT * FROM users INNER JOIN deposits ON deposits.customerId=users.id INNER JOIN orders ON orders.orderId=deposits.orderId INNER JOIN masterdata ON masterdata.id=orders.PaymentMethod WHERE deposits.orderId='"+orderId+"'";
    const customerDetails = await sequelize.query(query2, {type: sequelize.QueryTypes.SELECT});
    res.json(rejectPayment);
    var emailDetails = {
        name: customerDetails[0].firstName +" "+ customerDetails[0].lastName,
        orderId: orderId,
        email: customerDetails[0].email,
        message: 'Dear customer, <br />Your payment has been rejected. Please contact us: 0112345678',
        description: customerDetails[0].decription,
        url: 'http://localhost:3000/myOrders?id='+customerDetails[0].customerId+'',
        subject: 'CeylonFolk payment rejection',
        total: customerDetails[0].fullAmount,
        urlMsg: 'View order history'
    }
   
   var value = sendEmail(emailDetails)
})

async function sendEmail(emailDetails){
    console.log("email option")
    const htmlEmail = `
            <h4> ${emailDetails.message} <h4>
            <ul> 
                <li>Name: ${emailDetails.name} </li>
                <li>Order ID: ${emailDetails.orderId} </li>
                <li>Total amount for the order: ${emailDetails.total} </li>
                <li>Payment method: ${emailDetails.description} </li>
            </ul>
            
            <p>${emailDetails.urlMsg}: <a href=${emailDetails.url}>Click here to route to the site</a></p>`
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "testceylonfolk@gmail.com",
                pass: "pkjjt@1234"
            }
        });
        console.log(emailDetails)
        const mailOptions = {
            from: 'testceylonfolk@gmail.com', // sender address
            to: 'januyash8@gmail.com', // list of receivers
            replyTo: emailDetails.email,
            subject: emailDetails.subject, // Subject line
            text: emailDetails.message, // plain text body
            html: htmlEmail

        };
console.log("email option")
            await transporter.sendMail(mailOptions,(err,info) =>{
            if(err){
                        console.log("error in sending mail",err)
                        return 0
                    }
                    else{
                        console.log("successfully send message",info)
                        alert("successfully send message");
                        return 1
                    }
                 } );  
}



module.exports = router;