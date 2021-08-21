module.exports = (sequelize, DataTypes) => {

    const Types = sequelize.define("Types", {

        types: {
            type: DataTypes.STRING,
            allowNull: true,
        },
       
    });

    return Types;
}