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
        type: dataTypes.STRING(60),
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
        type: dataTypes.DECIMAL(5, 2),
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
      timestamps: false,
    }
  );
  Product.associate = (models) => {
    Product.hasOne(models.ProductsImage, {
      as: 'productsImages',
      foreignKey: 'product_id',
    });
  Product.associate = (models) => {
    Product.BelongsTo(models.Categories, {
      as: 'ProductCategory',
      foreignKey: 'category_id',
    });
  };
  return Product;
};
}
