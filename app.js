const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const facultyModel = require('./models/manageaccount/faculty')
const cron = require('node-cron')
const dateFormat = require('date-and-time')
//const syncData = require('./models/syncfacultydata')

const app = express()

// Passport
const initializePassport = require('./models/passport-config')
initializePassport(
    passport, 
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)   

let users = []
facultyModel.getAllFacultyData().then( (results) => {
    users = results   
})

// Routes
const managedbRoute = require('./routes/database/managedb')
const examRoute = require('./routes/exam')
const dashboardRoute = require('./routes/dashboard')
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/registration')

const indexRoute = require('./routes/index')
const manageAccountRoute = require('./routes/manageaccount')
const curriculumRoute = require('./routes/curriculum')
const subjectsRoute = require('./routes/subjects')
const enrollmentRoute = require('./routes/enrollment')
const settingsRoute = require('./routes/settings')

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/bootstrap', express.static(__dirname + 'public/bootstrap'))
app.use('/libraries', express.static(__dirname + 'public/libraries'))

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

app.use('/', indexRoute)
app.use('/settings', settingsRoute)
app.use('/manageaccount', manageAccountRoute)
app.use('/curriculum', curriculumRoute)
app.use('/subjects', subjectsRoute)
app.use('/enrollment', enrollmentRoute)

app.use('/managedb', managedbRoute)
app.use('/exam', examRoute)
app.use('/dashboard', dashboardRoute)
app.use('/login', loginRoute)
app.use('/registration', registerRoute)


//const testModule = require('./models/manageaccount/faculty')
//const syncData = require('./models/syncfacultydata')

// Cron Jeb Execution*/
let task = cron.schedule('0 */4 * * *', async () => {
    let cronDate = dateFormat.format(new Date(), 'MM/DD/YYYY - hh:mm:ss A')
    console.log(cronDate + ": Updating the user's list for login...")
    facultyModel.getAllFacultyData().then( (results) => {
        users = results
        console.log(cronDate + ": User's list successfully updated!")   
    })
});

app.listen(3000, async() => {
    console.log("----------------------------------------------")
    console.log("GGCAST Electronic Exam Server is running!")
    console.log("----------------------------------------------")
    /*
    console.log(encryption.encrypt('admin'))
    console.log(guid())
    console.log(dateFormat.format(new Date(), 'YYYY/MM/DD HH:mm:ss'))
    */
    //syncData.syncDataFromSRMS()
    //console.log(testModule.getAllFacultyData())
    task.start()
    //syncData.syncStudentDataFromSRMS()
})