const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('settings', {title: 'Settings'})
})

module.exports = routes