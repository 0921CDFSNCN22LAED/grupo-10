const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Listado de productos
router.get('/');
// Formulario de creación de productos
router.get('/create', productsController.create);
// Acción de creación
router.post('/', productsController.store);
// Detalle de un producto
router.get('/:id');
// Formulario de edición de productos
router.get('/:id/edit');
// Acción de edición
router.put('/:id');
// Acción de borrado
router.delete('/:id');

module.exports = router;
