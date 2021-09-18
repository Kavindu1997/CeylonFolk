const express = require("express");
const router = express.Router();
const { Cart, sequelize } = require('../models');
const { Desings } = require('../models');
const { Users } = require('../models');
const { Orders } = require('../models');
const { OrderItems } = require('../models');
const { validateToken } = require("../middlewares/AuthMiddleware");
const { request } = require("express");
const nodemailer = require('nodemailer');

router.get("/customer/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM users WHERE id='" + id + "'";
    const customerDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(customerDetails);
});

router.post("/cashOn", async (req, res) => {
    try{
        const uid = req.body.userId;
        const oid = req.body.orderId;
        const total = req.body.totalAmount;
        const pmt = req.body.payment;
        const stu = req.body.status;
        const items = req.body.itemArray;
        const add = req.body.delivery;
        const date = req.body.placedDate;
        const contactNo = req.body.phoneNo;
        const name = req.body.name;
        const email = req.body.email;
        const payMethod = req.body.paymentMethod;
        const specialNote = req.body.specialNote;
        const customerCoupon = req.body.customerCoupon;
        const  isCouponValidated= req.body.isCouponValidated;
        const query = "INSERT INTO orders (orderId,customerId,fullAmount,PaymentMethod,status, deliveryAddress,contactNo, placedDate,specialNotes,notifications) VALUES ('" + oid + "','" + uid + "','" + total + "','" + pmt + "','" + stu + "','" + add + "','" + contactNo + "','" + date + "','"+specialNote+"','placed')";
        const cashOnOrder = await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
        res.json(cashOnOrder);
        for (let i = 0; i < items.length; i++) {
            const query1 = "INSERT INTO orderitems (orderId, itemId, quantity, size) VALUES ('" + oid + "','" + items[i].itemId + "','" + items[i].quantity + "','" + items[i].size + "')";
            const cashOrderItem = await sequelize.query(query1, { type: sequelize.QueryTypes.INSERT });
        }
        var emailDetails = {
            name: name,
            orderId: oid,
            email: email,
            message: 'Dear customer, <br />Your order has been successfully placed. Thank you for shopping with us.',
            description: pmt,
            url: '',
            subject: 'CeylonFolk order confirmation',
            total: total,
            urlMsg: ''
        }
        if(payMethod==='bank'){
            emailDetails.description = 'Bank Deposit <br /><br /> <b><u>Account Details</u></b><br />Bank: Sampath Bank <br />Account holder: CeylonFolk (Pvt) Ltd <br />Account number: 11223344889 <br />Branch: Kaduwela <br />';
            emailDetails.urlMsg = 'Please upload your slip within 72 hours. After 72 hours the order might be cancelled. You can use a bank slip or a screenshot of the online transfer to confirm the payment. <br />Please contact us for any inquires: 011234789 <br />Upload the deposit slip: ';
            emailDetails.url = 'http://localhost:3000/deposit?id='+uid+'&orderIdFromEmail='+oid+ '';
        }else if(payMethod==='cash'){
            emailDetails.description = 'Cash on Delivery';
            emailDetails.urlMsg = 'To view your past order details';
            emailDetails.url = 'http://localhost:3000/myOrders?id='+uid+'';
        }else if(payMethod==='online'){
            emailDetails.description = 'Online payment method';
            emailDetails.urlMsg = 'To view your past order details';
            emailDetails.url = 'http://localhost:3000/myOrders?id='+uid+'';
        }
        // if(isCouponValidated==1){
        //     const query = "UPDATE coupons SET isUsed=1, usedBy='"+uid+"' WHERE coupon_number='"+customerCoupon+"'";
        //     const couponUpdate = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
        // }
        updateInventory(items)
        var value = sendEmail(emailDetails)
        res.json({data:1});
    }
    catch(e){
        res.json({data:0});
    }
  

});


async function updateInventory(items) {
    for (let i = 0; i < items.length; i++) {
        const query = "SELECT inventories.id FROM inventories INNER JOIN designs on designs.color_id=inventories.colour_id AND designs.type_id=inventories.type_id INNER JOIN sizes ON sizes.id=inventories.size_id WHERE designs.id='" + items[i].itemId + "' AND sizes.size='" + items[i].size + "'";
        const inventoryId = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        console.log(inventoryId)
        const updateQuery = "UPDATE inventories SET quantity=quantity-" + items[i].quantity + " WHERE id='" + inventoryId[0].id + "'";
        const quantityUpdate = await sequelize.query(updateQuery, { type: sequelize.QueryTypes.UPDATE });
    }
}

