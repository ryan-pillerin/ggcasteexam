const express = require('express')
const routes = express.Router()
const MySQLDB = require('./../models/database/mysqldb')
const {v1: guid} = require('uuid')
const dateFormat = require('date-and-time')


routes.get('/', (req, res) => {
    res.render('cor', {
        title: 'Certificate of Registration',
        page: "COR",
        pageTitle: "Certificate of Registration",
        user: req.user
    })
})

routes.post('/registerstudent', (req, res) => {


})

module.exports = routes

