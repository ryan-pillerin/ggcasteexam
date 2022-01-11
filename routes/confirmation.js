const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('confirmation', {title: 'Confirmation'})
})

module.exports = routes