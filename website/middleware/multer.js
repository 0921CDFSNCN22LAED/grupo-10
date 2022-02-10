const multer = require('multer');
const path = require('path');

let multerDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (file.fieldname) {
      case 'image':
        cb(null, 'public/img/products-img');
        break;
      case 'profileImage':
        cb(null, 'public/img/profiles-img');
    }
  },
  filename: (req, file, cb) => {
    let imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});

let fileUpload = multer({ storage: multerDiskStorage });

module.exports = fileUpload;
