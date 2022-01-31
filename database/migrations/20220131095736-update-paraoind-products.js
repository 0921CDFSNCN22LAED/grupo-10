'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Products', 'createdAt', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('Products', 'updatedAt', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('Products', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE,
      }),
    ]);
  },
  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Products', 'createdAt'),
      queryInterface.removeColumn('Products', 'updatedAt'),
      queryInterface.removeColumn('Products', 'deletedAt'),
    ]);
  },
};
