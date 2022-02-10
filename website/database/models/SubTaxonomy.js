module.exports = (sequelize, dataTypes) => {
  const SubTaxonomy = sequelize.define(
    'SubTaxonomy',

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
  SubTaxonomy.associate = (models) => {
    SubTaxonomy.hasMany(models.Product, {
      as: 'subTaxonomy',
      foreignKey: 'subTaxonomy_id',
    });
    SubTaxonomy.belongsTo(models.Taxonomy, {
      as: 'taxonomy',
      foreignKey: 'taxonomy_id',
    });
  };
  return SubTaxonomy;
};
