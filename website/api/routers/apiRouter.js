const express = require('express');
const router = express.Router();
const apiProductsRouter = require('./apiProductsRouter');
const apiUsersRouter = require('./apiUsersRouter');


router.use('/products', apiProductsRouter);
router.use('/users', apiUsersRouter);


module.exports = router;
