
var dbConn  = require('../config/db.config');
 
var DesignSearch = function(inventory){
  
    this.colour     =   inventory.colour;
    this.size        =   inventory.size;
    this.quantity       =   inventory.quantity;

    // this.phone          =   employee.phone;
    // this.salary         =   employee.salary;
    // this.emp_image         =    employee.image;
}

 
 
// get employee by Name for Search Data by name 
DesignSearch.getDesignByDesignName = (search, result)=>{
    console.log("hiijp");
    // console.log(search);
  
    dbConn.query('SELECT designs.design_name, designs.coverImage, designs.price, types.types, colors.color, collections.collection_name from `designs` INNER JOIN `types` ON designs.type_id= types.id INNER JOIN `colors` ON designs.color_id= colors.id INNER JOIN `collections` on designs.collection_id=collections.id  WHERE designs.design_name LIKE ?', search+'%' , (err, res)=>{
        if(err){
            console.log('Error while fetching employee by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })

}

DesignSearch.getDesignByCollectionName = (search, result)=>{
    console.log("hiijp");
    // console.log(search);
  
    dbConn.query('SELECT designs.design_name, designs.coverImage, designs.price, types.types, colors.color, collections.collection_name from `designs` INNER JOIN `types` ON designs.type_id= types.id INNER JOIN `colors` ON designs.color_id= colors.id INNER JOIN `collections` on designs.collection_id=collections.id  WHERE collections.collection_name LIKE ?', search+'%' , (err, res)=>{
        if(err){
            console.log('Error while fetching employee by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })

}

DesignSearch.getDesignByType = (search, result)=>{
    console.log("hiijp");
    // console.log(search);
  
    dbConn.query('SELECT designs.design_name, designs.coverImage, designs.price, types.types, colors.color, collections.collection_name from `designs` INNER JOIN `types` ON designs.type_id= types.id INNER JOIN `colors` ON designs.color_id= colors.id INNER JOIN `collections` on designs.collection_id=collections.id  WHERE types.types LIKE ?', search+'%' , (err, res)=>{
        if(err){
            console.log('Error while fetching employee by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })

}

DesignSearch.getDesignByPrice = (search, result)=>{
    console.log("hiijp");
    // console.log(search);
  
    dbConn.query('SELECT designs.design_name, designs.coverImage, designs.price, types.types, colors.color, collections.collection_name from `designs` INNER JOIN `types` ON designs.type_id= types.id INNER JOIN `colors` ON designs.color_id= colors.id INNER JOIN `collections` on designs.collection_id=collections.id  WHERE designs.price LIKE ?', search+'%' , (err, res)=>{
        if(err){
            console.log('Error while fetching employee by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })

}




module.exports = DesignSearch;

