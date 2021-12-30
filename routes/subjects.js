const express = require('express')
const routes = express.Router()

routes.get('/', checkAuthenticated, (req, res) => {
    res.render('subjects', {
        title: "GGCAST Subjects", 
        page: "subjects",
        pageTitle: "Subjects",
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