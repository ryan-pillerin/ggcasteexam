const express = require('express')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')

const app = express()

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))

// Set Template Engine
app.use(expressLayouts)
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000, () => {
    console.log("Server is running...")
})