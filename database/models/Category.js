module.exports = (sequelize, dataTypes) => {
  const Category = sequelize.define(
    'Categories',

    {
      id: {
        type: dataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: dataTypes.STRING(30),
        allowNull: false,
      }
    },

    {
      timestamps: false,
    }
  );
  Category.associate = (models) => {
    Category.belongsTo(models.Product, {
      as: 'productsImages',
      foreignKey: 'product_id',
    });
  };
  return Category;
};
