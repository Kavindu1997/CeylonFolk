module.exports = (sequelize, DataTypes) => {

    const Collections = sequelize.define("Collections", {

        collectionId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
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