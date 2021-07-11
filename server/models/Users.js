module.exports = (sequlize, DataTypes) => {

    const Users = sequlize.define("Users", {
        firstName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactNo:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        confirmPassword:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Users;
}