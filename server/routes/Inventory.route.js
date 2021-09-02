const express = require('express');
const router = express.Router();
const { Inventory, sequelize } = require('../models/');
 
const inventoryController = require('../controller/inventory.controller');
 
// get all employees
router.get('/', inventoryController.getInventorySearchList);
 
// get Detail by name 
router.get('/searchRecordType/:types',inventoryController.getInventoryByType);
router.get('/searchRecordSize/:size',inventoryController.getInventoryBySize);
router.get('/searchRecordQuantity/:quantity',inventoryController.getInventoryByQuantity);
router.get('/searchRecordMargin/:margin',inventoryController.getInventoryByMargin);

// router.get("/searchRecordType/:types", async (req, res) => {
//     const types = req.params.types;
//     console.log(types);
//     const query = "SELECT inventories.id, inventories.quantity, inventories.margin, colors.color, sizes.size, types.types FROM `inventories` INNER JOIN `colors` on inventories.colour_id=colors.id INNER JOIN `sizes` on inventories.size_id=sizes.id INNER JOIN `types` on inventories.type_id=types.id  WHERE types.types LIKE '" + types + "'";
//     const totalDetails = await sequelize.query(query,
//         {
//             type: sequelize.QueryTypes.SELECT
//         });
//     console.log(totalDetails);
//     res.json(totalDetails);

// });
 
module.exports = router;