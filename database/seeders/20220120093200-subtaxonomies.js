'use strict';

// taxonomy id
//1: Hardware {
//      1: "Coolers",
//      2: "Disco Rígido HDD",
//      3: "Disco Solido SDD",
//      4: "Fuentes",
//      5: "Gabinetes",
//      6: "Memorias Ram",
//      7: "Motherboards",
//      8: "Placas de video",
//      9:  "Procesadores"}
// 2: Peripherals {
//     100: "Almacenamiento",
//     101: "Auriculares",
//     102: "Impresoras",
//     103: "Joysticks",
//     104: "Micrófonos",
//     105: "Monitores",
//     106: "Mouses",
//     107: "Parlantes",
//     108: "Teclados",
//     109:"Web cams",
//     110: "Pads y otros"
// }

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Subtaxonomies', [
      {
        id: 1,
        name: 'Coolers',
        taxonomy_id: 1,
      },
      {
        id: 2,
        name: 'Disco Rígido HDD',
        taxonomy_id: 1,
      },
      {
        id: 3,
        name: 'Disco Solido SDD',
        taxonomy_id: 1,
      },
      {
        id: 4,
        name: 'Fuentes',
        taxonomy_id: 1,
      },
      {
        id: 5,
        name: 'Gabinetes',
        taxonomy_id: 1,
      },
      {
        id: 6,
        name: 'Memorias Ram"',
        taxonomy_id: 1,
      },
      {
        id: 7,
        name: ' ArtDestacado',
        taxonomy_id: 1,
      },
      {
        id: 8,
        name: 'Placas de video',
        taxonomy_id: 1,
      },
      {
        id: 9,
        name: 'Procesadores',
        taxonomy_id: 1,
      },
      {
        id: 100,
        name: 'Almacenamiento',
        taxonomy_id: 2,
      },
      {
        id: 101,
        name: 'Auriculares',
        taxonomy_id: 2,
      },
      {
        id: 102,
        name: 'Impresoras',
        taxonomy_id: 2,
      },
      {
        id: 103,
        name: 'Joysticks',
        taxonomy_id: 2,
      },
      {
        id: 104,
        name: 'Micrófonos',
        taxonomy_id: 2,
      },
      {
        id: 105,
        name: 'Monitores',
        taxonomy_id: 2,
      },
      {
        id: 106,
        name: 'Mouses',
        taxonomy_id: 2,
      },
      {
        id: 107,
        name: 'Parlantes',
        taxonomy_id: 2,
      },
      {
        id: 108,
        name: 'Teclados',
        taxonomy_id: 2,
      },
      {
        id: 109,
        name: 'Web cams',
        taxonomy_id: 2,
      },
      {
        id: 110,
        name: 'Pads y otros',
        taxonomy_id: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Subtaxonomies', null, {});
  },
};
