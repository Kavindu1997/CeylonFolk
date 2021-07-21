module.exports = (sequelize, DataTypes) => {

    const Wishlist = sequelize.define("Wishlist", {
        image: {
            type: DataTypes.STRING,
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
    });

    return Wishlist;
}