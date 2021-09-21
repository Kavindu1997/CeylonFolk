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

router.get("/offerdate", async (req, res) => {

    const today = new Date().toISOString().slice(0, 10);

    const query = "SELECT collections.collection_name, offers.to from `collections` INNER JOIN `offers` on collections.id=offers.collection_id WHERE offers.to<= '" + today + "'";
    const offerDate = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(offerDate);
   
});

router.get("/editedorders", async (req, res) => {

    const query = "SELECT * from `orders` WHERE orders.flag=0 and orders.notifications='edited'";
    const editedOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(editedOrders);
   
});

router.get("/deletedorders", async (req, res) => {

    const query = "SELECT * from `orders` WHERE orders.flag=0 and orders.notifications='deleted'";
    const deletedOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(deletedOrders);
    console.log(deletedOrders);
});

router.get("/placedorders", async (req, res) => {

    const query = "SELECT * from `orders` WHERE orders.flag=0 and orders.notifications='placed'";
    const placedOrders = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(placedOrders);
    console.log(placedOrders);
});

router.get("/bankDeposits", async (req, res) => {

    const query = "SELECT * from `deposits` WHERE flag=0";
    const bankDeposits = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(bankDeposits);
   
});


router.get("/pendingCO", async (req, res) => {

    const query = "SELECT * from `customizeorders` WHERE notificationFlag=0 and notificationStatus='Pending'";
    const pendingCO = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(pendingCO);
   
});

router.get("/recievedCO", async (req, res) => {

    const query = "SELECT * from `customizeorders` WHERE notificationFlag=0 and notificationStatus='Recieved'";
    const recievedCO = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(recievedCO);
   
});

router.get("/advancepaidCO", async (req, res) => {

    const query = "SELECT * from `customizeorders` WHERE notificationFlag=0 and notificationStatus='Advance Paid'";
    const advancepaidCO = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(advancepaidCO);
   
});

router.get("/paidCO", async (req, res) => {

    const query = "SELECT * from `customizeorders` WHERE notificationFlag=0 and notificationStatus='Paid'";
    const paidCO = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(paidCO);
   
});

router.get("/canceledCO", async (req, res) => {

    const query = "SELECT * from `customizeorders` WHERE notificationFlag=0 and notificationStatus='Canceled'";
    const canceledCO = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(canceledCO);
   
});

router.put("/pendingCO", async (req, res) => {

 
    const query = "UPDATE `customizeorders` SET notificationFlag='1' WHERE notificationFlag=0 and notificationStatus='Pending'";
    const updateCustomizeOrders = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

    res.status(200).json({
        success: "Success"
    })

});

router.put("/recievedCO", async (req, res) => {

    const query = "UPDATE `customizeorders` SET notificationFlag='1' WHERE notificationFlag=0  and notificationStatus='Recieved'";
    const updateCustomizeOrders = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    res.status(200).json({
        success: "Success"
    })
   
});

router.put("/advancepaidCO", async (req, res) => {

    const query = "UPDATE `customizeorders` SET notificationFlag='1' WHERE notificationFlag=0  and notificationStatus='Advance Paid'";
    const updateCustomizeOrders = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

    res.status(200).json({
        success: "Success"
    })
   
});

router.put("/paidCO", async (req, res) => {

    const query = "UPDATE `customizeorders` SET notificationFlag='1' WHERE notificationFlag=0  and notificationStatus='Paid'";
    const updateCustomizeOrders = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
  
    res.status(200).json({
        success: "Success"
    })

});

router.put("/canceledCO", async (req, res) => {

    const query = "UPDATE `customizeorders` SET notificationFlag='1' WHERE notificationFlag=0  and notificationStatus='Canceled'";
    const updateCustomizeOrders = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
  
    res.status(200).json({
        success: "Success"
    })

});



router.put("/editedorders", async (req, res) => {
    const query = "UPDATE `orders` SET flag='1' WHERE flag='0' and orders.notifications='edited'";
    const updateOrders = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

    res.status(200).json({
        success: "Success"
    })

});

router.put("/deletedorders", async (req, res) => {

    const query = "UPDATE `orders` SET flag='1' WHERE flag='0' and orders.notifications='deleted' ";
    const updateOrders = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

    res.status(200).json({
        success: "Success"
    })
});

router.put("/placedorders", async (req, res) => {

    const query = "UPDATE `orders` SET flag='1' WHERE flag='0' and orders.notifications='placed'";
    const updateOrders = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

    res.status(200).json({
        success: "Success"
    })
});

router.put("/bankDeposits", async (req, res) => {
    const query = "UPDATE `deposits` SET flag='1' WHERE flag='0'";
    const updateDeposits = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

    res.status(200).json({
        success: "Success"
    })

});

router.put("/unsolvedInquiries/:contactus_id", async (req, res) => {
    

    try{
       
        
    const contactus_id = req.params.contactus_id;
    const { response } = req.body;

    const querySelect = "SELECT * from `contactus` WHERE id='" + contactus_id + "'";
    const selectContactUs = await sequelize.query(querySelect, { type: sequelize.QueryTypes.SELECT });

    const htmlEmail = `
    <h3> ${selectContactUs[0].enquiryType}</h3>
    <ul> 
        <li>Name: ${selectContactUs[0].name} </li>
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
    to: selectContactUs[0].email , // list of receivers
    replyTo: selectContactUs[0].email  ,
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


   
    const query = "UPDATE `contactus` SET status='solved' , response='" + response + "' WHERE id='" + contactus_id + "'";
    const updateContactus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

     
        res.json({data:1});
    }
    catch(e){
        res.json({data:0});
    }


});

router.put("/contactUs", async (req, res) => {

    const query = "UPDATE `contactus` SET notifiFlag='1' WHERE notifiFlag='0'";
    const updateContactus = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

    res.status(200).json({
        success: "Success"
    })
});

module.exports = router;