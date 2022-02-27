const fs = require('fs');
const bcrypt = require('bcryptjs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const {User} = require('../database/models');
const req = require('express/lib/request');

module.exports = {
  getUsers: function () {
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    return users;
  },
  getUser: async function (id) {
    const user = await User.findByPk(id, {raw:true,nest:true,})
    return user;
  },
  saveUsers: function (users) {
    const data = JSON.stringify(users, null, 2);
    fs.writeFileSync(usersFilePath, data, 'utf-8');
  },
  store: function (req) {
    // const newUser = {
    //   id: new Date().getTime(),
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: bcrypt.hashSync(req.body.password, 10),
    //   roleLevel: 1,
    //   profileImage: req.file ? req.file.filename : 'default-avatar.png',
    // };
    // let users = this.getUsers();
    // users.push(newUser);
    // this.saveUsers(users);
    // 🢁 JSON
    // 🢃 DB
    const user = User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      profileImage: req.file ? req.file.filename : 'default-avatar.png',
    })
    return user
  },
  getUserbyEmail: async function (email) {
    const user = await User.findOne({where:{
      email
    },raw:true, nest:true})
    return user;
  },
  validateUser: async function (email, password) {
    if (this.getUserbyEmail(email)) {
      const user = await this.getUserbyEmail(email);
      const checkPassword = bcrypt.compareSync(password, user.password);
      return checkPassword;
    } else {
      return false;
    }
  },
  updateUser: async function(data, id){
    const {name, email} = data
    return await User.update({
      ...(name && {name}),
      ...(email && {email}),
    },{
      where: {id}
    })
  }
};
