module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define(
    'User',
    
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
      email: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: dataTypes.STRING(60),
        allowNull: false,
      },
      profileImage: {
        type: dataTypes.STRING,
      },
      phone: {
        type: dataTypes.INTEGER(14),
      },
    },
    
    {
      timestamps: false,
    }
  );
  return User;
};
