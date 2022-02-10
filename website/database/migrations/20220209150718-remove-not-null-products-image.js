'use strict';

module.exports = {
  up: async (queryInterface, dataTypes) => {
    await queryInterface.dropTable('ProductsImages');
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
      product_id: {
        type: dataTypes.INTEGER.UNSIGNED,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Products', key: 'id' },
      },
    });
  },

  down: async (queryInterface, dataTypes) => {
    await queryInterface.dropTable('ProductsImages');
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
      product_id: {
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Products', key: 'id' },
      },
    });
  },
};
