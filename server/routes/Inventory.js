const express = require("express");
const router = express.Router();
const { Inventory, sequelize } = require('../models/');

router.get("/inventory", async (req, res) => {

    const query1 = "SELECT inventories.id, inventories.quantity, inventories.margin, colors.color,colors.color_name ,sizes.size, types.types FROM `inventories` INNER JOIN `colors` on inventories.colour_id=colors.id INNER JOIN `sizes` on inventories.size_id=sizes.id INNER JOIN `types` on inventories.type_id=types.id ";
    const listOfItems = await sequelize.query(query1, { type: sequelize.QueryTypes.SELECT });

    res.json(listOfItems);
});

router.get("/inventoryItem/:inventory_id", async (req, res) => {

    const inventory_id = req.params.inventory_id

    const query1 = "SELECT inventories.id, inventories.quantity, inventories.margin, colors.color, sizes.size, types.types FROM `inventories` INNER JOIN `colors` on inventories.colour_id=colors.id INNER JOIN `sizes` on inventories.size_id=sizes.id INNER JOIN `types` on inventories.type_id=types.id WHERE inventories.id='" + inventory_id + "'";
    const listOfItem = await sequelize.query(query1, { type: sequelize.QueryTypes.SELECT });

    res.json(listOfItem);
});

router.get("/inventoryEdit/:inventory_id", async (req, res) => {

    const inventory_id = req.params.inventory_id

    const query1 = "SELECT inventories.id, inventories.quantity, inventories.margin, colors.color, sizes.size, types.types FROM `inventories` INNER JOIN `colors` on inventories.colour_id=colors.id INNER JOIN `sizes` on inventories.size_id=sizes.id INNER JOIN `types` on inventories.type_id=types.id WHERE inventories.id='" + inventory_id + "'";
    const listOfItems = await sequelize.query(query1, { type: sequelize.QueryTypes.SELECT });

    res.json(listOfItems);
});


router.get("/sizes", async (req, res) => {


    const query = "SELECT size from sizes";
    const listOfSizes = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(listOfSizes);
});

router.get("/types", async (req, res) => {


    const query = "SELECT types from types";
    const listOfTypes = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    res.json(listOfTypes);
});

router.post("/inventory", async (req, res) => {

    try {

        console.log(req.body);
        const colour = req.body.color;
        const size = req.body.size;
        const type = req.body.type;
        const quantity = req.body.quantity;
        const margin = req.body.margin;

        const colour_id_query = "SELECT id FROM colors WHERE colors.color='" + colour + "' ";
        const colour_id = await sequelize.query(colour_id_query, { type: sequelize.QueryTypes.SELECT });
        const id1 = colour_id[0].id;

        const size_id_query = "SELECT sizes.id FROM sizes WHERE sizes.size='" + size + "' ";
        const size_id = await sequelize.query(size_id_query, { type: sequelize.QueryTypes.SELECT });
        const id2 = size_id[0].id;

        const type_id_query = "SELECT types.id FROM types WHERE types.types='" + type + "' ";
        const type_id = await sequelize.query(type_id_query, { type: sequelize.QueryTypes.SELECT });
        const id3 = type_id[0].id;

        const count_query = "SELECT count(id) as co from `inventories` WHERE colour_id='" + id1 + "' AND size_id='" + id2 + "' AND type_id='" + id3 + "'";
        const count1 = await sequelize.query(count_query, { type: sequelize.QueryTypes.SELECT });
        const cnt = count1[0].co;

        if (quantity > 0 && margin > 0) {
            if (cnt == 0) {

                if (quantity > margin) {

                    const query = "INSERT INTO inventories (colour_id,size_id,type_id,quantity,margin) VALUES ('" + id1 + "','" + id2 + "','" + id3 + "','" + quantity + "','" + margin + "')";
                    const addInvent = await sequelize.query(query, { type: sequelize.QueryTypes.INSERT });
                    res.json({ data: 1 });

                }
                else {
                    res.json({ data: 2 });
                }

            }
            else{
                res.json({ data: 3 });
            }
        }
        else {
            res.json({ data: 0 });
        }


    }
    catch (e) {
        res.json({ data: 0 });
    }

});


router.put("/inventory/:inventory_id", async (req, res) => {

    try {

        const inventory_id = req.params.inventory_id

        const quantity = req.body.quantity;
        const margin = req.body.margin;

        const margin_quantity_query = "SELECT margin,quantity FROM inventories WHERE inventories.id='" + inventory_id + "' ";
        const margin_quantity = await sequelize.query(margin_quantity_query, { type: sequelize.QueryTypes.SELECT });

        if (quantity == '' && margin != '') {
            if (margin > 0) {
                if (margin_quantity[0].quantity >= margin) {


                    const query = "UPDATE inventories SET margin='" + margin + "' WHERE inventories.id='" + inventory_id + "'";
                    const updateInvent = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
                    res.json({ data: 1 });
                }
            }


        }
        else if (quantity != '' && margin == '') {

            if (quantity > 0) {
                if (quantity >= margin_quantity[0].margin) {

                    const query = "UPDATE inventories SET quantity='" + quantity + "'WHERE inventories.id='" + inventory_id + "'";
                    const updateInvent = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
                    res.json({ data: 1 });
                }

            }
        }
        else if (quantity != '' && margin != '') {
            if (quantity > 0 && margin > 0) {
                if (quantity >= margin) {
                    const query = "UPDATE inventories SET quantity='" + quantity + "' ,margin='" + margin + "' WHERE inventories.id='" + inventory_id + "'";
                    const updateInvent = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
                    res.json({ data: 1 });

                }
            }

        }


    }
    catch (e) {
        res.json({ data: 0 });
    }


});

router.delete("/inventory", async (req, res) => {

    try {

        console.log(req.body);
        const id = req.body.id;

        const count = "SELECT count(inventories.id) as cnt FROM `inventories` INNER JOIN `designs` on inventories.colour_id=designs.color_id and inventories.type_id=designs.type_id where inventories.id='" + id + "' ";
        const countDesigns = await sequelize.query(count, { type: sequelize.QueryTypes.SELECT });
        console.log(countDesigns[0].cnt);

        if (countDesigns[0].cnt == 0) {

            const query = "DELETE FROM inventories WHERE inventories.id='" + id + "' ";

            const inventoryItemRemove = await sequelize.query(query, { type: sequelize.QueryTypes.DELETE });
            res.json({ data: 1 });

        }
        else {

            const query = "UPDATE inventories SET quantity='0' WHERE inventories.id='" + id + "'";
            const updateInvent = await sequelize.query(query, { type: sequelize.QueryTypes.UPDATE });
            res.json({ data: 2 });


        }


    }
    catch (e) {
        res.json({ data: 0 });
    }

});


module.exports = router;