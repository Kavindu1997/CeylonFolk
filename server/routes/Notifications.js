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

router.get("/solvedInquiries/:contactus_id", async (req, res) => {
    const contactus_id = req.params.contactus_id;
    const query = "SELECT * from `contactus` WHERE status='solved' AND id='" + contactus_id + "' ";
    const listOfSolvedInquiries = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(listOfSolvedInquiries);
});

router.get("/unsolvedInquiries/:contactus_id", async (req, res) => {

    const contactus_id = req.params.contactus_id;
    const query = "SELECT * from `contactus` WHERE status='not_solved' AND id='" + contactus_id + "'";
    const listOfUnsolvedInquiries = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(listOfUnsolvedInquiries);
});

router.get("/resolvedInquiries", async (req, res) => {

    const query = "SELECT * from `contactus` WHERE status='solved'";
    const listOfResolvedInquiries = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(listOfResolvedInquiries);
});

router.get("/reorderlevel", async (req, res) => {

    const query = "SELECT * from `inventories` WHERE inventories.quantity <= inventories.margin";
    const reorderlevel = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(reorderlevel);
});

router.put("/unsolvedInquiries/:contactus_id", async (req, res) => {

    const contactus_id = req.params.contactus_id;
    const { response } = req.body;

    const querySelect = "SELECT * from `contactus` WHERE id='" + contactus_id + "'";
    const selectContactUs = await sequelize.query(querySelect, { type: sequelize.QueryTypes.SELECT });

    console.log("ddd");
    console.log(selectContactUs[0].enquiryType)

    const htmlEmail = `
    <h3> ${selectContactUs[0].enquiryType}</h3>
    <ul> 
        <li>Name: ${selectContactUs[0].fullName} </li>
        <li>OrderId: ${selectContactUs[0].orderId} </li>
    </ul>
    <h4> Response <h4>
    <p>${response}</p>`

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
    from:'testceylonfolk@gmail.com', // sender address
    to:'janani.gamage18@gmail.com' , // list of receivers
    replyTo: 'janani.gamage18@gmail.com' ,
    subject: 'Response to Your inquiry',
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

        console.log("dataaaa"+response);
    const query = "UPDATE `contactus` SET status='solved' , response='" + response + "' WHERE id='" + contactus_id + "'";
    const updateContactus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    res.json(updateContactus);
    res.status(200).json({
        success: "Success"
    }) 
     
         

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