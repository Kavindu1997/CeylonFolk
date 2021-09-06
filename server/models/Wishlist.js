module.exports = (sequelize, DataTypes) => {

    const Wishlist = sequelize.define("Wishlist", {
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,        
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    return Wishlist;
}