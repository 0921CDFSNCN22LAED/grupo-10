const path = require('path');
const { check } = require('express-validator');
const mainServices = require('../services/mainServices');

module.exports = [
  check('name', 'Ingresá tu nombre y apellido.')
    .notEmpty()
    .bail()
    .isLength({ min: 2 })
    .withMessage(
      'El campo de nombre y apellido debe tener como mínimo 2 caracteres.'
    ),
  check('email', 'Ingresá tu email.')
    .notEmpty()
    .bail()
    .isEmail()
    .withMessage('Ingresá un email válido.')
    .custom(async (value) => {
      const user = await mainServices.getUserbyEmail(value);
      if (user) {
        throw new Error('Ya hay una cuenta asociada al email que ingresaste.');
      } else {
        return true;
      }
    }),
  check('password')
    .notEmpty()
    .withMessage('Tenés que ingresar una contraseña.')
    .bail()
    .isLength({ min: 8 })
    .withMessage('La contraseña debe ser mayor o igual a 8 caracteres.'),
  check('repassword', 'Las contraseñas deben coincidir.')
    .exists()
    .custom((value, { req }) => value === req.body.password),
  check('profileImage').custom((value, { req }) => {
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
