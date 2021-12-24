const path = require('path');
const { body } = require('express-validator');

module.exports = [
  body('name')
    .notEmpty()
    .withMessage('Tenés que ingresar el nombre del producto'),
  body('price').notEmpty().withMessage('Ingresá el precio del producto'),
  // .bail()
  // .isNumeric()
  // .withMessage('El precio debe ser un número'),
  //buscar validación por porcentaje
  body('discount')
    .notEmpty()
    .withMessage('Ingresá el descuento')
    .bail()
    .isNumeric()
    .withMessage('El precio debe ser un número'),
  body('category').notEmpty().withMessage('Tenés que ingresar una categoría'),
  //   body('image').custom((value, { req }) => {
  //     let image = req.files.image;
  //     let acceptedExtensions = ['jpg', 'png', 'gif'];

  //     if (!image) {
  //       throw new Error('Subí una imagen');
  //     } else {
  //       let fileExtension = path.extname(image[0].originalname);
  //       if (!acceptedExtensions.includes(fileExtension)) {
  //         throw new Error(
  //           `Las extensiones de archivo permitidas son ${acceptedExtensions.join(
  //             ', '
  //           )}`
  //         );
  //       }
  //     }
  //   }),
];
