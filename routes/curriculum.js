const express = require('express')
const routes = express.Router()
const curriculaModel = require('./../models/curriculum/curricula')
const subjectModel = require('./../models/curriculum/subjects')

routes.get('/', checkAuthenticated, async (req, res) => {
    /**
     * Get All Programs
     */

    let _promise = new Promise( (resolve, reject) => {
        curriculaModel.getAllPrograms().then( (rows) => {
            resolve(rows)
        })
    })

    let _programData = await _promise
    _promise = null

    _promise = new Promise( (resolve, reject) => {
        subjectModel.getAllSubjects().then( (rows) => {
            resolve(rows)
        })
    })

    let _subjectData = await _promise

    res.render('curriculum', {
        title: 'GGCAST Curriculum Setup', 
        page: 'curriculum',
        pageTitle: 'Curricula',
        user: req.user,
        programs: _programData,
        subjects: _subjectData
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