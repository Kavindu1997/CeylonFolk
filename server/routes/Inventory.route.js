const express = require('express');
const router = express.Router();
 
const inventoryController = require('../controller/inventory.controller');
 
// get all employees
router.get('/', inventoryController.getInventorySearchList);
 
// get Detail by name 
router.get('/searchRecord/:search',inventoryController.getInventoryByName);
 
module.exports = router;