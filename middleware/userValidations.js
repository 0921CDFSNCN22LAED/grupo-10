const path = require('path');
const { check } = require('express-validator');

module.exports = [
  check('name', 'Ingresá tu nombre y apellido').notEmpty(),
  check('email')
    .notEmpty()
    .withMessage('Ingresá tu correo electrónico')
    .bail()
    .isEmail()
    .withMessage('Ingresá un correo electrónico valido'),
  check('password')
    .notEmpty()
    .withMessage('Tenés que ingresar una contraseña')
    .bail()
    .isLength({ min: 4 })
    .withMessage('La contraseña debe ser mayor o igual a 4 caracteres'),
  check('repassword', 'Las contraseñas deben coincidir')
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
