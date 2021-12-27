const express = require('express')
const routes = express.Router()
const passport = require('passport')

routes.get('/', checkNotAuthenticated, (req, res) => {
    res.render('login', {
        title: 'GGCAST Electronic Entrance Exam - Login',
        page: 'login',
        pageTitle: 'Login'
    })
})

routes.post('/loginaccount', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

function checkNotAuthenticated(req, res, next) {
    if ( req.isAuthenticated() ) {
        res.redirect('/')
    } else {
       next()
    }
}

module.exports = routes