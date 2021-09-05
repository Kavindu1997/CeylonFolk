const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mime = require('mime');

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
    response.data = new Buffer(matches[2], 'base64');
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
        status: 'Pending',
        price: '1300',

            image: imagePath
        })
        res.status(200).json({
            success: "Success"
        })
    
    
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
        const query = "UPDATE customizeorders SET status='Ready to Dispatch' WHERE orderId='"+id+"'";
        const updateStatus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    
    res.json(updateStatus);
    });

    router.get("/printedOrders", async (req,res) => {
        const query = "SELECT * FROM customizeorders WHERE status='Ready to Dispatch'";
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