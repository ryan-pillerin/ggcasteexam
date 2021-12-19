const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const encryption = require('./models/encryption/aes256')

// Routes
const managedbRoute = require('./routes/database/managedb')
const examRoute = require('./routes/exam')
const dashboardRoute = require('./routes/dashboard')
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/registration')

// Unit Test
const mysqlDB = require('./models/database/mysqldb')
const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

// Set Template Engine
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/managedb', managedbRoute)
app.use('/exam', examRoute)
app.use('/dashboard', dashboardRoute)
app.use('/', loginRoute)
app.use('/registration', registerRoute)


app.listen(3000, () => {
    console.log("----------------------------------------------")
    console.log("GGCAST Electronic Exam Server is running!")
    console.log("----------------------------------------------")
})