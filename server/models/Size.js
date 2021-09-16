module.exports = (sequelize, DataTypes) => {

    const Size = sequelize.define("Size", {

        size: {
            type: DataTypes.CHAR,
            allowNull: true,
        },
       
    });

    return Size;
}