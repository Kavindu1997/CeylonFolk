const DesignSearchModel = require('../controller/design.model');
 
// get employee by Name for earch by Name 
exports.getDesignByDesignName = (req, res)=>{
    //console.log('get emp by id');
    console.log('check');
    
    DesignSearchModel.getDesignByDesignName(req.params.search, (err, inventory)=>{
     
        if(err)
        res.send(err);
        console.log('single inventory data',inventory);
        res.send(inventory);
    })
}

exports.getDesignByCollectionName = (req, res)=>{
    //console.log('get emp by id');
    console.log('check');
    
    DesignSearchModel.getDesignByCollectionName(req.params.search, (err, inventory)=>{
     
        if(err)
        res.send(err);
        console.log('single inventory data',inventory);
        res.send(inventory);
    })
}

exports.getDesignByType = (req, res)=>{
    //console.log('get emp by id');
    console.log('check');
    
    DesignSearchModel.getDesignByType(req.params.search, (err, inventory)=>{
     
        if(err)
        res.send(err);
        console.log('single inventory data',inventory);
        res.send(inventory);
    })
}

exports.getDesignByPrice = (req, res)=>{
    //console.log('get emp by id');
    console.log('check');
    
    DesignSearchModel.getDesignByPrice(req.params.search, (err, inventory)=>{
     
        if(err)
        res.send(err);
        console.log('single inventory data',inventory);
        res.send(inventory);
    })
}