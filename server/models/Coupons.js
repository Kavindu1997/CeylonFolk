module.exports = (sequelize, DataTypes) => {

    const Coupon= sequelize.define("Coupon", {
        coupon_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        discount_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
     });

    return Coupon;
 }

