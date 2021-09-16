const express = require("express");
const router = express.Router();
const { Orders, sequelize } = require('../models');
const nodemailer = require('nodemailer');

router.get("/getHistory/:id", async (req, res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '" + id + "' AND orders.isDeleted='0' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
});

router.get("/pendingOrders/:id", async(req,res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '"+id+"' AND orders.isDeleted='0' AND orders.status='1' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
})

router.get("/placedOrders/:id", async(req,res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '"+id+"' AND orders.isDeleted='0' AND orders.status='6' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
})

router.get("/notDepositedOrders/:id", async(req,res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '"+id+"' AND orders.isDeleted='0' AND orders.status='4' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
})

router.get("/depositedOrders/:id", async(req,res) => {
    const id = req.params.id;
    const query = "SELECT orders.orderId, orders.fullAmount, orders.status, STR_TO_DATE(orders.placedDate, '%Y-%m-%d') AS placedDate, masterdata.decription FROM orders INNER JOIN masterdata ON orders.status = masterdata.id WHERE orders.customerId = '"+id+"' AND orders.isDeleted='0' AND orders.status='5' ORDER BY placedDate DESC";
    const orderHistoryDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderHistoryDetails);
})

router.get("/order/:oId", async (req, res) => {
    const oId = req.params.oId;


    const query = "SELECT orders.fullAmount, orderitems.id AS orderitemId, designs.id, designs.coverImage, designs.design_name, orderitems.quantity, orderitems.size, designs.price, (SELECT sizes.id FROM sizes WHERE sizes.size=orderitems.size) AS sizeId, SUM( orderitems.quantity * designs.price ) AS totals, CASE WHEN orders.PaymentMethod = '7' AND orders.status = '1' THEN 1 WHEN orders.PaymentMethod = '9' AND orders.status = '4' THEN 1 ELSE 0 END AS canbecancel FROM orderitems INNER JOIN designs ON designs.id = orderitems.itemId INNER JOIN orders ON orders.orderId = orderitems.orderId INNER JOIN masterdata ON masterdata.id = orders.status WHERE orders.orderId = '"+oId+"' AND orderitems.isDeleted='0' GROUP BY orderitems.orderId, orderitems.itemId, orderitems.size ORDER BY orders.placedDate";

    const orderDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderDetails);
});

router.get("/orderTotal/:oId", async (req, res) => {
    const oId = req.params.oId;
    const query = "SELECT orders.fullAmount FROM orders WHERE orders.orderId = '" + oId + "'";
    const orderFullAmount = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(orderFullAmount);
});

router.post("/cancelItem", async (req, res) => {
    const orderId = req.body.orderId;
    const itemId = req.body.itemId;
    const size = req.body.size;
    const removeWholeOrder = req.body.removeWholeOrder;

  
    const query = "UPDATE orderitems SET isDeleted='1' WHERE orderId='"+orderId+"' AND itemId='"+itemId+"' AND size='"+size+"'";
    const deleteItem = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    if(removeWholeOrder == 1){
        const query = "UPDATE orders SET isDeleted='1', notifications='deleted' WHERE orderId='"+orderId+"'";
        const deleteItem1 = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });

    }
    const query1 = "UPDATE orders SET orders.fullAmount =( SELECT SUM( designs.price * orderitems.quantity ) FROM orderitems INNER JOIN designs ON designs.id = orderitems.itemId WHERE orderitems.orderId = orders.orderId AND orderitems.isDeleted='0') WHERE orders.orderId = '" + orderId + "'";
    const totalUpdate = await sequelize.query(query1, { type: sequelize.QueryTypes.UPDATE });
    res.json(deleteItem);
})

router.post("/cancelOrder", async(req,res) => {
    const orderId = req.body.orderId;
    const query = "UPDATE orderitems SET isDeleted='1' WHERE orderitems.orderId='"+orderId+"'";
    const deleteOrder = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
    const query1 = "UPDATE orders SET isDeleted='1', notifications='deleted' WHERE orderId='"+orderId+"'";
    const deleteOrder1 = await sequelize.query(query1, { type: sequelize.QueryTypes.UPDATE });
    res.json(deleteOrder);
})

router.get("/byIdForUpdate/:id", async (req,res) => {

    const id = req.params.id;
    const query1 = "SELECT sizes.size,sizes.id AS sizeId, inventories.id, inventories.quantity from `sizes` INNER JOIN `inventories` on inventories.size_id=sizes.id INNER JOIN `designs` on inventories.colour_id=designs.color_id WHERE designs.id='" + id + "'";
    const sizeList = await sequelize.query(query1, { type: sequelize.QueryTypes.SELECT });
    res.json(sizeList);
})

router.get("/getuser/:uid", async (req, res) => {
    const uid = req.params.uid;
    const query = "SELECT * FROM users WHERE id='" + uid + "'";
    const customerDetails = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    res.json(customerDetails);
})


