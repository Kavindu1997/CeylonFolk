const express = require("express");
const router = express.Router();
const { Contactus } = require('../models/');
const nodemailer = require('nodemailer');

router.post("/contactus", async(req, res) => {
    console.log(req.body)
    const { fullName,orderId, mobile, email, message, enquiryType} = req.body;
        // console.log(fullName)
        await Contactus.create({
            name: fullName,
            orderId:orderId,
            contactNo: mobile,
            email: email,
            message: message,
            enquiryType: enquiryType, 
            notifiFlag:0,  
            status:'not_solved' ,
            response:''      
        })

        const htmlEmail = `
            <h3> ${req.body.enquiryType}</h3>
            <ul> 
                <li>Name: ${req.body.fullName} </li>
                <li>Phone: ${req.body.mobile} </li>
                <li>Email: ${req.body.email} </li>
                <li>Name: ${req.body.orderId} </li>
            </ul>
            <h4> Message <h4>
            <p>${req.body.message}</p>`
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "testceylonfolk@gmail.com",
                pass: "pkjjt@1234"
            }
        });

        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.sendgrid.net',
        //     port: 25,
        //     auth: {
        //       user: apikey,
        //       pass: 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
        //     }
        //   });
        
        const mailOptions = {
            from: req.body.email, // sender address
            to: 'testceylonfolk@gmail.com', // list of receivers
            replyTo: req.body.email,
            subject: req.body.enquiryType, // Subject line
            text: req.body.message, // plain text body
            html: htmlEmail

        };

            await transporter.sendMail(mailOptions,(err,info) =>{
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
});

module.exports = router;