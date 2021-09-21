const nodemailer = require('nodemailer');

// exports.sendMail=(req,res)=>{
//     console.log("req body",req.body);
//     let userMail = req.body.email;
//     let userenquiry = req.body.enqueryType;
//     let userMessage = req.body.message;
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth : {
    //         user: 'testceylonfolk@.com',
    //         pass: 'pkjjt@1234'
    //     }
    // })
    const transporter = nodemailer.createTransport({
        host: "'gmail'", //replace with your email provider
        port: 587,
        auth : {
            user: 'testceylonfolk@.com',
            pass: 'pkjjt@1234'
        }
      });

      transporter.verify(function(error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });

    

    // const message = {
    //     from: 'testceylonfolk@.com',
    //     to: userMail,
    //     subject: userenquiry,
    //     text: userMessage,
    //     html: '<p>HTML version of the message</p>',
    // };

    // transporter.sendMail(err,info)=>{
    //     if(err){
    //         console.log("error in sending mail",err)
    //         return res.status(400).json({
    //             message:`error in sending the mail${err}`
    //         })
    //     }
    //     else{
    //         console.log("successfully send message",info)
    //         alert("successfully send message");
    //         return res.json({
    //             message:info
    //         })
    //     }
    // }
    // transporter.sendMail({
    //     from: userMail,
    //     to: 'testceylonfolk@.com',
    //     subject: userenquiry,
    //     text: userMessage
    // }, (err, info) => {
    //     console.log(info.envelope);
    //     console.log(info.messageId);
    // });
// }