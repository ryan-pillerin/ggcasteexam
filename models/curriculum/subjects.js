const MYSqlDB = require('./../database/mysqldb')
const {v1: guid}  = require('uuid')
const formatDate = require('date-and-time')

const addSubject = async (
        code,
        title, 
        description,
        lecunits,
        labunits,
        userid
    ) => {
    let id = guid()
    let lec = lecunits
    let lab = labunits
    let dateCreated = formatDate.format(new Date(), "YYYY-MM-DD hh:mm:ss")

    let sql = "INSERT INTO subjects(id, code, subject, description, " +
              "unitslab, unitslec, status, createdby, updatedby, " +
              "createddate, updateddate) VALUES('" + id + "', '" + code + "', " +
              "'" + title + "', '" + description + "', '" + lab + "', '" + lec + "', " +
              "0, '" + userid + "', '" + userid + "', '" + dateCreated + "', '" + dateCreated + "')"

    let _promise = new Promise( (resolve) => {
        MYSqlDB.sqlCommand(sql).then( (rows) => {
            resolve(rows)
        })
    })

    return await _promise
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