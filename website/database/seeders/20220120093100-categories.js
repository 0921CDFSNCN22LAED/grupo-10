'use strict';
//Categories id
// 1: Oferta
// 2: ArtDestacado
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        id: 1,
        name: 'Sin categoría',
      },
      {
        id: 2,
        name: 'Oferta',
      },
      {
        id: 3,
        name: 'ArtDestacado',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
