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

    // InventorySearchModel.getAllColors((err, Colors) =>{
    //     console.log('We are here');
    //     if(err)
    //     res.send(err);
    //     console.log('Inventories', Colors);
    //     res.send(Colors)
    // })
}
 
// get employee by Name for earch by Name 
exports.getInventoryByType = (req, res)=>{
    //console.log('get emp by id');
    console.log('check');
    
    InventorySearchModel.getInventoryByType(req.params.types, (err, inventory)=>{
     
        if(err)
        res.send(err);
        console.log('single inventory data',inventory);
        res.send(inventory);
    })
}

exports.getInventoryBySize = (req, res)=>{
    //console.log('get emp by id');
    console.log('check');
    
    InventorySearchModel.getInventoryBySize(req.params.size, (err, inventory)=>{
     
        if(err)
        res.send(err);
        console.log('single inventory data',inventory);
        res.send(inventory);
    })
}

exports.getInventoryByQuantity = (req, res)=>{
    //console.log('get emp by id');
    console.log('check');
    
    InventorySearchModel.getInventoryByQuantity(req.params.quantity, (err, inventory)=>{
     
        if(err)
        res.send(err);
        console.log('single inventory data',inventory);
        res.send(inventory);
    })
}

exports.getInventoryByMargin = (req, res)=>{
    //console.log('get emp by id');
    console.log('check');
    
    InventorySearchModel.getInventoryByMargin(req.params.margin, (err, inventory)=>{
     
        if(err)
        res.send(err);
        console.log('single inventory data',inventory);
        res.send(inventory);
    })
}