module.exports = (sequelize, DataTypes) => {

    const MasterData = sequelize.define("MasterData", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        decription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        districtCategory: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        deliveryCharge: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return MasterData;
}