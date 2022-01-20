const express = require('express')
const routes = express.Router()
const MySQLDB = require('./../models/database/mysqldb')
const {v1: guid} = require('uuid')
const dateFormat = require('date-and-time')


routes.get('/', (req, res) => {
    res.render('teachingload', {
        title: 'Teaching Load',
        page: "teachingload",
        pageTitle: "Teaching Load",
        user: req.user
    })
})



module.exports = routes