const InventorySearchModel = require('../controller/inventory.model');
 
// get all employee list
exports.getInventorySearchList = (req, res)=> {
    //console.log('here all employees list');
    InventorySearchModel.getAllInventory((err, Inventory) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Inventories', Inventory);
        res.send(Inventory)
    })
}
 
// get employee by Name for earch by Name 
exports.getInventoryByName = (req, res)=>{
    //console.log('get emp by id');
    InventorySearchModel.getInventoryByName(req.params.colour, (err, inventory)=>{
        if(err)
        res.send(err);
        console.log('single employee data',inventory);
        res.send(inventory);
    })
}