const express = require("express");
const router = express.Router();
const { Coupon } = require('../models/');

router.get('/',async(req,res)=>{
  try {
      const couponList=await Coupon.findAll();
      res.json(couponList);
  } catch (error) {
      res.status(404).json({message:error.message});
  }
});

router.post("/",async(req, res) => {
    const { couponId,couponTitle} = req.body;
    //  const coupon= req.body;
    await  Coupon.create({
        coupon_id:couponId,
        coupon_title:couponTitle
    });
     try {
    res.json("Success");
  } catch (error) {
     res.json(error.message); 
  }
    
});

router.delete("/:couponId",async (req,res)=>{
    const couponId=req.params.couponId;

    await  Coupon.destroy({
        where:{
            coupon_id:couponId,
        },
    });
    res.json("DELETED SUCCESSFULLY");
})

module.exports = router;
