module.exports = (sequelize, DataTypes) => {

    const Collections = sequelize.define("Collections", {
        collection_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        collection_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Collections;
}