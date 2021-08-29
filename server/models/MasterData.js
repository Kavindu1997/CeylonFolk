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
    });

    return MasterData;
}