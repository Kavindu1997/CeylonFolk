module.exports = (sequelize, DataTypes) => {

    const CustomizeOrders = sequelize.define("CustomizeOrders", {

        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
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

        price: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        paymentMethod: {
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