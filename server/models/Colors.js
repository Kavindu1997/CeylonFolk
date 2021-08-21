module.exports = (sequelize, DataTypes) => {

    const Colors = sequelize.define("Colors", {

        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
       
    });

    return Colors;
}