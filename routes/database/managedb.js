const express = require('express')
const routes = express.Router()
const {v1: guid} = require('uuid')
const mysqlDB = require('./../../models/database/mysqldb')

//manageDB().setDBCredentials('192.168.2.14', 'root', 'moth34board')

routes.get('/', (req, res) => {
    res.render('managedb', {title: 'Manage MySQL DB'})
})

routes.post('/addfacilitator', (req, res) => {
    // Add Facilitator Data in the Database

    res.json({
        message: 'success'
    })
    
})

module.exports = routes