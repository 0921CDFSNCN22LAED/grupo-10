const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');

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
      password: req.body.password,
      perfilImage: req.file ? req.file.filename : 'default-avatar.png',
    };
    let users = this.getUsers();
    users.push(newUser);
    this.saveUsers(users);
  },
};