async function sendEmail(emailDetails){
  
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
       
        const mailOptions = {
            from: 'testceylonfolk@gmail.com', // sender address
            to: emailDetails.email, // list of receivers
            replyTo: 'testceylonfolk@gmail.com',
            subject: emailDetails.subject, // Subject line
            text: emailDetails.message, // plain text body
            html: htmlEmail

        };
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

router.put("/deleteCart", async (req, res) => {

    try{
        const uid = req.body.userId;
        const oid = req.body.orderId;
        const total = req.body.totalAmount;
        const pmt = req.body.payment;
        const stu = req.body.status;
        const items = req.body.itemArray;
        for (let i = 0; i < items.length; i++) {
            const query = "UPDATE carts SET carts.isDeleted=1, isBought=1 WHERE carts.itemId='" + items[i].itemId + "' AND carts.customerId='" + uid + "' AND carts.isBought=0 AND carts.isDeleted=0";
            const cartRemove = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

        }
        res.json({status:1});
    }catch (e){
        res.json({status:0});
    }
    
   
});

router.put("/remove", async (req, res) => {
    try{
        const uid = req.body.userId;
        const id = req.body.itemId;
        const size = req.body.size;
        const query = "UPDATE carts SET carts.isDeleted=1 WHERE carts.itemId='" + id + "' AND carts.size='" + size +"' AND carts.customerId='" + uid + "' AND carts.isBought=0";
        const itemRemove = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
        res.json({data:1});
    }catch(e){
        res.json({data:0});
    }
   
});

router.post("/addToCart", async (req, res) => {
    try{
        const id = req.body.productId;
        const qty = req.body.quantity;
        const uid = req.body.userId;
        const size = req.body.size;
        const query = "INSERT INTO carts (customerId,itemId,quantity,size) VALUES('" + uid + "','" + id + "','" + qty + "','" + size + "')";
        const addCart = await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
        res.json({data:1});
    }catch(e){
        res.json({data:0});
    }
    
});

router.post("/addToCartBatchwise", async (req, res) => {
    var cart = [];
    cart = req.body.cart;
    var uid = req.body.uid;
    for (let i = 0; i < cart.length; i++) {
        try {
            var query = "INSERT INTO carts (customerId,itemId,quantity,size) VALUES('" + uid + "','" + cart[i].productId + "','" + cart[i].quantity + "','" + cart[i].size + "')";
            var addCart = await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
        } catch (e) {

        }
    }
    res.json(cart.length);
});

router.get("/items/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT designs.id AS productId, carts.id, carts.customerId, designs.design_name AS name, SUM(carts.quantity) AS quantity, designs.coverImage AS image, designs.price, carts.itemId, carts.size, SUM(carts.quantity * designs.price) AS totals, (select inventories.quantity from inventories where inventories.size_id=sizes.id and inventories.colour_id = designs.color_id AND inventories.type_id = designs.type_id) as stockMargin FROM `designs` INNER JOIN `carts` ON designs.id = carts.itemId INNER JOIN `users` ON users.id = carts.customerId INNER JOIN sizes ON sizes.size = carts.size WHERE carts.isDeleted = 0 AND carts.isBought = 0 AND users.id = '"+id+"' GROUP BY carts.itemId, carts.size";
    const itemDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(itemDetails);
});

router.get("/count/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT COUNT( * ) AS count FROM `carts` WHERE carts.isDeleted=0 And carts.isBought=0 And carts.customerId='" + id + "' GROUP BY carts.id";
    const countDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(countDetails);
});

router.get("/total/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT carts.customerId, SUM(carts.quantity*designs.price) as total FROM `designs` INNER JOIN `carts` ON designs.id=carts.itemId INNER JOIN `users` ON users.id=carts.customerId WHERE  carts.isDeleted=0 And carts.isBought=0 and users.id= " + id;
    const totalDetails = await sequelize.query(query,
        {
            type: sequelize.QueryTypes.SELECT
        });
    res.json(totalDetails);

});

router.put("/updateQty", async (req, res) => {
    try{
        var uid = req.body.uid;
        const items = req.body.itemArray;
        for (let i = 0; i < items.length; i++) {
            const query = "UPDATE carts SET quantity='" + items[i].quantity + "' WHERE carts.itemId='" + items[i].itemId + "' AND carts.size='"+items[i].size+"' AND carts.customerId='" + uid + "' AND carts.isBought=0 AND carts.isDeleted=0";
            const updatedCart = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
        }
        res.json({data:1});
    }
    catch(e){
        res.json({data:0});
    }

});

router.get("/district", async (req, res) => {
    const query = "SELECT *, ( SELECT m2.subValue FROM masterdata m2 WHERE m2.value = m1.value AND m2.type = 'deliveryType' ) AS deliveryCharge FROM masterdata m1 WHERE m1.type = 'delivery'";
    const deliveryDistrict = await sequelize.query(query,
        {
            type: sequelize.QueryTypes.SELECT
        });
        
    res.json(deliveryDistrict);

});

router.get("/coupon", async (req, res) => {
    var data = { status:0 , data:[], msg:"" }
    console.log(req.query.today, req.query.couponName)
    const couponName = req.query.couponName;
    const today = req.query.today;
    const query = "SELECT * FROM coupons WHERE coupon_number='" + couponName + "'";
    const couponInTable = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    console.log(couponInTable.length)
    if(couponInTable.length>0){
        const query1 = "SELECT discount_amount FROM coupons WHERE coupon_number='" + couponName + "' AND end_date >= '" + today + "'";
        const couponValid = await sequelize.query(query1, { type: sequelize.QueryTypes.SELECT });
        console.log(couponValid)
        if(couponValid.length>0){
            data.data=couponValid
            data.msg="Coupon has successfully applied !"

        }else{
            data.status=1
            data.msg="Coupon has expired !"
        }
    }else{
        data.status=2
        data.msg="Not a valid coupon !"
    }
    res.json(data)
});



module.exports = router;