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
        allowNull: false,
      },
      user_id: {
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' },
      },
    },

    {
      timestamps: false,
    }
  );
  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id',
    });
  };
  return Sale;
};
