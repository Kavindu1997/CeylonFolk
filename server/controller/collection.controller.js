const CollectionSearchModel = require('../controller/collection.model');
 

 
// get employee by Name for earch by Name 
exports.getCollectionByName = (req, res)=>{
    //console.log('get emp by id');
    console.log('check');
    
    CollectionSearchModel.getCollectionByName(req.params.search, (err, collections)=>{
     
        if(err)
        res.send(err);
        console.log('single inventory data',collections);
        res.send(collections);
    })
}

