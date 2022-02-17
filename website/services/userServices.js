const { User, Address, City } = require('../database/models');

module.exports = {
  getUsers: async function () {
    try {
      const data = await User.findAll({
        raw: true,
        nest: true,
        include: [
          { association: 'sales' },
          //   BUG: VER ERRORES EN MODELOS!!!
          //   {
          //     model: Address,
          //     as: 'addresses',
          //     include: [
          //       {
          //         model: City,
          //         as: 'city',
          //         include: [
          //           {
          //             association: 'country',
          //           },
          //         ],
          //       },
          //     ],
          //   },
        ],
      });

      return data;
    } catch (error) {
      console.log('error', error);
    }
  },
};
