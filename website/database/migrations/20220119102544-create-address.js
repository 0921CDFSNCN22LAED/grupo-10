'use strict';

module.exports = {
  async up(queryInterface, dataTypes) {
    await queryInterface.createTable('Addresses', {
      id: {
        type: dataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      streetAddress: {
        type: dataTypes.STRING(255),
        allowNull: false,
      },
      postalCode: {
        type: dataTypes.INTEGER(8),
        allowNull: false,
      },
      city_id: {
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Cities', key: 'id' },
      },
      userId: {
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  },
};
