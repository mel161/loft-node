const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/upload/');
  },
  filename: (req, file, cb) => {
    const type = file.mimetype.split('/');
    cb(null, new Date().getTime() + '.' + type[1]);
  }
});

const limits = {
  fileSize: 1024 * 1024 * 5
};

const fileFilter = (req, file, cb) => {
  cb(null, file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png');
};

module.exports = multer({
  storage,
  limits,
  fileFilter
});
