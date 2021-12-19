const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('login', {title: 'GGCAST Login'})
})

module.exports = routes