const express = require('express')
const routes = express.Router()

routes.get('/', checkAuthenticated, (req, res) => {
    res.render('curriculum', {
        title: 'GGCAST Curriculum Setup', 
        page: 'curriculum',
        pageTitle: 'Curriculum',
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