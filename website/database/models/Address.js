module.exports = (sequelize, dataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      id: {
        type: dataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        reference: { model: 'Users', key: 'id' },
      },
      streetAddress: {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
      city_id: {
        type: dataTypes.STRING(60),
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        reference: { model: 'Cities', key: 'id' },
      },
      postalCode: {
        type: dataTypes.INTEGER(8),
      },
    },
    {
      timestamps: false,
    }
  );
  Address.associate = (models) => {
    Address.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
    Address.belongsTo(models.City, {
      as: 'city',
      foreignKey: 'city_id',
    });
  };
  return Address;
};
