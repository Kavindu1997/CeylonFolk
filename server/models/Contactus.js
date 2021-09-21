module.exports = (sequelize, DataTypes) => {

    const Contactus = sequelize.define("Contactus", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderId: {
            type: DataTypes.INTEGER,
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
        enquiryType:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        notifiFlag:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        response:{
            type: DataTypes.STRING,
            allowNull: false,
        }
      
    });

    return Contactus;
}