module.exports = (sequelize, DataTypes) => {

    const Orders = sequelize.define("Orders", {
        orderId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fullAmount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PaymentMethod: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
     /*   deliveryAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        placedDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },*/
    });

    return Orders;
}