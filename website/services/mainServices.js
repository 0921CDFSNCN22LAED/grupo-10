const bcrypt = require('bcryptjs');
const path = require('path');
const { User, Sale } = require('../database/models');

module.exports = {
  getUser: async function (id) {
    const user = await User.findByPk(id, { raw: true, nest: true });
    return user;
  },
  store: function (req) {
    const user = User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      profileImage: req.file ? req.file.filename : 'default-avatar.png',
    });
    return user;
  },
  getUserByEmail: async function (email) {
    const user = await User.findOne({
      where: {
        email,
      },
      raw: true,
      nest: true,
    });
    return user;
  },
  validateUser: async function (email, password) {
    if (email && this.getUserByEmail(email) && password) {
      const user = await this.getUserByEmail(email);
      if (!user) return false;
      const checkPassword = bcrypt.compareSync(password, user.password);
      return checkPassword;
    } else {
      return false;
    }
  },
  updateUser: async function (data, id, reqFile) {
    const { name, email } = data;
    return await User.update(
      {
        ...(name && { name }),
        ...(email && { email }),
        profileImage: reqFile ? reqFile.filename : 'default-avatar.png',
      },
      {
        where: { id },
      }
    );
  },
  getCartProducts: async function (req) {
    let currSaleId = req.session.currSale;
    const currSale = await Sale.findByPk(currSaleId);
    if (!currSale) return [];
    const cart = await currSale.getProductSale({
      raw: true,
      nest: true,
      include: [{ association: 'product' }],
    });

    return cart;
  },
};
