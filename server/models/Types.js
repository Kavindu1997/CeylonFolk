module.exports = (sequelize, DataTypes) => {

    const Types = sequelize.define("Types", {

        types: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        coverImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
       
    });

    return Types;
}