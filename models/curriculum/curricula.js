const MYSqlDB = require('./../database/mysqldb')
const {v1: guid}  = require('uuid')
const formatDate = require('date-and-time')

const addCurriculum = async (
    programid,
    yearlevel,
    curriculumDetails
) => {
    let _sql = null
    let currentMonth = formatDate.format(new Date(), 'MM')
    let semester = 0

    let _promise = new Promise( (resolve, reject) => {
        // Check if the current date belongs to a certain semester
        if ( currentMonth >= 1 && currentMonth < 6 ) {
            semester = '2nd Semester'
        } else if ( currentMonth >= 6 && currentMonth <= 7 ) {
            semester = 'Summer'
        } else {
            semester = '1st Semester'
        }

    })

    /*let _curriculumDetails = {
        id: guid(),
        programid: programid,
        semester: semester,
        yearlevel: yearlevel,
        effectivitydate: formatDate.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
        status: 1,
        createdby: '6b2572f6-6243-11ec-a1e9-1793120ac5d7',
        updatedby: '6b2572f6-6243-11ec-a1e9-1793120ac5d7',
        createddate: formatDate.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
        updateddate: formatDate.format(new Date(), 'YYYY-MM-DD hh:mm:ss'),
        curriculumDetails: [
            {
                id: guid(),
                courseid: '0413cdb6-7521-11ec-9819-83a9d413af23',
                prerequisiteid: '041665c2-7521-11ec-9819-83a9d413af23'
            },
            {
                id: guid(),
                courseid: '0413cdb5-7521-11ec-9819-83a9d413af23',
                prerequisiteid: '041665c2-7521-11ec-9819-83a9d413af23'
            },
            {
                id: guid(),
                courseid: '0415f08b-7521-11ec-9819-83a9d413af23',
                prerequisiteid: ''
            },
            {
                id: guid(),
                courseid: '0413cdb0-7521-11ec-9819-83a9d413af23',
                prerequisiteid: ''
            },
            {
                id: guid(),
                courseid: '0413f4bc-7521-11ec-9819-83a9d413af23',
                prerequisiteid: ''
            },
            {
                id: guid(),
                courseid: '041442dd-7521-11ec-9819-83a9d413af23',
                prerequisiteid: ''
            },
            {
                id: guid(),
                courseid: '041665b0-7521-11ec-9819-83a9d413af23',
                prerequisiteid: ''
            },
            {
                id: guid(),
                courseid: '04102427-7521-11ec-9819-83a9d413af23',
                prerequisiteid: ''
            },
            {
                id: guid(),
                courseid: '04161790-7521-11ec-9819-83a9d413af23',
                prerequisiteid: ''
            }
        ]
    }*/

}

const autoAddAcademicYearandSemester = async () => {

    /**
     * Get the current date while check in the database
     * what is the current academic year.
     */

    let year = formatDate.format(new Date(), 'YYYY')
    let month = formatDate.format(new Date(), 'MM')
    let _yearStart = 0
    let _yearEnd = 0

    if ( month < 8 ) {
        _yearStart = year - 1
        _yearEnd = year
    } else {
        _yearStart = year
        _yearEnd = year + 1 
    }
 
    /**
     * Save Academic Year in the database, then the semester
     * verify if academic year already exists
     */
    let _sql = null
    let _promise = new Promise( (resolve, reject) => {
        _sql = `SELECT * FROM academicyear WHERE yearstart = ${_yearStart} AND yearend = ${_yearEnd}`
        MYSqlDB.sqlCommand(_sql).then( (rows) => {
            resolve(rows)
        })
    })

    let _data = await _promise
    _promise = null
    let id = guid()
    _sql = null

    if ( _data.length == 0 ) {
        // Add Academic Year
        _sql = `INSERT INTO academicyear(id, yearstart, yearend) VALUES('${id}', ${_yearStart}, ${_yearEnd})`
        _promise = new Promise( (resolve, reject) => {
            MYSqlDB.sqlCommand(_sql).then( (rows) => {
                resolve(rows)
            })
        })
    }

}

const getAllPrograms = async () => {

    let _sql = null
    let _promise = null

    _promise = new Promise( (resolve, reject) => {
        _sql = "SELECT * FROM programs"
        MYSqlDB.sqlCommand(_sql).then( (rows) => {
            resolve(rows)
        })
    })

    return await _promise

}

module.exports = {
    addCurriculum,
    autoAddAcademicYearandSemester,
    getAllPrograms
}