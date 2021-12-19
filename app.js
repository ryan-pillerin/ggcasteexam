const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')

// Routes
const managedbRoute = require('./routes/database/managedb')
const loginRoute = require('./routes/login')
const registrRoute = require('./routes/registration')

const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set Template Engine
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));

app.use('/managedb', managedbRoute)
app.use('/', loginRoute)
app.use('/registration',registrRoute)

app.listen(3000, () => {
    console.log("Server is running...")
})