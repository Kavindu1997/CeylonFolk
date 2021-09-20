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
        orderNo: req.body.orderNo,
        customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
        status: 'Pending',
        notificationStatus: 'Pending',
        price: req.body.price,
        textCount: req.body.textCount,
        imageCount: req.body.imageCount,
        fixedPrice: req.body.price,
        size: req.body.size,
        notificationFlag: 0,
        note:req.body.note,
        
        deleteFlag: 'false',

            image: imagePath
        })
        res.status(200).json({
            success: "Success"
        })

        const htmlEmail = `
            <center>
        <h3>You have new customized Order from ${req.body.userName}</h3>
                <h4>Customer ID: ${req.body.customerId} </h4>
                <h4>Order No: ${req.body.orderNo} </h4>
                <h4>Customer Name: ${req.body.customerName} </h4>
                <h4>Customer Emali: ${req.body.customerEmail} </h4>
            <img height={200} align="center" src='http://localhost:3001/' + ${imagePath} alt=""></img>
            <center>
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
            subject: 'New Order', // Subject line
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
        const query = "SELECT * FROM customizeorders WHERE (status='Pending' AND deleteFlag='false')";
        const listOfCustomizedOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(listOfCustomizedOrders);
        // res.render("upload");
    });

    router.put("/orderAccepted", async (req,res) => {

        const id = req.body.id;
        const oNo = req.body.oNo;
        const price = req.body.price
        const email = req.body.email
        console.log(price)

        const htmlEmail = `
        <center>
            <h4>Your ${oNo} order has been Accepted</h4>
            <h4>You have to make a advance payment to confirm the order</h4>
            <h4>Order No : ${oNo}</h4>
            <h4>Your Advance : ${price/2}</h4>
            <h4>Click <a href='http://localhost:3000/orderView/${id}'>Here</a> to review yor order status </h4>
            <h4>Thank you for Ordering with Ceylonfork</h4>
            <center>`

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
                to: email, // list of receivers
                replyTo: req.body.email,
                subject: "Customize Order Acceptance", // Subject line
                text: 'Customize Order Acceptance', // plain text body
                html: htmlEmail,
                amp:  `<!doctype html>
                <html>
                  <head>
                    <meta charset="utf-8">
                    <style amp4email-boilerplate>body{visibility:hidden}</style>
                    <script async src="https://cdn.ampproject.org/v0.js"></script>
                    <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
                  </head>
                  <body>
                    <p>Image: <amp-img src="http://localhost:3001/public/designs/1629720750851.jpg" width="16" height="16"/></p>
                  </body>
                </html>`
    
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
    
            

        const query = "UPDATE customizeorders SET status='Accept', price='"+price+"', notificationStatus='False', WHERE orderId='"+id+"'";
        const updateStatus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

        const query2 = "SELECT * FROM customizeorders WHERE (status='Pending' AND deleteFlag='false')";
        const listOfCustomizedOrders = await sequelize.query(query2, { type: sequelize.QueryTypes.SELECT });
        res.json(listOfCustomizedOrders);
    
    // res.json(updateStatus);
    });

    router.get("/acceptedOrders", async (req,res) => {
        const query = "SELECT * FROM customizeorders WHERE status='Accept' AND deleteFlag='false'";
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
        const query = "SELECT * FROM customizeorders WHERE customerId='"+id+"' AND deleteFlag='false'";
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

        const htmlEmail = `
        <center>
            <h4>Your ${req.body.orderNo} order start Printing</h4>
            <h4>Order No : ${req.body.orderNo}</h4>
            <h4>Thank you for Ordering with Ceylonfork</h4>
            <center>`

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
                from: "testceylonfolk@gmail.com", // sender address
                to: req.body.email, // list of receivers
                replyTo: "testceylonfolk@gmail.com",
                subject: "Customize Order Acceptance", // Subject line
                text: 'Customize Order Acceptance', // plain text body
                html: htmlEmail,
                
    
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

        const htmlEmail = `
        <center>
            <h4>Your ${req.body.orderNo} is ready to dispatch</h4>
            <h4>Order No : ${req.body.orderNo}</h4>
            <h4>Make the rest payment to diliver yor order to your door step</h4>
            <h2 color='blue'>Thank you for Ordering with Ceylonfork</h2>
            <center>`

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
                from: "testceylonfolk@gmail.com", // sender address
                to: req.body.email, // list of receivers
                replyTo: "testceylonfolk@gmail.com",
                subject: "Customize Order Acceptance", // Subject line
                text: 'Customize Order Acceptance', // plain text body
                html: htmlEmail,
                
    
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

        const htmlEmail = `
        <center>
            <h4>Your ${req.body.oNo} dispatched</h4>
            <h4>Order No : ${req.body.oNo}</h4>
            <h2 color='blue'>Thank you for Ordering with Ceylonfork</h2>
            <center>`

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
                from: "testceylonfolk@gmail.com", // sender address
                to: req.body.email, // list of receivers
                replyTo: "testceylonfolk@gmail.com",
                subject: "Customize Order Acceptance", // Subject line
                text: 'Customize Order Acceptance', // plain text body
                html: htmlEmail,
                
    
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
        const query = "SELECT * FROM customizeorders WHERE status='Recieved'";
        const listOfDispatchedOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(listOfDispatchedOrders);
        // res.render("upload");
    });

    router.put("/advancePaid", async (req,res) => {
        const id = req.body.id;
        const orderNo = req.body.orderNo;
        const price = req.body.price;
        console.log(id)

        const htmlEmail = `
            <center>
        <h3>${req.body.fullName} Succseccfully made advance payent</h3>
                <h4>Customer ID: ${req.body.userId} </h4>
                <h4>Order No: ${req.body.orderNo} </h4>
                <h4>Customer Name: ${req.body.fullName} </h4>
                <h4>Customer Emali: ${req.body.email} </h4>
            <center>`

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
                subject: 'Advance Payment', // Subject line
                text: 'Advance Payment', // plain text body
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

                     const htmlEmail2 = `
            <center>
        <h3>Succseccfully made advance payent</h3>
                <h4>Order No: ${req.body.orderNo} </h4>
                <h4>Advance: ${req.body.price} </h4>
            <center>`

            const mailOptions2 = {
                from: 'testceylonfolk@gmail.com', // sender address
                to: req.body.email, // list of receivers
                replyTo: 'testceylonfolk@gmail.com',
                html: 'Embedded image: <img src="cid:ceylon"/>',
                
                subject: 'Advance Payment', // Subject line
                text: 'Advance Payment', // plain text body
                html: htmlEmail2
    
            };

            transporter.sendMail(mailOptions2,(err,info) =>{
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
    
            

        
        const query = "UPDATE customizeorders SET status='Advance Paid', notificationStatus='Advance Paid', notificationFlag=0, price='"+price+"', totalAmount='"+price+"' WHERE orderId='"+id+"'";
        const updateStatus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    
    res.json(updateStatus);
    });

    router.put("/orderPaid", async (req,res) => {
        const id = req.body.id;
        // const orderNo = req.body.orderNo;
        const totalAmount = req.body.totalAmount;
        const address = req.body.delivery;
        const date = req.body.placedDate;
        const fixedPrice = req.body.totalAmount;
        console.log(id)
    
            

        
        const query = "UPDATE customizeorders SET status='Paid',  totalAmount='"+totalAmount+"', fixedPrice='"+fixedPrice+"', address='"+address+"', notificationStatus='Paid', notificationFlag=0, note='"+note+"', placedDate='"+date+"' WHERE orderId='"+id+"'";
        const updateStatus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    
    res.json(updateStatus);
    });

    router.get("/advancePayment", async (req,res) => {
        const query = "SELECT * FROM customizeorders WHERE status='Advance Paid'";
        const listOfAdvancePaidOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(listOfAdvancePaidOrders);
        // res.render("upload");
    });

    router.get("/selectPaid", async (req,res) => {
        const query = "SELECT * FROM customizeorders WHERE status='Paid'";
        const listOfPaidOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(listOfPaidOrders);
        // res.render("upload");
    });

    router.put("/recieved", async (req,res) => {
        const id = req.body.id;
        const query = "UPDATE customizeorders SET status='Recieved', notificationStatus='Recieved', notificationFlag=0, WHERE orderId='"+id+"'";
        const updateStatus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
        res.json(updateStatus);
        // res.render("upload");
    });

    router.put("/changeStatus", async (req,res) => {
        const id = req.body.id;
        const query = "UPDATE customizeorders SET status='Pending' WHERE orderId='"+id+"'";
        const updateStatus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
        res.json(updateStatus);
        // res.render("upload");
    });

    router.put("/reject", async (req,res) => {
        const id = req.body.id;
        const email = req.body.email;
        const notification = req.body.notification
        console.log(id)

        const htmlEmail = `
        <center>
            <h3>${req.body.orderNo} Order Rejection</h3>
            
            <h4>Order No: ${req.body.orderNo} </h4>
                <h4>Reason for Rejection: ${req.body.notification} </h4>
                <h4> <a href='http://localhost:3000/contactus'>Contact Us</a> for more details </h4>
            <h3>Thank you for Ordering with Ceylonfork</h4>
            
            </center>`
        
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
            from: 'testceylonfolk@gmail.com', // sender address
            to: req.body.email, // list of receivers
            replyTo: req.body.email,
            subject: 'Order Rejection', // Subject line
            text: req.body.message, // plain text body
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

        const query = "UPDATE customizeorders SET status='Rejected', deleteFlag='reject', notificationStatus='false' WHERE orderId='"+id+"'";
        const updateStatus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    
    res.json(updateStatus);
    });

    router.put("/orderCanceled", async (req,res) => {
        const id = req.body.id;
        const email = req.body.email;
        const notification = id + 'order canceled'
        console.log(id)
        // console.log(orderNo)

        const htmlEmail = `
            <h3>${req.body.orderNo} Order Canceled</h3>
            <ul> 
                <li>Customer ID : ${req.body.userId}</li>
                <li>Customer Name : ${req.body.fullName}</li>
                <li>Customer Email : ${req.body.email}</li>
            </ul>`
        
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
            to: "testceylonfolk@gmail.com", // list of receivers
            replyTo: req.body.email,
            subject: req.body.enquiryType, // Subject line
            text: req.body.message, // plain text body
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


        const query = "UPDATE customizeorders SET status='Canceled', deleteFlag='cancel', notificationStatus='Canceled', notificationFlag=0 WHERE orderId='"+id+"'";
        const updateStatus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    
    res.json(updateStatus);
    });

    router.get("/getCount", async (req, res) => {
        let data = [
            pendingOrders = '',
            printingOrders = '',
            printedOrders = '',
            recievedOrders = '',
        ]
    
        const query1 = "SELECT COUNT(status) AS pendingCount FROM customizeorders WHERE status='Pending'";
        const pending = await sequelize.query(query1, { type: sequelize.QueryTypes.SELECT });
    
        data = {
            pendingOrders: pending[0].pendingCount,
            printingOrders: '',
            printedOrders: '',
            recievedOrders: '',
        }
    
    
        const query2 = "SELECT COUNT(status) AS printingCount FROM customizeorders WHERE status='Printing'";
        const printing = await sequelize.query(query2, { type: sequelize.QueryTypes.SELECT });
        data = {
            pendingOrders: pending[0].pendingCount,
            printingOrders: printing[0].printingCount ,
            printedOrders: '',
            recievedOrders: '',
        }
    
    
        const query3 = "SELECT COUNT(status) AS printedCount FROM customizeorders WHERE status='Printed'";
        const dispatched = await sequelize.query(query3, { type: sequelize.QueryTypes.SELECT });
        data = {
            pendingOrders: pending[0].pendingCount,
            printingOrders: printing[0].printingCount,
            printedOrders: dispatched[0].printedCount,
            recievedOrders: '',
        }
    
        const query4 = "SELECT COUNT(status) AS recievedCount FROM customizeorders WHERE status='Closed'";
        const printed = await sequelize.query(query4, { type: sequelize.QueryTypes.SELECT });
        data = {
            pendingOrders: pending[0].pendingCount,
            printingOrders: printing[0].printingCount,
            printedOrders: dispatched[0].printedCount,
            recievedOrders: printed[0].recievedCount,
        }
        res.json(data);
    })

    router.get("/allOrders/:id", async (req, res) => {
        const id = req.params.id;
        const product = await CustomizeOrders.findByPk(id)
        console.log(product)
        res.json(product);
    });





    module.exports = router;