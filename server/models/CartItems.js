module.exports = (sequelize, DataTypes) => {

    const CartItems = sequelize.define("CartItems", {
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        itemID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isBought: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
    });

    return CartItems;
}