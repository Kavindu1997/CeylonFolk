module.exports = (sequelize, DataTypes) => {

    const Offers = sequelize.define("Offers", {
        collection_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        from: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        to: {
            type: DataTypes.DATE,
            allowNull: false,
        },
       
      
    });

    return Offers;
}