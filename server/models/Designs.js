module.exports = (sequelize, DataTypes) => {

    const Designs = sequelize.define("Designs", {

        collection_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        design_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        color_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        type_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        coverImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    return Designs;
}