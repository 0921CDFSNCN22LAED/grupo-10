const express = require('express');
const router = express.Router();
const apiProductsRouter = require('./apiProductsRouter');

router.use('/products', apiProductsRouter);

module.exports = router;
