'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductsImages', [
      {
        id: 1,
        cover: 1,
        product_id: 2,
        location: 'placa-video.jfif',
      },
      {
        id: 2,
        cover: 1,
        product_id: 9,
        location: 'razer-vipermini.jpg',
      },
      {
        id: 3,
        cover: 1,
        product_id: 1,
        location: 'logitech-gpro.jfif',
      },
      {
        id: 4,
        cover: 1,
        product_id: 3,
        location: 'teclado.jfif',
      },
      {
        id: 5,
        cover: 1,
        product_id: 6,
        location: 'core-i9.jpg',
      },
      {
        id: 6,
        cover: 1,
        product_id: 7,
        location: 'teclado-razer.jpg',
      },
      {
        id: 8,
        cover: 1,
        product_id: 4,
        location: 'gabinete-gamer.jfif',
      },
      {
        id: 9,
        cover: 1,
        product_id: 5,
        location: 'placa-madre-asus.jpg',
      },
      {
        id: 12,
        cover: 1,
        product_id: 10,
        location: 'teclado-redragon.jpg',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductsImages', null, {});
  },
};
