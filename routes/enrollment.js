const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('enrollment', {
        title: 'GGCAST - Online Enrollment Form', 
        page: 'enrollment',
        pageTitle: 'Enrollment'
    })
})

module.exports = routes