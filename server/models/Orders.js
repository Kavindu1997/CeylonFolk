module.exports = (sequelize, DataTypes) => {

    const Orders = sequelize.define("Orders", {
        orderId: {
            type: DataTypes.STRING,
            allowNull: false,
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
        deliveryAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deliveryValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        couponValue: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        contactNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        placedDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        specialNotes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        notifications: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
          },
    });

    return Orders;
}