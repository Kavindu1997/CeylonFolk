module.exports = (sequelize, DataTypes) => {

    const Contactus = sequelize.define("Contactus", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactNo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
      
    });

    return Contactus;
}