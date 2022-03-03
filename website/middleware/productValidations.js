const path = require('path');
const { body } = require('express-validator');

module.exports = [
  body('name')
    .notEmpty()
    .withMessage('Tenés que ingresar el nombre del producto.')
    .bail()
    .isLength({ min: 5 })
    .withMessage('El nombre debe tener como mínimo 5 caracteres.'),
  body('price')
    .notEmpty()
    .withMessage('Ingresá el precio del producto.')
    .bail()
    .isNumeric()
    .withMessage('El precio debe ser un número')
    .bail()
    .isInt({ min: 1 })
    .withMessage('El precio debe ser mayor a 0'),
  body('discount')
    .notEmpty()
    .withMessage('Ingresá el descuento.')
    .bail()
    .isNumeric()
    .withMessage('El precio debe ser un número.'),
  body('description')
    .notEmpty()
    .withMessage('La descripción no puede quedar vacía.')
    .bail()
    .isLength({ min: 20 })
    .withMessage('La descripción debe tener como mínimo 20 caracteres.'),
  body('category').notEmpty().withMessage('Tenés que ingresar una categoría.'),
  body('taxonomy').notEmpty().withMessage('Tenés que ingresar una taxonomía.'),
  body('subTaxonomy')
    .notEmpty()
    .withMessage('Tenés que ingresar una subtaxonomía.'),
  body('image').custom((value, { req }) => {
    if (!req.file) return true;
    let image = req.file;
    let acceptedExtensions = ['.jpg', '.png', '.gif'];
    let fileExtension = path.extname(image.originalname);
    if (!acceptedExtensions.includes(fileExtension)) {
      throw new Error(
        `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
          ', '
        )}`
      );
    } else {
      return true;
    }
  }),
];
