module.exports = (sequelize, DataTypes) => {

    const Deposit = sequelize.define("Deposit", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orderId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        uploadedDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        isValidated: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isProcessed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Deposit;
}