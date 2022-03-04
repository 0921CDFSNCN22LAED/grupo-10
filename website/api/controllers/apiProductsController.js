const productServices = require('../../services/productServices');
const {
  Product,
  Category,
  SubTaxonomy,
  Taxonomy,
  sequelize,
  User,
} = require('../../database/models');

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
    const page = req.query.page || 1;
    const pagination = 10;
    const offset = (page - 1) * pagination;
    let products = await productServices.getProducts(pagination, offset);
    products = products.map((product) => {
      return {
        id: product.id,
        nombre: product.name,
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

    const total = await Product.count();
    try {
      function mapGroups(groupName, group) {
        const mappedGroup = {};
        group.forEach((item) => {
          mappedGroup[item[`${groupName}.name`]] = item.count;
        });
        return mappedGroup;
      }

      let categoryPromise = Product.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('Category.id')), 'count'],
        ],
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['name'],
          },
        ],
        group: ['Category.id'],
        raw: true,
      });
      let subTaxonomyPromise = Product.findAll({
        attributes: [
          [sequelize.fn('COUNT', sequelize.col('SubTaxonomy.id')), 'count'],
        ],
        include: [
          {
            model: SubTaxonomy,
            as: 'subTaxonomy',
            attributes: ['name'],
          },
        ],
        group: ['SubTaxonomy.id'],
        raw: true,
      });
      let taxonomyPromise = Product.findAll({
        attributes: [
          [
            sequelize.fn('COUNT', sequelize.col('Subtaxonomy.Taxonomy.id')),
            'count',
          ],
        ],
        include: [
          {
            model: SubTaxonomy,
            as: 'subTaxonomy',
            include: [
              {
                model: Taxonomy,
                as: 'taxonomy',
                attributes: ['name'],
              },
            ],
          },
        ],
        group: ['Subtaxonomy.Taxonomy.id'],
        raw: true,
      });

      const [categoryUnmapped, subTaxonomyUnmapped, taxonomyUnmapped] =
        await Promise.all([
          categoryPromise,
          subTaxonomyPromise,
          taxonomyPromise,
        ]);

      const category = mapGroups('category', categoryUnmapped);
      const subTaxonomy = mapGroups('subTaxonomy', subTaxonomyUnmapped);
      const taxonomy = mapGroups('subTaxonomy.taxonomy', taxonomyUnmapped);

      res.json({
        meta: {
          status: 200,
          total: total,
          group: {
            category,
            subTaxonomy,
            taxonomy,
          },
          url: `/api/products?page=${page}`,
          prev: prev,
          next: next,
        },
        data: products,
      });
    } catch (error) {
      console.log('error', error);
    }
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
  totals: async (req, res) => {
    const productsTotal = await Product.count();
    const usersTotal = await User.count();
    const subtaxonomiesTotal = await SubTaxonomy.count();
    res.json({
      meta: {
        status: 200,
        url: `/api/products/totals`,
      },
      data: [
        {
          titulo: 'Total de productos',
          cifra: productsTotal,
          color: 'primary',
          icono: 'fa-desktop',
        },
        {
          titulo: 'Total de usuarios',
          cifra: usersTotal,
          color: 'success',
          icono: 'fa-user',
        },
        {
          titulo: 'Total de subtaxonomías',
          cifra: subtaxonomiesTotal,
          color: 'warning',
          icono: 'fa-sitemap',
        },
      ],
    });
  },
  lastProduct: async (req, res) => {
    try {
      let product = await Product.findOne({
        order: [['createdAt', 'DESC']],
        raw: true,
        nest: true,
        include: [{ association: 'productsImages' }],
      });
      product = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        discount: product.discount,
        group: {
          taxonomy: product.subTaxonomy?.taxonomy.name,
          subTaxonomy: product.subTaxonomy?.name,
          category: product.category,
        },
        image: `http://localhost:3001/img/products-img/${product.productsImages.location}`,
      };
      res.json({
        meta: {
          status: 200,
          url: `/api/products/last-product/`,
        },
        data: product,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
