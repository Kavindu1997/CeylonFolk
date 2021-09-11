module.exports = (sequelize, DataTypes) => {

    const Colors = sequelize.define("Colors", {

        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        color_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
       
    });

    return Colors;
}