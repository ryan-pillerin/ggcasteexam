const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('managedb', {title: 'Manage MySQL DB'})
})

module.exports = routes