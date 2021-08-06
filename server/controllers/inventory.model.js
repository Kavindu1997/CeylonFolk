
var dbConn  = require('../config/db.config');
 
var InventorySearch = function(inventory){
    this.code     =   inventory.code;
    this.colour     =   inventory.colour;
    this.size        =   inventory.size;

    // this.phone          =   employee.phone;
    // this.salary         =   employee.salary;
    // this.emp_image         =    employee.image;
}
 
// get all employees
InventorySearch.getAllInventory = (result) =>{
    dbConn.query('SELECT * FROM inventories', (err, res)=>{
        if(err){
            console.log('Error while fetching employess', err);
            result(null,err);
        }else{
            console.log('Employees fetched successfully');
            result(null,res);
        }
    })
}
 
// get employee by Name for Search Data by name 
InventorySearch.getInventoryByName = (colour, result)=>{
    dbConn.query('SELECT * FROM inventories WHERE colour LIKE ?', colour+'%', (err, res)=>{
        if(err){
            console.log('Error while fetching employee by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}
module.exports = InventorySearch;

