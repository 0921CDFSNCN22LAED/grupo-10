const productServices = require('../../services/productServices');

function flattenObject(ob) {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == 'object' && ob[i] !== null) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

function countByGroup(groupName, products) {
  const group = {};
  products.forEach((product) => {
    if (group.hasOwnProperty(product.group[groupName])) {
      group[product.group[groupName]] = group[product.group[groupName]] + 1;
    } else {
      group[product.group[groupName]] = 1;
    }
  });
  return group;
}

module.exports = {
  list: async (req, res) => {
    const page = req.query.page;
    const pagination = 10;
    const offset = (page - 1) * pagination;
    let products = await productServices.getProducts(pagination, offset);
    products = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        group: {
          taxonomy: product.subTaxonomy.taxonomy.name,
          subTaxonomy: product.subTaxonomy.name,
          category: product.category,
        },
        url: `/api/products/${product.id}`,
      };
    });
    const prev =
      page < 1 + 1 ? 'no prev page' : `/api/products?page=${Number(page) - 1}`;
    const next =
      page > products.length / pagination
        ? 'no next page'
        : `/api/products?page=${Number(page) + 1}`;
    let allProducts = await productServices.getProducts();
    allProducts = allProducts.map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        group: {
          taxonomy: product.subTaxonomy.taxonomy.name,
          subTaxonomy: product.subTaxonomy.name,
          category: product.category,
        },
        url: `/api/products/${product.id}`,
      };
    });

    // REARMAR GROUP BY HAVING
    const subTaxonomies = countByGroup('subTaxonomy', allProducts);
    const taxonomies = countByGroup('taxonomy', allProducts);
    const category = countByGroup('category', allProducts);
    res.json({
      meta: {
        status: 200,
        total: products.length,
        subTaxonomies: subTaxonomies,
        taxonomies: taxonomies,
        category: category,
        url: `/api/products?page=${page}`,
        prev: prev,
        next: next,
      },
      data: products,
    });
  },
  flattenedList: async (req, res) => {
    const products = await productServices.getProducts();
    const flattenedProducts = products.map((product) => flattenObject(product));
    res.json({
      meta: {
        status: 200,
        total: products.length,
        url: '/api/products/flattened',
      },
      data: flattenedProducts,
    });
  },
  subTaxonomiesList: async (req, res) => {
    const subTaxonomies = await productServices.getProductsSubTaxonomies();
    res.json({
      meta: {
        status: 200,
        total: subTaxonomies.length,
        url: '/api/products/subtaxonomies',
      },
      data: subTaxonomies,
    });
  },
  detail: async (req, res) => {
    let product = await productServices.getProduct(req.params.id);
    product = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      discount: product.discount,
      group: {
        taxonomy: product.subTaxonomy.taxonomy.name,
        subTaxonomy: product.subTaxonomy.name,
        category: product.category,
      },
      image: `/img/products-img/${product.image}`,
    };
    res.json({
      meta: {
        status: 200,
        url: `/api/products/${product.id}`,
      },
      data: product,
    });
  },
};
