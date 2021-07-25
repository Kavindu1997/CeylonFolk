module.exports = (sequelize, DataTypes) => {

    const Items = sequelize.define("Items", {
        itemId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,        
        },
    });

    return Items;
}