module.exports = (sequelize, DataTypes) => {

    const Designs = sequelize.define("Designs", {
        designId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        designName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        designImage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        collectionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignkey : ''
        },
    });

    return Designs;
}