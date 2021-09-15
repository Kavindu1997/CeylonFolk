const express = require("express");
const router = express.Router();
const { Coupon,sequelize } = require('../models/');

router.get('/',async(req,res)=>{
  try {
      const couponList=await Coupon.findAll({
        attributes:{exclude:["createdAt","updatedAt"]}
    });
      res.json(couponList);
  } catch (error) {
      res.status(404).json({message:error.message});
  }
});

router.post("/",async(req, res) => {
    const { coupon_name,discount_amount,start_date,end_date} = req.body;
    //  const coupon= req.body;
    await  Coupon.create({
        coupon_name:coupon_name,
        discount_amount:discount_amount,
        start_date:start_date,
        end_date:end_date
    });
     try {
    res.json("Success");
  } catch (error) {
     res.json(error.message); 
  }
    
});

router.put("/:couponId", async (req,res) => {
    const couponId = req.params.couponId
    const { coupon_name,discount_amount,start_date,end_date } = req.body;
    const query = "UPDATE coupons SET coupon_name='" + coupon_name + "',discount_amount='" + discount_amount + "',start_date='" + start_date + "',end_date='" + end_date + "' WHERE id='" + couponId + "'";
    const result = await sequelize.query(query, {type: sequelize.QueryTypes.UPDATE});
    res.json(result);
});

router.delete("/:couponId",async (req,res)=>{
    const couponId=req.params.couponId;

    await  Coupon.destroy({
        where:{
            id:couponId,
        },
    });
    res.json("DELETED SUCCESSFULLY");
})

module.exports = router;
