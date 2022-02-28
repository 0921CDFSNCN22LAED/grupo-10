const userServices = require('../../services/userServices');
const productServices = require('../../services/productServices');
const mainServices = require('../../services/mainServices');

function flattenObject(ob) {
  var toReturn = {};

  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == 'object' && ob[i] !== null) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

module.exports = {
  list: async (req, res) => {
    let users = await userServices.getUsers();
    users = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        url: `api/users/${user.id}`,
      };
    });
    res.json({
      meta: {
        status: 200,
        total: users.length,
        url: '/api/users',
      },
      data: users,
    });
  },
  flattenedList: async (req, res) => {
    const users = await userServices.getUsers();
    const flattenedUsers = users.map((user) => flattenObject(user));
    res.json({
      meta: {
        status: 200,
        total: users.length,
        url: '/api/users/flattened',
      },
      data: flattenedUsers,
    });
  },
  detail: async (req, res) => {
    let user = await mainServices.getUser(req.params.id);
    delete user.password;
    delete user.roleLevel;
    res.json({
      meta: {
        status: 200,
        url: `/api/users${user.id}`,
      },
      data: user,
    });
  },
};
