module.exports = (sequelize, DataTypes) => {

    const Coupon= sequelize.define("Coupon", {
        coupon_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coupon_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
     });

    return Coupon;
 }

