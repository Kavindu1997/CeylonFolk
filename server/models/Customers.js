module.exports = (sequelize, DataTypes) => {

    const Customers = sequelize.define("Customers", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
        addLine1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addLine2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
      
    });

    return Customers;
}