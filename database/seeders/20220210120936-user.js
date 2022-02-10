'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Cristian',
        email: 'cristianramos92639@gmail.com',
        password:
          '$2a$10$i1AaknHRAOWe4JBy3gsiLuC/j5Rkba1WAO2yjGmC0Si.l0JNPyUPO',
        roleLevel: 'admin',
        profileImage: 'default-avatar.png',
      },
      {
        id: 2,
        name: 'Esteban Ponce',
        email: 'estebanponce_7@hotmail.com',
        password:
          '$2a$10$1/Ab3k2UbWcPeS8yITfXReCdmRhrCqsugCPNiqCIPKm7vrYJm9qga',
        roleLevel: 'admin',
        profileImage: 'default-avatar.png',
      },
      {
        id: 3,
        name: 'Luios',
        email: 'luios@mail.com',
        password:
          '$2a$10$D1ffvwiXKuefx9aglXVb/ueC1A1Uj4svQz8rm/Koj9AUAmybJxT5u',
        roleLevel: 'admin',
        profileImage: 'default-avatar.png',
      },
      {
        id: 4,
        name: 'Sebastián Torn',
        email: 'se.amigos@gmail.com',
        password:
          '$2a$10$tzLyfcFbE0k6vLgv6fVIC.62DZ57IMTgyRWDgBgOYP/cBQw/NGsye',
        roleLevel: 'admin',
        profileImage: '1644019570246.png',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
