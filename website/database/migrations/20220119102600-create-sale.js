'use strict';

module.exports = {
  async up(queryInterface, dataTypes) {
    await queryInterface.createTable('Sales', {
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
      createdAt: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      userId: {
        type: dataTypes.INTEGER.UNSIGNED,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Users', key: 'id' },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sales');
  },
};
