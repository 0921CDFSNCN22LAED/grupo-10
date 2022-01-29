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
    await queryInterface.bulkInsert('Taxonomies', [
      {
        id: 1,
        name: 'Hardware',
      },
      {
        id: 2,
        name: 'Peripherals',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Taxonomies', null, {});
  },
};
