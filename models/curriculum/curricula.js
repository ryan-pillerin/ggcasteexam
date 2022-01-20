const MYSqlDB = require('./../database/mysqldb')
const {v1: guid}  = require('uuid')
const formatDate = require('date-and-time')

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

/**
 * Program Management
 */
const addProgram = async (code, program, major, numberofyears, userid ) => {
    /**
     * Check if the code, program, major, and effectivity date already exists
     */
    
    let _sql = `SELECT id FROM programs WHERE code = '${code}' AND program = '${program}'
        AND major = '${major}'`
    let _promise = new Promise( (resolve, reject) => {
        try {
            MYSqlDB.sqlCommand(_sql).then( (rows) => {
                if ( rows.length == 0 ) {
                    // Add the new program in the database
                    let id = guid()
                    let saveDate = formatDate.format(new Date(), 'YYYY-MM-DD hh:mm:ss')
                    _sql = `INSERT INTO programs(id, code, program, major, numberofyears, createdby,
                        createddate, updatedby, updateddate) VALUES('${id}', '${code}', '${program}', 
                        '${major}', ${numberofyears}, '${userid}', '${saveDate}', '${userid}', '${saveDate}')`
                    MYSqlDB.sqlCommand(_sql).then( (rows) => {
                        resolve(rows)
                    })
                } else {
                    // Return an error massage saying that the program already exists
                    resolve(rows)
                }
            })
        } catch (err) {
            reject(err)
        }
    })

    return await _promise
}

const setupCurriculum = (programid) => {

    let curriculum = {
        programid: '',
        effectivitydate: ''
    }

    return curriculum
}

module.exports = {
    autoAddAcademicYearandSemester,
    getAllPrograms,
    addProgram
}