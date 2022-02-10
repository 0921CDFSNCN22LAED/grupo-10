module.exports = (sequelize, dataTypes) => {
  const ProductsImage = sequelize.define(
    'ProductsImage',

    {
      id: {
        type: dataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      location: {
        type: dataTypes.STRING(30),
        allowNull: false,
      },
      cover: {
        type: dataTypes.TINYINT,
        allowNull: false,
      },
      product_id: {
        type: dataTypes.INTEGER.UNSIGNED,
        // allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Products', key: 'id' },
      },
    },

    {
      timestamps: false,
    }
  );
  ProductsImage.associate = (models) => {
    ProductsImage.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'product_id',
    });
  };
  return ProductsImage;
};