router.put("/updateOrder", async(req,res) => {
    try{
        const oId = req.body.oId;
        const itemId = req.body.itemId;
        const quantity = req.body.quantity;
        const size = req.body.sizeLabel;
        const prevSizeLabel = req.body.prevSizeLabel;
        const orderitemId = req.body.orderitemId;
        const prevQuantity = req.body.prevQuantity;
        const sizeId = req.body.size;
        const uid = req.body.uid;
        const uname = req.body.uname;
        const query = "UPDATE orderitems SET quantity='"+quantity+"' , size='"+size+"' WHERE id='"+orderitemId+"'";
        const updateList = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
        const query1 = "UPDATE orders SET orders.notifications='edited', orders.fullAmount =( SELECT SUM( designs.price * orderitems.quantity ) FROM orderitems INNER JOIN designs ON designs.id = orderitems.itemId WHERE orderitems.orderId = orders.orderId ) WHERE orders.orderId = '"+oId+"'";
        const totalUpdate = await sequelize.query(query1, {type: sequelize.QueryTypes.UPDATE});
        
        if(quantity > prevQuantity){
            const query2 = "UPDATE inventories SET quantity=quantity-('"+quantity+"'-'"+prevQuantity+"') WHERE size_id='"+sizeId+"' AND colour_id=(SELECT color_id FROM designs WHERE id='"+itemId+"') AND type_id=(SELECT type_id FROM designs WHERE id='"+itemId+"')";
            const inventUpdate1 = await sequelize.query(query2, {type: sequelize.QueryTypes.UPDATE});
        }else{
            const query3 = "UPDATE inventories SET quantity=quantity+('"+prevQuantity+"'-'"+quantity+"') WHERE size_id='"+sizeId+"' AND colour_id=(SELECT color_id FROM designs WHERE id='"+itemId+"') AND type_id=(SELECT type_id FROM designs WHERE id='"+itemId+"')";
            const inventUpdate2 = await sequelize.query(query3, {type: sequelize.QueryTypes.UPDATE});
        }
        const query4 = "SELECT * FROM users WHERE id='"+uid+"'";
        const customerDetails = await sequelize.query(query4, {type: sequelize.QueryTypes.SELECT});
        console.log(customerDetails)

        const query5 = "SELECT * FROM orders INNER JOIN masterdata ON orders.PaymentMethod=masterdata.id WHERE orderId='"+oId+"'";
        const orderDetails = await sequelize.query(query5, {type: sequelize.QueryTypes.SELECT});
        console.log(orderDetails)

        var emailDetails = {
            name: uname,
            orderId: oId,
            email: customerDetails[0].email,
            message: 'Dear customer, <br />Your order has been successfully edited. Thank you for shopping with us.',
            description: orderDetails[0].decription,
            url: '',
            subject: 'CeylonFolk order confirmation',
            total: orderDetails[0].fullAmount,
            urlMsg: ''
        }
        if(emailDetails.description==='bank transfer'){
            emailDetails.description = 'Bank Deposit';
            emailDetails.urlMsg = 'Upload the deposit slip';
            emailDetails.url = 'http://localhost:3000/deposit?id='+uid+'&orderIdFromEmail='+oId+ '';
        }else if(emailDetails.description==='cash on delivery'){
            emailDetails.description = 'Cash on Delivery';
            emailDetails.urlMsg = 'To view your past order details';
            emailDetails.url = 'http://localhost:3000/myOrders?id='+uid+'';
        }else if(emailDetails.description==='payhere'){
            emailDetails.description = 'Online payment method';
            emailDetails.urlMsg = 'To view your past order details';
            emailDetails.url = 'http://localhost:3000/myOrders?id='+uid+'';
        }
        sendEmail(emailDetails)
        res.json({data:1});
    }
    catch(e){
        res.json({data:0});

    }

})

async function sendEmail(emailDetails) {
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
            to: emailDetails.email, // list of receivers
            replyTo: 'testceylonfolk@gmail.com',
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

router.get("/getUserDetails/:uid", async (req, res) => {
    const uid = req.params.uid;
    const query = "SELECT * FROM users WHERE id='" + uid + "'";
    const deposits = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    console.log(res)
    res.json(deposits);
})

router.get("/getCount", async (req, res) => {
    let data = [
        pendingOrders = '',
        acceptedOrders = '',
        dispatchedOrders = '',
        rejectedOrders = '',
    ]

    console.log(data);

    const query1 = "SELECT COUNT(status) AS pendingCount FROM orders WHERE status='1'";
    const pending = await sequelize.query(query1, { type: sequelize.QueryTypes.SELECT });

    data = {
        pendingOrders: pending[0].pendingCount,
        acceptedOrders: '',
        dispatchedOrders: '',
        rejectedOrders: '',
    }
    console.log(data);

    const query2 = "SELECT COUNT(status) AS acceptCount FROM orders WHERE status='2'";
    const accept = await sequelize.query(query2, { type: sequelize.QueryTypes.SELECT });
    data = {
        pendingOrders: pending[0].pendingCount,
        acceptedOrders: accept[0].acceptCount,
        dispatchedOrders: '',
        rejectedOrders: '',
    }
    console.log(data);

    const query3 = "SELECT COUNT(status) AS dispatchCount FROM orders WHERE status='6'";
    const dispatched = await sequelize.query(query3, { type: sequelize.QueryTypes.SELECT });
    data = {
        pendingOrders: pending[0].pendingCount,
        acceptedOrders: accept[0].acceptCount,
        dispatchedOrders: dispatched[0].dispatchCount,
        rejectedOrders: '',
    }
    console.log(data);

    const query4 = "SELECT COUNT(status) AS rejectCount FROM orders WHERE status='6'";
    const rejected = await sequelize.query(query4, { type: sequelize.QueryTypes.SELECT });
    data = {
        pendingOrders: pending[0].pendingCount,
        acceptedOrders: accept[0].acceptCount,
        dispatchedOrders: dispatched[0].dispatchCount,
        rejectedOrders: rejected[0].rejectCount,
    }
    console.log(data);
    res.json(data);
})

router.get('/getSales',async(req,res)=>{
    try {
        const query = "SELECT SUM(fullAmount) AS sales_amount FROM orders";
        const salesAmount = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        res.json(salesAmount);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
  });

module.exports = router;