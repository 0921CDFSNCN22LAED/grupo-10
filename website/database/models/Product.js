module.exports = (sequelize, dataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: dataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: dataTypes.DECIMAL,
        allowNull: false,
      },
      description: {
        type: dataTypes.TEXT,
      },
      discount: {
        type: dataTypes.INTEGER,
        defaultValue: 0,
      },
      category_id: {
        type: dataTypes.INTEGER.UNSIGNED,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Categories', key: 'id' },
      },
      subTaxonomy_id: {
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'SubTaxonomies', key: 'id' },
      },
    },

    {
      timestamps: true,
      paranoid: true,
    }
  );
  Product.associate = (models) => {
    Product.hasOne(models.ProductsImage, {
      as: 'productsImages',
      foreignKey: 'productId',
    });
    Product.belongsTo(models.SubTaxonomy, {
      as: 'subTaxonomy',
      foreignKey: 'subTaxonomy_id',
    });
    Product.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'category_id',
    });
    Product.hasMany(models.ProductSale, {
      as: 'productSale',
      foreignKey: 'productId',
    });
  };
  return Product;
};
