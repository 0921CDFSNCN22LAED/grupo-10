const path = require('path');
const { body } = require('express-validator');
const mainServices = require('../services/mainServices');

module.exports = [
  body('name', 'Ingresá tu nombre y apellido.')
    .notEmpty()
    .bail()
    .isLength({ min: 2 })
    .withMessage(
      'El campo de nombre y apellido debe tener como mínimo 2 caracteres.'
    ),
  body('email', 'Ingresá tu email.')
    .notEmpty()
    .bail()
    .isEmail()
    .withMessage('Ingresá un email válido.')
    .custom(async (value) => {
      const user = await mainServices.getUserByEmail(value);
      if (user) {
        throw new Error('Ya hay una cuenta asociada al email que ingresaste.');
      } else {
        return true;
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Tenés que ingresar una contraseña.')
    .bail()
    .isLength({ min: 8 })
    .withMessage('La contraseña debe ser mayor o igual a 8 caracteres.')
    .isStrongPassword()
    .withMessage(
      'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un símbolo.'
    ),
  body('repassword', 'Las contraseñas deben coincidir.')
    .exists()
    .custom((value, { req }) => value === req.body.password),
  body('profileImage').custom((value, { req }) => {
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
