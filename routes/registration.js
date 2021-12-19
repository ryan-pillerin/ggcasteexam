const express = require('express')
const routes = express.Router()
const MySQLDB = require('./../models/database/mysqldb')

routes.get('/', checkAuthenticated, (req, res) => {
    res.render('registration', {title: 'Register'})
})

routes.post('/registerstudent', checkAuthenticated, (req, res) => {

    let desiredcourse = req.body.desiredcourse
    console.log(req.body)
    console.log(req.user.id)

    MySQLDB.sqlCommand(sql).then( (result) => {
        res.redirect('/dashboard')
    })

    res.send(desiredcourse)

})

function checkAuthenticated(req, res, next) {
    if ( req.isAuthenticated() ) {
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = routes