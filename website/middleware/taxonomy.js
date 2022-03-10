const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports = (req, res, next) => {
  const taxonomy = {
    hardware: [],
    peripherals: [],
  };
  for (let prod of products) {
    if (
      prod.taxonomy[0] == 'Hardware' &&
      !taxonomy.hardware.includes(prod.taxonomy[1])
    ) {
      taxonomy.hardware.push(prod.taxonomy[1]);
    }
    if (
      prod.taxonomy[0] == 'Periféricos' &&
      !taxonomy.peripherals.includes(prod.taxonomy[1])
    ) {
      taxonomy.peripherals.push(prod.taxonomy[1]);
    }
  }
  res.locals.taxonomy = taxonomy;

  next();
};
