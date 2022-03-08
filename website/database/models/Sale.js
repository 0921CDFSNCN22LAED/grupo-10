module.exports = (sequelize, dataTypes) => {
  const Sale = sequelize.define(
    'Sale',

    {
      id: {
        type: dataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sold: {
        type: dataTypes.TINYINT,
        defaultValue: 0,
      },
      createdAt: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      userId: {
        type: dataTypes.INTEGER.UNSIGNED,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' },
      },
    },

    {
      timestamps: true,
    }
  );
  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
    Sale.hasMany(models.ProductSale, {
      as: 'sale',
      foreignKey: 'saleId',
    });
  };
  return Sale;
};
