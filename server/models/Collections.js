module.exports = (sequelize, DataTypes) => {

    const Collections = sequelize.define("Collections", {
        collection_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        coverImage: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    });

    return Collections;
}