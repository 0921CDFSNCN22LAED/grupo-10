'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ProductsImages', [
      {
        id: 1,
        cover: 1,
        productId: 1,
        location: 'logitech-gpro.jfif',
      },
      {
        id: 2,
        cover: 1,
        productId: 2,
        location: 'placa-video.jfif',
      },
      {
        id: 3,
        cover: 1,
        productId: 3,
        location: 'teclado.jfif',
      },
      {
        id: 4,
        cover: 1,
        productId: 4,
        location: 'productDefault.png',
      },
      {
        id: 5,
        cover: 1,
        productId: 5,
        location: 'placa-madre-asus.jpg',
      },

      {
        id: 6,
        cover: 1,
        productId: 6,
        location: 'core-i9.jpg',
      },
      {
        id: 7,
        cover: 1,
        productId: 7,
        location: 'teclado-razer.jpg',
      },
      {
        id: 8,
        cover: 1,
        productId: 8,
        location: 'razer-vipermini.jpg',
      },
      {
        id: 9,
        cover: 1,
        productId: 9,
        location: 'razer-vipermini.jpg',
      },
      {
        id: 10,
        cover: 1,
        productId: 10,
        location: 'teclado-redragon.jpg',
      },
      {
        id: 11,
        cover: 1,
        productId: 11,
        location: '1646132184920.jpg',
      },

      {
        id: 12,
        cover: 1,
        productId: 12,
        location: 'productDefault.png',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductsImages', null, {});
  },
};
