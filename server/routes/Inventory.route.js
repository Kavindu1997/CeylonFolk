const express = require('express');
const router = express.Router();
 
const inventoryController = require('../controllers/inventory.controller');
 
// get all employees
router.get('/', inventoryController.getInventorySearchList);
 
// get Detail by name 
router.get('/searchRecord/:colour',inventoryController.getInventoryByName);
 
module.exports = router;