const express = require('express');
const router = express.Router();
const { UserManage,sequelize } = require('../models/');
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
    const { firstName, lastName, email, mobile, password,gender,userType } = req.body;

    const user = await UserManage.findOne({ where: { email: email } });
    bcrypt.hash(password, 10).then((hash) => {
        UserManage.create({
            first_name: firstName,
            last_name: lastName,
            email: email,
            mobile_no: mobile,
            password: hash,
            gender:gender,
            user_type:userType
        })
        res.json("SUCCESS");
    });
    if ((user.email == email)) res.json({ error: "Email already Exist!" });
});


router.get('/',async(req,res)=>{
    try {
        const userList=await UserManage.findAll();
        res.json(userList);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
  });


router.get("/:userId", async (req,res) => {
    const userId = req.params.userId
    const query = "SELECT first_name,last_name,email,mobile_no,gender,user_type FROM `usermanages` WHERE id='" + userId + "'";
    const result = await sequelize.query(query, {type: sequelize.QueryTypes.SELECT});
    res.json(result);
});


router.delete("/:userId",async (req,res)=>{
    const userId=req.params.userId;

    await  UserManage.destroy({
        where:{
            id:userId,
        },
    });
    res.json("DELETED SUCCESSFULLY");
})












module.exports = router;  