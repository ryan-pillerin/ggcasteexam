const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const mysqlDB = require('./models/database/mysqldb')

// Passport
const initializePassport = require('./models/passport-config')
initializePassport(
    passport, 
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)   

let users = []

// Routes
const managedbRoute = require('./routes/database/managedb')
const examRoute = require('./routes/exam')
const dashboardRoute = require('./routes/dashboard')
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/registration')

// Unit Test
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
app.use(flash())
app.use(session({
    secret: '7071cd94f1b27ac687aaa362087a0fdac4e321108a8f0b93d7ea5838603a766a',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/managedb', managedbRoute)
app.use('/exam', examRoute)
app.use('/dashboard', dashboardRoute)
app.use('/', loginRoute)
app.use('/registration', registerRoute)

app.listen(3000, async() => {
    console.log("----------------------------------------------")
    console.log("GGCAST Electronic Exam Server is running!")
    console.log("----------------------------------------------")
    /*
    console.log(encryption.encrypt('admin'))
    console.log(guid())
    console.log(dateFormat.format(new Date(), 'YYYY/MM/DD HH:mm:ss'))
    */
    let promise = new Promise( (resolve, reject) => {
        let sql =   "SELECT ggcastexam.facilitator.id, 'facilitator' as accounttype," +
                    " firstname, lastname, ggcastexam.accounts.username, ggcastexam.accounts.password" +
                    " FROM ggcastexam.facilitator" +
                    " INNER JOIN ggcastexam.accounts ON ggcastexam.accounts.id = ggcastexam.facilitator.accountid" +
                    " UNION" +
                    " SELECT ggcastexam.registration.id, 'students' as accounttype," +
                    " firstname, lastname, ggcastexam.accounts.username, ggcastexam.accounts.password" +
                    " FROM ggcastexam.registration" +
                    " INNER JOIN ggcastexam.accounts ON ggcastexam.accounts.id = ggcastexam.registration.accountid"
        mysqlDB.sqlCommand(sql).then( (result) => {
            resolve(result)
        })
    })

    users = await promise    
})