module.exports = (sequelize, DataTypes) => {

    const Coupons = sequelize.define("Coupons", {
        coupon_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coupon_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
     });

    return Coupons;
}