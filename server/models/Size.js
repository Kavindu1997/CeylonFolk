module.exports = (sequelize, DataTypes) => {

    const Size = sequelize.define("Size", {

        size: {
            type: DataTypes.STRING,
            allowNull: true,
        },
       
    });

    return Size;
}