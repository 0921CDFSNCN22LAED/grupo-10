'use strict';

module.exports = {
  async up(queryInterface, dataTypes) {
    await queryInterface.createTable('ProductsImages', {
      id: {
        type: dataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      location: {
        type: dataTypes.STRING(30),
        allowNull: false,
      },
      cover: {
        type: dataTypes.TINYINT,
        allowNull: false,
      },
      productId: {
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Products', key: 'id' },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductsImages');
  },
};
