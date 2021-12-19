const express = require('express')
const routes = express.Router()
const dateFormat = require('date-and-time')

/* Custom Made Libraries */
const MysqlDB = require('./../models/database/mysqldb')


routes.get('/', (req, res) => {
    // Get All facilitator account
    MysqlDB.sqlCommand("SELECT * FROM facilitator").then( (result) => {
        res.render('dashboard', {title: 'GGCAST EXAM - Dashboard', data: result})
    })
})


/**
 * POST API for adding and deleting of account and setting up login credentials
 * ----------------------------------------------------------------------------------------
 */
routes.post('/addfacilitator', (req, res) => {
    // Add Facilitator Data in the Database

    res.json({
        message: 'success'
    })
    
})

routes.post('/deletefacilitator', (req, res) => {
    
})

module.exports = routes