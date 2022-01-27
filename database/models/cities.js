module.exports = (sequelize, dataTypes) => {
  const Cities = sequelize.define(
    'Cities',
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
      country_id : {
        type: dataTypes.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        reference: {model: 'Countries', key: 'id'}

      }
    }
  )
}