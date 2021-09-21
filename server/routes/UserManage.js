const express = require('express');
const router = express.Router();
const { UserManage,sequelize } = require('../models/');
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
    const { first_name, last_name, email, mobile_no, password,gender,user_type } = req.body;

    const user = await UserManage.findOne({ where: { email: email } });
    bcrypt.hash(password, 10).then((hash) => {
        UserManage.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            mobile_no: mobile_no,
            password: hash,
            gender:gender,
            user_type:user_type
        })
        res.json("SUCCESS");
    });
    if ((user.email == email)) res.json({ error: "Email already Exist!" });
});


router.get('/',async(req,res)=>{
    try {
        const userList=await UserManage.findAll({
            attributes:{exclude:["createdAt","updatedAt"]}
        });
        res.json(userList);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
  });


router.put("/:userId", async (req,res) => {
    const userId = req.params.userId
    const { first_name, last_name, email, mobile_no,gender,user_type } = req.body;
    const query = "UPDATE usermanages SET first_name='" + first_name + "',last_name='" + last_name + "',email='" + email + "',mobile_no='" + mobile_no + "',gender='" + gender + "',user_type='" + user_type + "' WHERE id='" + userId + "'";
    const result = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
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