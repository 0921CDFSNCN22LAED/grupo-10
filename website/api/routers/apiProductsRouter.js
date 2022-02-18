const express = require('express');
const router = express.Router();
const apiProductsController = require('../controllers/apiProductsController');

router.get('/', apiProductsController.list);
router.get('/flattened', apiProductsController.flattenedList);
router.get('/subtaxonomies', apiProductsController.subTaxonomiesList)

module.exports = router;
