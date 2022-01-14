const express = require('express')
const routes = express.Router()
const MySQLDB = require('./../models/database/mysqldb')
const {v1: guid} = require('uuid')
const dateFormat = require('date-and-time')


routes.get('/', (req, res) => {
    res.render('registration', {
        title: 'Register',
        page: "Registration",
        pageTitle: "Registration",
        user: req.user
    })
})

routes.post('/registerstudent', (req, res) => {

    let id = guid()
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let middlename = req.body.middlename
    let province = req.body.province
    let municipality = req.body.municipality
    let barangay = req.body.barangay
    let emailadd = req.body.emailadd
    let mobilenumber = req.body.mobilenumber
    let createdby = guid()
    let updatedby = guid()
    let createddate = dateFormat.format(new Date(), 'YYYY-MM-DD hh:mm:ss')
    let updateddate = dateFormat.format(new Date(), 'YYYY-MM-DD hh:mm:ss')
    let accountid = guid()
    let desiredcourse = req.body.desiredcourse
    console.log(req.body)
    console.log(req.user.id)

    let sql = "INSERT INTO registration (id, firstname, lastname, middlename, province, municipalitycity, barangay, emailaddress, mobilenumber, createdby, updatedby, createddate, updateddate, accountid, desiredcourse)"
    sql += "VALUES ('" + id + "', '" + firstname + "', '"+ lastname +"', '"+ middlename +", '"+ province +"','"+ municipality +"','"+ barangay +"','"+ emailadd +"','"+ mobilenumber +"','"+ createdby +"', '"+ updatedby +"','"+ createddate +"','"+ updateddate +"''"+ accountid +"''"+ desiredcourse +"')"

    MySQLDB.sqlCommand(sql).then( (result) => {
        res.redirect('/dashboard')
    })

    res.send(desiredcourse)

})

module.exports = routes


