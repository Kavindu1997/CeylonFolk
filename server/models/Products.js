module.exports=(sequelize, DataTypes)=>{


const Products =sequelize.define("Products", {


title:{

type: DataTypes.STRING,
allowNull:false,

},

name:{

    type: DataTypes.STRING,
    allowNull:false,
    
    }


})

return Products


}