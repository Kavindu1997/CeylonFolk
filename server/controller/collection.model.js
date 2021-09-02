
var dbConn  = require('../config/db.config');
 
var CollectionSearch = function(collections){
  
    this.collection_name     =   collections.collection_name;
    // this.size        =   inventory.size;
    // this.quantity       =   inventory.quantity;

    // this.phone          =   employee.phone;
    // this.salary         =   employee.salary;
    // this.emp_image         =    employee.image;
}

 
// // get all employees
// InventorySearch.getAllInventory = (result) =>{
    


//     dbConn.query('SELECT inventories.id, inventories.quantity, inventories.margin, colors.color, sizes.size, types.types FROM `inventories` INNER JOIN `colors` on inventories.colour_id=colors.id INNER JOIN `sizes` on inventories.size_id=sizes.id INNER JOIN `types` on inventories.type_id=types.id ', (err, res)=>{
//         if(err){
//             console.log('Error while fetching employess', err);
//             result(null,err);
//         }else{
//             console.log('Employees fetched successfully');
//             result(null,res);
//         }
//     })
// }

 
// get employee by Name for Search Data by name 
CollectionSearch.getCollectionByName = (search, result)=>{
    console.log("hiijp");
    // console.log(search);
  
    dbConn.query('SELECT collections.collection_name, collections.coverImage FROM `collections` WHERE collections.collection_name LIKE ?', search+'%' , (err, res)=>{
        if(err){
            console.log('Error while fetching employee by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })

}


module.exports = CollectionSearch;

