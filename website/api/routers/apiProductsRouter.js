const express = require('express');
const router = express.Router();
const apiProductsController = require('../controllers/apiProductsController');

router.get('/', apiProductsController.list);
router.get('/flattened', apiProductsController.flattenedList);
router.get('/subtaxonomies', apiProductsController.subTaxonomiesList);
router.get('/:id', apiProductsController.detail);

module.exports = router;
