const bcrypt = require('bcryptjs')
let users = []

module.exports = {
  login: (req, res) => {
    console.log(req.body)
    const {username, password} = req.body
    for (let i = 0; i < users.length; i++) {
      if(users[i].username === username && bcrypt.compareSync(password, users[i].password)) {
        let user = {
          username: users[i].username,
          passwords: users[i].passwords
        }
        res.status(200).send(user)
        return
      }
    }
    res.status(400).send("User not found.")
  },

  register: (req, res) => {
    const {username, password} = req.body
    let salt = bcrypt.genSaltSync(5)
    let hash = bcrypt.hashSync(password, salt)
    let newUser = {
      username,
      password: hash,
      passwords: [],
    }
    users.push(newUser)
    let userToSend = {...newUser}
    delete userToSend.password
    res.status(200).send(userToSend)
  },

  updatePassword: (req, res) => {
    const {title, username, password, index} = req.body
    let newPassword = {
      username,
      password,
      title,
      index
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === req.body.superUser) {
        for (let j = 0; j < users[i].passwords.length; j++) {
          if (j === index) {
            users[i].passwords[j] = newPassword
            res.status(200).send(users[i].passwords)
          }
        }
      }
    }
  },

  newPassword: (req, res) => {
    let newPassword = {
      username: '',
      password: '',
      title: ''
    }
    console.log(req.body)
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === req.body.username) {
        users[i].passwords.push(newPassword)
        res.status(200).send(users[i].passwords)
      }
    }
  }
}