module.exports = (sequelize, dataTypes) => {
  const City = sequelize.define(
    'City',
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
      country_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        reference: { model: 'Countries', key: 'id' },
      },
    },
    {
      timestamps: false,
    }
  );
  City.associate = (models) => {
    City.hasMany(models.Address, {
      as: 'address',
      foreignKey: 'address_id',
    });
    City.belongsTo(models.Country, {
      as: 'country',
      foreignKey: 'country_id',
    });
  };
  return City;
};
