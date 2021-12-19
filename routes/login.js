const express = require('express')
const routes = express.Router()
const bcrypt = require('bcrypt')
const dateFormat = require('date-and-time')
const MySQLDB = require('./../models/database/mysqldb')
const {v1: guid} = require('uuid')
const passport = require('passport')

routes.get('/', checkNotAuthenticated, (req, res) => {
    res.render('login', {title: 'GGCAST Electronic Entrance Exam - Login'})
})

routes.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
}))

/**
 * Authenticate User
 */
routes.post('/registeraccount', async(req, res) => {
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let username = req.body.username
        let createdBy = req.body.createdby
        let createdDate = dateFormat.format(new Date, 'YYYY/MM/DD HH:mm:ss')
        let id = guid()

        let promise = new Promise( (resolve, reject) => {
            let sql = "INSERT INTO accounts(id, username, password, createdby, updatedby, createddate, updateddate) "
            sql += " VALUES('" + id + "', '" + username + "', '" + hashedPassword + "', '" + createdBy + "', '" + createdBy + "', '" + createdDate + "', '" + createdDate + "')"
            MySQLDB.sqlCommand(sql).then( (result) => {
                resolve(result)
            })
        })
        
        let result = await promise
        if ( result ) {
            res.redirect('/dashboard')
        }
    } catch {
        res.json({message: 'error'})
    }
})

function checkNotAuthenticated(req, res, next) {
    if ( req.isAuthenticated() ) {
        res.redirect('/dashboard')
    } else {
       next()
    }
}

module.exports = routes