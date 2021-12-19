const express = require('express')
const routes = express.Router()
const dateFormat = require('date-and-time')
const {v1: guid} = require('uuid')

/* Custom Made Libraries */
const MysqlDB = require('./../models/database/mysqldb')


routes.get('/', checkAuthenticated, (req, res) => {
    // Get All facilitator account   
    MysqlDB.sqlCommand("SELECT * FROM facilitator ORDER BY updateddate DESC").then( (result) => {
        res.render('dashboard', {title: 'GGCAST EXAM - Dashboard', data: result, user: req.user})
    })
})


/**
 * POST API for adding and deleting of account and setting up login credentials
 * ----------------------------------------------------------------------------------------
 */
routes.post('/addfacilitator', (req, res) => {
    // Add Facilitator Data in the Database
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let createddate = dateFormat.format(new Date(), 'YYYY/MM/DD HH:mm:ss')
    let updteddate = dateFormat.format(new Date(), 'YYYY/MM/DD HH:mm:ss')
    let id = guid()

    let sql = "INSERT INTO facilitator(id, firstname, lastname, createddate, updateddate)"
    sql += " VALUES('" + id + "', '" + firstname +"', '" + lastname + "', '" + createddate + "', '" + updteddate + "')"

    MysqlDB.sqlCommand(sql).then( (result) => {
        let jsonResult = null

        if ( result.serverStatus == 2 && result.affectedRows == 1 ) {
            jsonResult = {
                code: 0,
                message: 'New facilitator is successfully added!'
            }
        } else {
            jsonResult = {
                code: -1,
                message: 'Error adding new facilitator!'
            }
        }
        res.json(jsonResult)
    })
})

routes.post('/getallfacilitator', (req, res) => {
    MysqlDB.sqlCommand("SELECT * FROM facilitator ORDER BY updateddate DESC").then( (result) => {
        res.json({data: result})
    });
})

function checkAuthenticated(req, res, next) {
    if ( req.isAuthenticated() ) {
        // Authorization
        return next()
    } else {
        res.redirect('/')
    }
}

module.exports = routes