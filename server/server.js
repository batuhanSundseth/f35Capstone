const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('client'))
app.get('/', (req, res) => {res.status(200).sendFile(path.join(__dirname, '../client/index.html'))})
app.get('/css', (req, res) => {res.status(200).sendFile(path.join(__dirname, '../client/styles.css'))})
app.get('/js', (req, res) => {res.status(200).sendFile(path.join(__dirname, '../client/index.js'))})

const {
  login,
  register,
  updatePassword,
  newPassword
} = require('./controller.js')

app.post(`/login`, login)
app.post(`/register`, register)
app.put(`/updatePassword`, updatePassword)
app.post(`/newPassword`, newPassword)

app.listen(4004, console.log(`App running on port 4004!`))