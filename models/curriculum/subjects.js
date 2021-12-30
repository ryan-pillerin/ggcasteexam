const MYSqlDB = require('./../database/mysqldb')
const {v1: guid}  = require('uuid')
const formatDate = require('date-and-time')

const addSubject = ( {
    code,
    title, 
    description,
    units,
    userid
}) => {
    let id = guid()
    let lec = units.lec
    let lab = units.lab
    let dateCreated = formatDate.format(new Date(), "YYYY-MM-DD hh:mm:ss A")

    let sql = "INSERT INTO subjects(id, code, title, description, " +
              "unitslab, unitslec, status, createdby, updatedby, " +
              "createddate, updateddate) VALUES('" + id + "', '" + code + "', " +
              "'" + title + "', '" + description + "', '" + lab + "', '" + lec + "', " +
              "1, '" + userid + "', '" + userid + "', '" + dateCreated + "', '" + dateCreated + "')"

    let promise = new Promise( (resolve) => {
        
    })
}

const delSubject = (id) => {
    
}

const editSubject = ({
    id,
    code,
    title,
    description,
    units
}) => {
    let lec = units.lec
    let lab = units.lab
}

const getAllSubjects = async () => {
    
    let sql = "SELECT * FROM subjects"
    let promise = new Promise( (resolve) => {
        MYSqlDB.sqlCommand(sql).then( (rows) => {
            resolve(rows)
        })
    })

    return await promise

}

const changeSubjectStatus = ({
    id,
    status
}) => {

}

/**
 * All private code should be put here
 */
const _checkSubjectCodeDuplicate = ({
    code, title, description
}) => {
    let sql = "SELECT id FROM subjects WHERE code = '" + code + "' AND title = '" + title + "' AND " +
              " description = '" + description + "' "
        
}

module.exports = {
    addSubject,
    delSubject,
    editSubject,
    changeSubjectStatus,
    getAllSubjects
}