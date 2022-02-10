'use strict';

module.exports = {
  async up(queryInterface, dataTypes) {
    await queryInterface.createTable('Taxonomies', {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Taxonomies');
  },
};
