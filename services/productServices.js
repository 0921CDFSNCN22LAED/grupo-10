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
    const formableData = !Array.isArray(data) ? Array.of(data) : data;
    let products = formableData.map((product) => {
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
    if (!Array.isArray(data)) {
      products = products[0];
    }
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
    const product = this.formatProduct(data);
    return product;
  },
  getProductRaw: async function (id) {
    const product = await this.getProduct(id);
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
  getProductsSubTaxonomies: async function () {
    const subTaxonomies = await SubTaxonomy.findAll({ raw: true, nest: true });
    const hardware = subTaxonomies.filter(
      (subTaxonomy) => subTaxonomy.taxonomy_id == 1
    );
    const peripherals = subTaxonomies.filter(
      (subTaxonomy) => subTaxonomy.taxonomy_id == 2
    );
    return { hardware, peripherals };
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
  storeProduct: async function ({ body, file }) {
    console.log(body);
    const newProduct = {
      ...body,
      category_id: body.category,
      subTaxonomy_id: body.subTaxonomy[0] ?? body.subTaxonomy[1],
    };
    const createdProduct = await Product.create(newProduct);
    return createdProduct;
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
