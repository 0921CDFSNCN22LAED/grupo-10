module.exports = (sequelize, dataTypes) => {
  const Taxonomy = sequelize.define(
    'Taxonomy',

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
  Taxonomy.associate = (models) => {
    Taxonomy.hasMany(models.Subtaxonomy, {
      as: 'product',
      foreignKey: 'products_id',
    });
  };
  return Taxonomy;
};
