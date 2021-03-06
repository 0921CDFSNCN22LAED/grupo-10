const fs = require('fs');
const path = require('path');
const dictionaryFilePath = path.join(__dirname, '../data/dictionary.json');
const {
  Product,
  SubTaxonomy,
  Taxonomy,
  Category,
  ProductsImage,
  Sale,
  ProductSale,
} = require('../database/models');
const db = require('../database/models');
const Op = db.Sequelize.Op;

const convertToPesos = (number) => {
  return new Intl.NumberFormat('es-Ar', {
    style: 'currency',
    currency: 'ARS',
  })
    .format(number)
    .slice(0, -3);
};

module.exports = {
  convertToPesos: (number) => {
    return new Intl.NumberFormat('es-Ar', {
      style: 'currency',
      currency: 'ARS',
    })
      .format(number)
      .slice(0, -3);
  },
  convertToPercentage: (number) => {
    return number == 0 ? '' : parseFloat(number).toFixed(2) + '% off';
  },
  formatProduct: function (data) {
    const formableData = !Array.isArray(data) ? Array.of(data) : data;
    let products = formableData.map((product) => {
      return (product = {
        ...product,
        price: this.convertToPesos(product.price),
        discount: this.convertToPercentage(product.discount),
        categoryData: product.category,
        category: product.category.name,
        taxonomy: [product.subTaxonomy.taxonomy.name, product.subTaxonomy.name],
        image: product.productsImages?.location,
      });
    });
    if (!Array.isArray(data)) {
      products = products[0];
    }
    return products;
  },
  getProducts: async function (limit, offset) {
    const data = await Product.findAll({
      limit: limit,
      offset: offset,
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
    const cleanRegEx = new RegExp(/[$\.% off]/g);
    product.price = product.price
      ? Number(product.price.replace(cleanRegEx, ''))
      : '';
    product.discount = product.discount
      ? Number(product.discount.replace(cleanRegEx, '')) / 100
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
      return prod.category == 'Art??culo destacado';
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
  storeProduct: async function ({ body, file }) {
    const newProduct = {
      ...body,
      category_id: body.category,
      subTaxonomy_id: body.subTaxonomy[0] ?? body.subTaxonomy[1],
    };

    const createdProduct = await Product.create(newProduct, {
      raw: true,
      nest: true,
    });
    const newImage = {
      location: file ? file.filename : 'productDefault.png',
      cover: 1,
    };
    const productImage = await ProductsImage.create(newImage);
    await productImage.setProduct(createdProduct.id);

    return createdProduct;
  },
  updateProduct: async function (id, body, file) {
    const subTaxonomy = body.subTaxonomy[0] || body.subTaxonomy[1];
    const editedProduct = {
      ...body,
      category_id: body.category,
      subTaxonomy,
    };
    await Product.update({ ...editedProduct }, { where: { id } });
    if (file) {
      const newImage = {
        location: file.filename,
        cover: 1,
      };
      const productImage = await ProductsImage.create(newImage);
      await productImage.setProduct(id);
    }
  },
  deleteProduct: async function (id) {
    await Product.destroy({
      where: {
        id: id,
      },
    });
  },
  searchProduct: async function (searchItem) {
    let products = await this.search(searchItem);
    if (products.length < 1) {
      const dictionary = JSON.parse(
        fs.readFileSync(dictionaryFilePath, 'utf-8')
      );
      let translation = dictionary[searchItem];
      products = await this.search(translation);
    }
    return products;
  },
  search: async function (searchItem) {
    let products = await Product.findAll({
      raw: true,
      nest: true,
      where: {
        [Op.or]: {
          '$product.name$': { [Op.like]: `%${searchItem}%` },
          '$subTaxonomy.name$': { [Op.like]: `%${searchItem}%` },
          '$subTaxonomy.taxonomy.name$': { [Op.like]: `%${searchItem}%` },
        },
      },
      include: [
        {
          model: SubTaxonomy,
          as: 'subTaxonomy',
          include: [{ model: Taxonomy, as: 'taxonomy' }],
        },
        { association: 'category' },
        { association: 'productsImages' },
      ],
    });
    products = this.formatProduct(products);
    return products;
  },
  addToCart: async function (req) {
    try {
      const {
        id: productId,
        price,
        discount,
      } = await Product.findByPk(req.params.id, {
        raw: true,
        nest: true,
        attributes: ['id', 'price', 'discount'],
      });
      const userId = req.session.user?.id || null;
      let saleId = req.session.currSale;
      if (!saleId) {
        const { id } = await Sale.create(
          { userId: userId },
          { raw: true, nest: true }
        );
        saleId = id;
      }
      if (
        req.session.productsInCart &&
        req.session.productsInCart.includes(productId)
      ) {
        const productSale = await ProductSale.findOne({
          where: { saleId: saleId, productId: productId },
          raw: true,
          nest: true,
        });
        let quantity = 1 + productSale.quantity;
        await ProductSale.update(
          {
            quantity: quantity,
          },
          {
            where: { saleId: saleId, productId: productId },
          }
        );
      } else {
        await ProductSale.create(
          {
            historicPrice: price,
            historicDiscount: discount,
            quantity: 1,
            productId,
            saleId,
          },
          { raw: true, nest: true }
        );
        req.session.productsInCart = req.session.productsInCart
          ? req.session.productsInCart.push(productId)
          : [productId];
      }

      req.session.currSale = saleId;
    } catch (error) {
      console.log('error', error);
    }
  },
  removeFromCart: async function (id) {
    await ProductSale.destroy({ where: { id } });
  },
  changeQuantity: async function (productSaleId, sign) {
    const productSale = await ProductSale.findByPk(productSaleId, {
      raw: true,
      nest: true,
    });
    let quantity =
      sign == 'plus' ? 1 + productSale.quantity : -1 + productSale.quantity;
    if (quantity == 0) this.removeFromCart(productSaleId);
    await ProductSale.update(
      {
        quantity: quantity,
      },
      {
        where: { id: productSaleId },
      }
    );
  },
};
