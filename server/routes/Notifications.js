const express = require("express");
const router = express.Router();
const { Contactus, sequelize } = require('../models/');
const nodemailer = require('nodemailer');

router.get("/contactUs", async (req, res) => {

    const query = "SELECT * from `contactus` WHERE notifiFlag=0";
    const listOfNotifications = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(listOfNotifications);
});

router.get("/unsolvedInquiries", async (req, res) => {

    const query = "SELECT * from `contactus` WHERE status='not_solved'";
    const listOfUnsolvedInquiries = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(listOfUnsolvedInquiries);
});

router.get("/resolvedInquiries", async (req, res) => {

    const query = "SELECT * from `contactus` WHERE status='solved'";
    const listOfResolvedInquiries = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(listOfResolvedInquiries);
});

router.put("/unsolvedInquiries/:contactus_id", async (req, res) => {

    const contactus_id = req.params.contactus_id;
    const { response } = req.body;

    const query = "UPDATE `contactus` SET status='solved' , response='" + response + "' WHERE id='" + contactus_id + "'";
    const updateContactus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    res.json(updateContactus);
    res.status(200).json({
        success: "Success"
    })

    // const htmlEmail = `
    // <h3> ${req.body.enquiryType}</h3>
    // <ul> 
    //     <li>Name: ${req.body.fullName} </li>
    //     <li>Phone: ${req.body.mobile} </li>
    //     <li>Email: ${req.body.email} </li>
    //     <li>Name: ${req.body.orderId} </li>
    // </ul>
    // <h4> Message <h4>
    // <p>${req.body.message}</p>`

    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: "testceylonfolk@gmail.com",
    //         pass: "pkjjt@1234"
    //     }
    // });

    // // const transporter = nodemailer.createTransport({
    // //     host: 'smtp.sendgrid.net',
    // //     port: 25,
    // //     auth: {
    // //       user: apikey,
    // //       pass: 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
    // //     }
    // //   });

    // const mailOptions = {
    //     from: req.body.email, // sender address
    //     to: 'testceylonfolk@gmail.com', // list of receivers
    //     replyTo: req.body.email,
    //     subject: req.body.enquiryType, // Subject line
    //     text: req.body.message, // plain text body
    //     html: htmlEmail

    // };

    // await transporter.sendMail(mailOptions, (err, info) => {
    //     if (err) {
    //         console.log("error in sending mail", err)
    //         return res.status(400).json({
    //             message: `error in sending the mail${err}`
    //         })
    //     }
    //     else {
    //         console.log("successfully send message", info)
    //         alert("successfully send message");
    //         return res.json({
    //             message: info
    //         })
    //     }
    // });

    // res.json("SUCCESS");
// });

});

router.put("/contactUs", async (req, res) => {

    const query = "UPDATE `contactus` SET notifiFlag='1' WHERE notifiFlag='0'";
    const updateContactus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    res.json(updateContactus);
    res.status(200).json({
        success: "Success"
    })
});

module.exports = router;