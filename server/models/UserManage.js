module.exports = (sequlize, DataTypes) => {

    const UserManage = sequlize.define("UserManage", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobile_no: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender:{
            type:DataTypes.ENUM('Male','Female','Other'),
            allowNull:false,
        },
        user_type:{
            type:DataTypes.ENUM('Admin','Manager','Assistant','Customer'),
            allowNull:false,
        }
    });

    return UserManage;
}