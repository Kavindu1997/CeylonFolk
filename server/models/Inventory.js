module.exports = (sequelize, DataTypes) => {

    const Inventory = sequelize.define("Inventory", {
        // inventoryId: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     allowNull: false,
        //     primaryKey: true,
        // },
       
        colour_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        size_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
       
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        margin: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
      
    });

    return Inventory;
}