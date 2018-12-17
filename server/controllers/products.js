const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const db = require('../store')();

const controller = (req, res, next) => {
  let form = new formidable.IncomingForm();
  let upload = path.join('./static', 'img', 'products');
  let fileName;

  form.uploadDir = path.join(process.cwd(), 'server', upload);

  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err);
    }

    if (files.photo.name === '' || files.photo.size === 0) {
      fs.unlinkSync(files.photo.path);
      return res.redirect('/admin?msgfile=Не загружена картинка!');
    }

    if (!fields.name) {
      fs.unlinkSync(files.photo.path);
      return res.redirect('/admin?msgfile=Не указано описание!');
    }

    const isNotNumber = parseInt(fields.price, 10) === NaN;
    if (!fields.price || isNotNumber) {
      fs.unlinkSync(files.photo.path);
      return res.redirect('/admin?msgfile=Не указана цена!');
    }

    fileName = path.join(form.uploadDir, files.photo.name);
    fs.rename(files.photo.path, fileName, function (err) {
      if (err) {
        fs.unlinkSync(fileName);
      }
      let dir = fileName.substr(fileName.indexOf('img'));
      console.log(fileName);
      console.log(dir);
      db.stores.products.store.push({
        'name': fields.name,
        'price': fields.price,
        'src': dir
      });
      db.save();
      res.redirect('/admin?msgfile=Картинка успешно загружена');
    })
  })
};

module.exports = controller;