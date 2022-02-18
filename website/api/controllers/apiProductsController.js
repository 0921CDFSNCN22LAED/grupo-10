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
module.exports = {
  list: async (req, res) => {
    const products = await productServices.getProducts();
    res.json({
      meta: {
        status: 200,
        total: products.length,
        url: '/api/products',
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
    const subTaxonomies = await productServices.getProductsSubTaxonomies()
    res.json({
      meta: {
        status: 200,
        total: subTaxonomies.length,
        url: '/api/products/subtaxonomies',
      },
      data: subTaxonomies,
    })
  }
};
