const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const {User} = require('../database/models');

module.exports = {
  getUsers: function () {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    return users;
  },
  getUser: function (id) {
    const users = this.getUsers();
    const user = users.find((user) => {
      return user.id == id;
    });
    return user;
  },
  saveUsers: function (users) {
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync(usersFilePath, data, 'utf-8');
  },
  store: function (req) {
    const newUser = {
      id: new Date().getTime(),
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      roleLevel: 1,
      profileImage: req.file ? req.file.filename : 'default-avatar.png',
    };
    let users = this.getUsers();
    users.push(newUser);
    this.saveUsers(users);
    // 🢁 JSON
    // 🢃 DB
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      profileImage: req.file ? req.file.filename : 'default-avatar.png',
    })
  },
  getUserbyEmail: function (email) {
    const users = this.getUsers();
    const user = users.find((user) => {
      return user.email == email;
    });
    return user;
  },
  validateUser: function (email, password) {
    if (this.getUserbyEmail(email)) {
      const user = this.getUserbyEmail(email);
      const checkPassword = bcrypt.compareSync(password, user.password);
      return checkPassword;
    } else {
      return false;
    }
  },
};
