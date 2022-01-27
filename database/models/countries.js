module.exports = (sequelize, dataTypes) => {
  const Countries = sequelize.define(
    'Countries',
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
      }
    }
  )
}