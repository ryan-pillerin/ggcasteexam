const express = require('express')
const routes = express.Router()
const enrollment = require('./../models/enrollment')

routes.get('/', (req, res) => {
    
    res.render('enrollment', {
        title: 'GGCAST - Online Enrollment Form', 
        page: 'enrollment',
        pageTitle: 'Enrollment'
    })
})

routes.post('/searchstudents', (req, res) => {
    let searchtext = req.body.searchtext
    
    enrollment.searchStudents(searchtext).then( (rows) => {
        res.json({
            data: rows
        })
    })
})

module.exports = routes