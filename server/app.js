const mongosee = require('mongoose');
const express = require('express')
const cors = require('cors')
const { API_VERSION } = require('./constants.js');
const bodyParser = require('body-parser');

const app = express()

//TODO Configurar carpeta static

app.use(express.static('uploads'))

// TODO Importadcion del body-parse

app.use(bodyParser.urlencoded({  extended: true }))
app.use(bodyParser.json())

// TODO Configurar los headers & cors

app.use(cors())

// TODO Importadcion de rutas

const authRoute = require('./routes/auth.router')
const userRoutes = require('./routes/user.router')
const menuRoutes = require('./routes/menu.router.js')
const courseRoutes = require('./routes/course.router.js')
const postRoutes = require('./routes/post.router.js')
const newsletterRoutes = require('./routes/newsletter.router.js')

// TODO Configurar Rutas

//* Importar rutas
app.use(`/api/${API_VERSION}/` , authRoute)
app.use(`/api/${API_VERSION}/` , userRoutes)
app.use(`/api/${API_VERSION}/` , menuRoutes)
app.use(`/api/${API_VERSION}/` , courseRoutes)
app.use(`/api/${API_VERSION}/` , postRoutes)
app.use(`/api/${API_VERSION}/` , newsletterRoutes)



module.exports = app