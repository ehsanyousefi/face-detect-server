const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
  

const postgres = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'facedetect'
  }
});

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => { res.send(database.users) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, postgres, bcrypt) })

app.post('/register',(req, res) => { register.handleRegister(req, res, postgres, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, postgres) })

app.put('/image', (req, res) => { image.handleImage(req, res, postgres)} )

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)} )

app.listen(3000, () => {
  console.log('App is Running on Port 3000')
})