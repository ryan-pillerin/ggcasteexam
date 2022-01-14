const express = require('express')
const routes = express.Router()
const subjects = require('./../models/curriculum/subjects')

routes.get('/', checkAuthenticated, async (req, res) => {
    /**
     * Retrieve all the subjects
     */
    let _promise = new Promise( (resolve) => {
        let data = subjects.getAllSubjects();
        resolve(data)
    });

    let results = await _promise

    res.render('subjects', {
        title: "GGCAST Subjects", 
        page: "subjects",
        pageTitle: "Subjects",
        user: req.user,
        data: results
    })
})

routes.post('/_addsubject', checkAuthenticated, (req, res) => {
    let data = req.body
    
    subjects.addSubject(
        data.code, 
        data.title, 
        data.description, 
        data.lecunits, 
        data.labunits, 
        req.user.id).then( (result) => {
            let _data = result
            if ( _data.errno ) {
                res.json({
                    code: 'error',
                    message: _data.sqlMessage
                })
            } else {
                res.json({
                    code: 'success',
                    message: 'The record was successfully added!'
                })
            }
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