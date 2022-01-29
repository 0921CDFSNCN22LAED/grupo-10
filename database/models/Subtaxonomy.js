module.exports = (sequelize, dataTypes) => {
  const Subtaxonomy = sequelize.define(
    'Subtaxonomy',

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
      taxonomy_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
      timestamps: false,
    }
  );
  Subtaxonomy.associate = (models) => {
    Subtaxonomy.hasMany(models.Product, {
      as: 'SubtaxonomyProduct',
      foreignKey: 'subTaxonomy_id',
    });
    Subtaxonomy.belongsTo(models.Taxonomy, {
      as: 'SubtaxonomyTaxonomy',
      foreignKey: 'taxonomy_id',
    });
  };
  return Subtaxonomy;
};
