module.exports = (sequelize, DataTypes) => {

    const OrderItems = sequelize.define("OrderItems", {
        orderId: {
            type: DataTypes.INTEGER,
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
    });

    return OrderItems;
}