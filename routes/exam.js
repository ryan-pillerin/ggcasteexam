const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('exam', {title: 'GGCAST Entrance Exam', page: 'exam'})
})

module.exports = routes