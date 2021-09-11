const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mime = require('mime');
const nodemailer = require('nodemailer');

const router = express.Router();
const { CustomizeOrders,sequelize } = require('../models/');
const multer = require('multer');

     
 router.post("/upload/image",
    (req, res, next) => {

        

        var matches = req.body.image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    response = {};

     
    if (matches.length !== 3) {
    return new Error('Invalid input string');
    }
     
    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');
    // Buffer.from(response.data);
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.extension(type);
    let fileName = Date.now() + "image." + extension;
    try {
    fs.writeFileSync("./public/" + fileName, imageBuffer, 'utf8');
    const imagePath = 'public/' + fileName;
    CustomizeOrders.create({
        customerId: req.body.customerId,
        // orderId: req.body.orderId,
        status: 'Pending',
        price: '1300',

            image: imagePath
        })
        res.status(200).json({
            success: "Success"
        })

        const htmlEmail = `
            <h4>You have new customized Order from ${req.body.userName}</h4>
            <ul> 
                <li>Customer ID: ${req.body.customerId} </li>
                <li>Order ID: ${req.body.customerId} </li>
            </ul>
            <img height={200} align="center" src='http://localhost:3001/' + ${imagePath} alt=""></img>
            <h4> Design <h4>`
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "testceylonfolk@gmail.com",
                pass: "pkjjt@1234"
            }
        });

        const mailOptions = {
            from: req.body.email, // sender address
            to: 'testceylonfolk@gmail.com', // list of receivers
            replyTo: req.body.email,
            html: 'Embedded image: <img src="cid:ceylon"/>',
            attachments: [
                {
                // filename: 'http://localhost:3001/' +imagePath
                filename: 'image.png',
        path: 'http://localhost:3001/' +imagePath,
        cid: 'ceylon' //same cid value as in the html img src
                }
                ],
            subject: req.body.enquiryType, // Subject line
            text: 'new order', // plain text body
            html: htmlEmail

        };

       transporter.sendMail(mailOptions,(err,info) =>{
            if(err){
                        console.log("error in sending mail",err)
                        return res.status(400).json({
                            message:`error in sending the mail${err}`
                        })
                    }
                    else{
                        console.log("successfully send message",info)
                        alert("successfully send message");
                        return res.json({
                            message:info
                        })
                    }
                 } );  

        res.json("SUCCESS");
    
    
    } catch (e) {
    next(e);
    }
      
    }
    )

    router.get("/orderDetails", async (req,res) => {
        const query = "SELECT * FROM customizeorders WHERE status='Pending'";
        const listOfCustomizedOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(listOfCustomizedOrders);
        // res.render("upload");
    });

    router.put("/orderAccepted", async (req,res) => {

        const id = req.body.id;
        const price = req.body.price
        console.log(price)

        const htmlEmail = `
            <h4>Your order has been Accepted</h4>
            <h4>Total Amount:${price}</h4>
            <h4> Design <h4>`

        const query = "UPDATE customizeorders SET status='Accept', price='"+price+"' WHERE orderId='"+id+"'";
        const updateStatus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    
    res.json(updateStatus);
    });

    router.get("/acceptedOrders", async (req,res) => {
        const query = "SELECT * FROM customizeorders WHERE status='Accept'";
        const listOfAcceptedOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(listOfAcceptedOrders);
        // res.render("upload");
    });

    router.get("/acceptedOrders", async (req,res) => {
        const query = "SELECT * FROM customizeorders WHERE status='Accept'";
        const listOfAcceptedOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(listOfAcceptedOrders);
        // res.render("upload");
    });

    router.get("/custCustomizeOrders/:id", async (req,res) => {
        const id = req.params.id
        console.log(id)
        const query = "SELECT * FROM customizeorders WHERE customerId='"+id+"'";
        const listOfAcceptedOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(listOfAcceptedOrders);
        // res.render("upload");
    });

    router.get("/customizeDesign/:id", async (req,res) => {
        const id = req.params.id
        // console.log(id)
        // const query = "SELECT * FROM customizeorders WHERE orderId='"+id+"'";
        const orderDetails = await CustomizeOrders.findByPk(id);
        res.json(orderDetails);
        // res.render("upload");
    });

    router.put("/orderPrinting", async (req,res) => {
        const id = req.body.id;
        console.log(id)
        const query = "UPDATE customizeorders SET status='Printing' WHERE orderId='"+id+"'";
        const updateStatus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    
    res.json(updateStatus);
    });

    router.get("/printingOrders", async (req,res) => {
        const query = "SELECT * FROM customizeorders WHERE status='Printing'";
        const listOfPrintingOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(listOfPrintingOrders);
        // res.render("upload");
    });

    router.put("/orderReadyToDispatch", async (req,res) => {
        const id = req.body.id;
        console.log(id)
        const query = "UPDATE customizeorders SET status='Printed' WHERE orderId='"+id+"'";
        const updateStatus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    
    res.json(updateStatus);
    });

    router.get("/printedOrders", async (req,res) => {
        const query = "SELECT * FROM customizeorders WHERE status='Printed'";
        const listOfPrintedOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(listOfPrintedOrders);
        // res.render("upload");
    });

    router.put("/orderDispatched", async (req,res) => {
        const id = req.body.id;
        console.log(id)
        const query = "UPDATE customizeorders SET status='Dispatched' WHERE orderId='"+id+"'";
        const updateStatus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    
    res.json(updateStatus);
    });

    router.get("/dispatchedOrders", async (req,res) => {
        const query = "SELECT * FROM customizeorders WHERE status='Dispatched'";
        const listOfDispatchedOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(listOfDispatchedOrders);
        // res.render("upload");
    });

    router.put("/orderClosed", async (req,res) => {
        const id = req.body.id;
        console.log(id)
        const query = "UPDATE customizeorders SET status='Order Closed' WHERE orderId='"+id+"'";
        const updateStatus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    
    res.json(updateStatus);
    });

    router.get("/closedOrders", async (req,res) => {
        const query = "SELECT * FROM customizeorders WHERE status='Order Closed'";
        const listOfDispatchedOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(listOfDispatchedOrders);
        // res.render("upload");
    });





    module.exports = router;