const loginButton = document.querySelector('#loginButton')
const registerButton = document.querySelector('#registerButton')
const genPasswordButton = document.querySelector('#genPasswordButton')
const genPaswordContainer = document.querySelector('#genPasswordContainer')
const passwordContainer = document.querySelector('#passwordsContainer')

let currentUser = ''

const login = body => axios.post(`/login`, body).then( res => {
  currentUser = (res.data.username) 
  listPasswords(res.data.passwords)
}).catch(err => {
  console.log(err)
  alert('Uh oh. Your request did not work.')
})
const register = body => axios.post(`/register`, body).then(res => {
  currentUser = (res.data.username)
}).catch(err => {
  console.log(err)
  alert('Uh oh. Your request did not work.')
})
const updatePassword = body => axios.put(`/updatePassword`, body).then(res => {
  listPasswords(res.data)
  console.log("YES")
}).catch(err => {
  console.log(err)
  alert('Uh oh. Your request did not work.')
})
const newPassword = body => axios.post(`/newPassword`, body).then( res => {
  listNewPassword(res.data)
}).catch(err => {
  console.log(err)
  alert('Uh oh. Your request did not work.')
})

function loginSubmitHandler() {
  let username = document.querySelector('#loginUsername')
  let password = document.querySelector('#loginPassword')

  let bodyObj = {
    username: username.value,
    password: password.value
  }

  const passwordCard = document.createElement('div')
  passwordCard.classList.add('passwordCard')
  passwordCard.innerHTML = `<img src="add.png" onclick="newCard()">`
  
  passwordContainer.appendChild(passwordCard)

  login(bodyObj)

  username.value = ''
  password.value = ''
}

function registerSubmitHandler() {
  let username = document.querySelector('#registerUsername')
  let password = document.querySelector('#registerPassword')
  let password2 = document.querySelector('#registerPassword2')

  if (password.value !== password2.value) {
    alert("Your passwords need to match.")
    return
  }

  let bodyObj = {
      username: username.value,
      password: password.value
  }

  register(bodyObj)

  username.value = ''
  password.value = ''
  password2.value = ''

  const passwordCard = document.createElement('div')
  passwordCard.classList.add('passwordCard')
  passwordCard.innerHTML = `<img src="add.png" onclick="newCard()">`
  
  passwordContainer.appendChild(passwordCard)
}

function genPassword() {
  let i = 0
  let password = []
  while (i < 20) {
    let randNum = Math.random() * (123-33) + 33
    randNum = Math.floor(randNum)
    password.push(String.fromCharCode(randNum))
    i++
  }
  password = password.join('')
  genPaswordContainer.textContent = `${password}`
}

function listPasswords(passwords) {
  passwordContainer.innerHTML = `
  <div class="passwordCard">
    <img src="add.png" onclick="newCard()">
  </div>
  `
  for (let i = 0; i < passwords.length; i++) {
    const passwordCard = document.createElement('div')
    passwordCard.classList.add('passwordCard')

    passwordCard.innerHTML = `
      <input id="title${i}" type="input" placeholder="${passwords[i].title}">
      <input id="username${i}" type="input" placeholder="${passwords[i].username}">
      <input id="password${i}" type="input" placeholder="${passwords[i].password}">
      <p></p>
      <button onclick="updateHandler(title${i}, username${i}, password${i}, ${i})">Update</button>
      `

    passwordContainer.appendChild(passwordCard)
  }
}

function newCard() {
  passwordContainer.innerHTML = `
  <div class="passwordCard">
    <img src="add.png" onclick="newCard()">
  </div>
  `

  let bodyObj = {
    username: currentUser
  }

  newPassword(bodyObj)
}

function listNewPassword(passwords) {
  passwords.forEach((password, index) => {
    const passwordCard = document.createElement('div')
    passwordCard.classList.add('passwordCard')
  
    passwordCard.innerHTML = `
      <input id="title${index}" type="input" placeholder="Title">
      <input id="username${index}" type="input" placeholder="Username">
      <input id="password${index}" type="input" placeholder="Password">
      <p></p>
      <button onclick="updateHandler('title${index}', 'username${index}', 'password${index}', ${index})">Update</button>
      `
  
    passwordContainer.appendChild(passwordCard)
  })
}

function updateHandler(title, username, password, index) {
  let newTitle = document.querySelector('#' + title)
  let newUsername = document.querySelector('#' + username)
  let newPassword = document.querySelector('#' + password)
  console.log(title, username, password)

  let bodyObj = {
    superUser: currentUser,
    title: newTitle.value,
    username: newUsername.value,
    password: newPassword.value,
    index: index
  }
  console.log(bodyObj)

  updatePassword(bodyObj)
}

loginButton.addEventListener('click', loginSubmitHandler)
registerButton.addEventListener('click', registerSubmitHandler)
genPasswordButton.addEventListener('click', genPassword)
