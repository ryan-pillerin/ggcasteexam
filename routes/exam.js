const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('exam', {title: 'GGCAST Entrance Exam'})
})

module.exports = routes