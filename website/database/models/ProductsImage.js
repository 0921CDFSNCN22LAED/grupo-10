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
        defaultValue: 'productDefault.png',
      },
      cover: {
        type: dataTypes.TINYINT,
        allowNull: false,
      },
      productId: {
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
      foreignKey: 'productId',
    });
  };
  return ProductsImage;
};
