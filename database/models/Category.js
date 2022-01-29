module.exports = (sequelize, dataTypes) => {
  const Category = sequelize.define(
    'Category',

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
      },
    },

    {
      timestamps: false,
    }
  );
  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      as: 'product',
      foreignKey: 'products_id',
    });
  };
  return Category;
};
