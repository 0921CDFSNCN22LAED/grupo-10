'use strict';

module.exports = {
  async up(queryInterface, dataTypes) {
    await queryInterface.createTable('productSales', {
      id: {
        type: dataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      historicPrice: {
        type: dataTypes.DECIMAL,
        allowNull: false,
      },
      historicDiscount: {
        type: dataTypes.INTEGER,
        defaultValue: 0,
      },
      quantity: {
        type: dataTypes.INTEGER,
        defaultValue: 1,
      },
      createdAt: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      productId: {
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Products', key: 'id' },
      },
      saleId: {
        type: dataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Sales', key: 'id' },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('productSales');
  },
};
