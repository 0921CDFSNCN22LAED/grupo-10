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
      {
        id: 5,
        name: 'Jose',
        email: 'jose@mail.com',
        password:
          '$2a$10$Pz99vQ0UhbpRkLzWdYc5A.5tpFQSE9VZEkBTKxUa5KKNCGiZUMPtO',
        roleLevel: 'client',
        profileImage: 'default-avatar.png',
      },
      {
        id: 6,
        name: 'Oriana',
        email: 'oriana@mail.com',
        password:
          '$2a$10$li12N1zGiGvJ9lxZIJC0Se9cCk6KPSi0j/fLqPmMwd/5Eymn5nEt.',
        roleLevel: 'client',
        profileImage: '1642110635362.png',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
