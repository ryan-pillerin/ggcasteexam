const express = require('express')
const routes = express.Router()

routes.get('/', checkAuthenticated, (req, res) => {
    res.render('enroll', {
        title: 'Course Form', 
        page: 'courseform',
        pageTitle: 'Course Form',
        user: req.user
    })
})

function checkAuthenticated(req, res, next) {
    if ( req.isAuthenticated() ) {
        return next()
    } else {
        res.redirect('/login')
    }
}

module.exports = routes