const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('registration', {title: 'Register'})
})

module.exports = routes