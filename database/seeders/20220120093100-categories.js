'use strict';
//Categories id
// 1: Oferta
// 2: ArtDestacado
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        id: 1,
        name: 'Oferta',
      },
      {
        id: 2,
        name: 'ArtDestacado',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
