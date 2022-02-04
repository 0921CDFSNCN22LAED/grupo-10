const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/products.json');
const { Product, SubTaxonomy, Category } = require('../database/models');

const convertToPesos = (number) => {
  return new Intl.NumberFormat('es-Ar', {
    style: 'currency',
    currency: 'ARS',
  })
    .format(number)
    .slice(0, -3);
};

const convertToPercentage = (number) => {
  return number == 0 ? '' : parseFloat(number).toFixed(2) + '% off';
};

module.exports = {
  formatProduct: function (data) {
    const products = data.map((product) => {
      return (product = {
        ...product,
        price: convertToPesos(product.price),
        discount: convertToPercentage(product.discount),
        categoryData: product.category,
        category: product.category.name,
        taxonomy: [product.subTaxonomy.taxonomy.name, product.subTaxonomy.name],
        image: product.productsImages.location,
      });
    });
    return products;
  },
  getProducts: async function () {
    const data = await Product.findAll({
      raw: true,
      nest: true,
      include: [
        { association: 'category' },
        {
          model: SubTaxonomy,
          as: 'subTaxonomy',
          include: [
            {
              association: 'taxonomy',
            },
          ],
        },
        { association: 'productsImages' },
      ],
    });
    

    const products = this.formatProduct(data);
    return products;
  },
  getProductsRandom: async function (n) {
    const products = await this.getProducts();
    products.sort(() => Math.random() - Math.random());
    return products;
  },
  getProduct: async function (id) {
    const data = await Product.findByPk(id, {
      raw: true,
      nest: true,
      include: [
        { association: 'category' },
        {
          model: SubTaxonomy,
          as: 'subTaxonomy',
          include: [
            {
              association: 'taxonomy',
            },
          ],
        },
        { association: 'productsImages' },
      ],
    });
    const dataP = this.formatProduct([data]);
    const product = dataP[0];
    return product;
  },
  getProductRaw: async function (id) {
    const products = await this.getProducts();
    const product = products.find((prod) => {
      return prod.id == id;
    });
    const cleanRegEx = new RegExp(/[$\.%]/g);
    product.price = product.price
      ? Number(product.price.replace(cleanRegEx, ''))
      : '';
    product.discount = product.discount
      ? Number(product.discount.replace(cleanRegEx, ''))
      : '';
    return product;
  },
  getProductsCategories: async function () {
    const categories = await Category.findAll({ raw: true, nest: true });
    return categories;
  },
  getProductsByCategoryOrTaxonomy: async function () {
    const products = await this.getProducts();
    const artDestacadosProducts = await products.filter((prod) => {
      return prod.category == 'ArtDestacado';
    });
    const offerProducts = await products.filter((prod) => {
      return prod.category == 'Oferta';
    });
    const hardware = await products.filter((prod) => {
      return prod.taxonomy[0] == 'Hardware';
    });
    const peripherals = await products.filter((prod) => {
      return prod.taxonomy[0] == 'Peripherals';
    });

    return { artDestacadosProducts, offerProducts, hardware, peripherals };
  },
  saveProducts: function (products) {
    const texto = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, texto, 'utf-8');
  },
  storeProduct: function ({ body, file }) {
    console.log(body)
    SubTaxonomy.findOne({
      
    })
    const newProduct = {
      id: new Date().getTime(),
      ...body,
      taxonomy: [
        body.taxonomy,
        body.taxonomyHardware
          ? body.taxonomyHardware
          : body.taxonomyPeripherals,
      ],
      image: file && file.filename ? file.filename : 'defaultProduct.png',
    };
    let products = this.getProducts();
    //products.push(newProduct);
    //this.saveProducts(products);
  },
  updateProduct: function (id, body) {
    let product = this.getProduct(id);
    editProduct = {
      id: parseInt(id),
      ...body,
      taxonomy: [
        body.taxonomy,
        body.taxonomyHardware
          ? body.taxonomyHardware
          : body.taxonomyPeripherals,
      ],
      image: product.image,
    };
    editProduct.discount = editProduct.discount
      ? editProduct.discount + '%'
      : '';
    editProduct.price = editProduct.price
      ? convertToPesos(editProduct.price)
      : '';
    let products = this.getProducts();
    products = products.filter((product) => {
      return product.id != id;
    });
    products.push(editProduct);
    this.saveProducts(products);
  },
  deleteProduct: function (id) {
    Product.destroy({
      where: {
        id: id,
      },
    });
  },
};
