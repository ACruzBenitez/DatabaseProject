let express = require('express');
let router = express.Router();

let moongose = require('mongoose');

let inventoryController = require("../controllers/inventory")

router.get('/list', inventoryController.list);

router.get('/add', inventoryController.displayAddPage);

router.post('/add', inventoryController.processAddPage);

router.get('/edit/:id', inventoryController.displayEditPage);
router.post('/edit/:id', inventoryController.processEditPage);

router.get('/delete/:id', inventoryController.performDelete);

module.exports = router;