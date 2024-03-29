const mysqlCmd = require('./database/mysqldb')

const searchStudents = async ( searchtext ) => {
    let sql = "SELECT * FROM students " +
              "WHERE MATCH(code, firstname, lastname, middlename) " +
              "AGAINST ('" + searchtext + "' IN NATURAL LANGUAGE MODE) "
              "ORDER BY lastname, firstname, middlename ASC LIMIT 0, 5"
              
    let _promise = new Promise( (resolve) => {
        mysqlCmd.sqlCommand(sql).then( (rows) => {
            resolve(rows)
        })
    })

    return await _promise
}

const getAllStudents = async () => {
    let _sql = "SELECT code, firstname, lastname, middlename FROM students " +
              "ORDER BY lastname, firstname, middlename ASC"
              
    let _promise = new Promise( (resolve) => {
        mysqlCmd.sqlCommand(_sql).then( (rows) => {
            resolve(rows)
        })
    })

    return await _promise
}

module.exports = {
    searchStudents,
    getAllStudents
}