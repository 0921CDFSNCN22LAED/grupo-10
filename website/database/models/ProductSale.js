module.exports = (sequelize, dataTypes) => {
  const ProductSale = sequelize.define(
    'ProductSale',
    {
      id: {
        type: dataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      historicPrice: {
        type: dataTypes.DECIMAL,
        allowNull: false,
      },
      historicDiscount: {
        type: dataTypes.INTEGER,
        defaultValue: 0,
      },
      productId: {
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Products', key: 'id' },
      },
      quantity: {
        type: dataTypes.INTEGER,
        defaultValue: 1,
      },
      saleId: {
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Sales', key: 'id' },
      },
      createdAt: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: dataTypes.DATE,
        allowNull: false,
      },
    },

    {
      timestamps: true,
    }
  );
  ProductSale.associate = (models) => {
    ProductSale.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'productId',
    });
    ProductSale.belongsTo(models.Sale, {
      as: 'productSale',
      foreignKey: 'saleId',
    });
  };
  return ProductSale;
};
