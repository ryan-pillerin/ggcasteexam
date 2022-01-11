const express = require('express')
const routes = express.Router()
const faculty = require('./../models/manageaccount/faculty')

routes.get('/', async (req, res) => {

    // Retrieve Faculty Data
    let promise = new Promise( (resolve) => {
        resolve(faculty.getAllFacultyData())
    })

    res.render('manageaccount', {
        title: 'GGCAST eLMS: User Accounts',
        page: 'manageaccount',
        pageTitle: 'Manage Account',
    })
})

/**
 * Add new user account
 */
routes.post('/createaccount', async (req, res) => {

    let facultyid = req.body.facultyid
    let username = req.body.username
    let password = req.body.password

    let promise = new Promise( (resolve) => {
        faculty.addAccountToFaculty(facultyid, username, password).then( (result) => {
            resolve(result)
        })
    })

    res.redirect('/manageaccount')
})

module.exports = routes