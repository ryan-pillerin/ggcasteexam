const express = require('express')
const routes = express.Router()
const enroll = require('./../models/enrollment')

routes.get('/', checkAuthenticated, async (req, res) => {

    let _promise = new Promise( (resolve, reject) => {
        enroll.getAllStudents().then( (rows) => {
            resolve(rows)
        })
    })

    let _studentsData = await _promise

    res.render('enroll', {
        title: 'Enrollment', 
        page: 'enrollment',
        pageTitle: 'Enrollment',
        user: req.user,
        students: _studentsData
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