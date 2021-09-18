module.exports = (sequelize, DataTypes) => {

    const OrderItems = sequelize.define("OrderItems", {
        orderId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        itemId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        purchasedUnitPrice: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return OrderItems;
}