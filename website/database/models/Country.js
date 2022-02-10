module.exports = (sequelize, dataTypes) => {
  const Country = sequelize.define(
    'Country',
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
    },
    {
      timestamps: false,
    }
  );
  Country.associate = (models) => {
    Country.hasMany(models.City, {
      as: 'city',
      foreignKey: 'country_id',
    });
  };
  return Country;
};
