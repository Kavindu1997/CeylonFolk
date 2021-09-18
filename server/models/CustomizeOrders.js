module.exports = (sequelize, DataTypes) => {

    const CustomizeOrders = sequelize.define("CustomizeOrders", {

        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        orderNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        customerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        customerName: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        customerEmail: {
            type: DataTypes.STRING,
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

        totalAmount: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        placedDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        paymentMethod: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        note: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        deleteFlag: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        notificationStatus: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        notification: {
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