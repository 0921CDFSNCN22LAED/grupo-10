const express = require('express');
const router = express.Router();
const apiUsersController = require('../controllers/apiUsersController');

router.get('/', apiUsersController.list);
router.get('/flattened', apiUsersController.flattenedList);
router.get('/:id', apiUsersController.detail);

module.exports = router;
