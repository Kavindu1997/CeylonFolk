module.exports = (sequelize, DataTypes) => {

    const CustomizeOrders = sequelize.define("CustomizeOrders", {

        orderId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },

        customerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        image: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return CustomizeOrders;
}