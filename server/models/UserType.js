module.exports = (sequlize, DataTypes) => {

    const UserType = sequlize.define("UserType", {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return UserType;
}