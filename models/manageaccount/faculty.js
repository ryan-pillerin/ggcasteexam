const MySQLDB = require('./../database/mysqldb')
const dateFormat = require('date-and-time')
const {v1: guid} = require('uuid')
const encryption = require('./../encryption/aes256')

const getAllFacultyData = async () => {

    /**
     * Retrieve all Faculty data under GGCAST lms database
     * -----------------------------------------------------
     */
    // console.log('Start Retrieving Data...')
    
    let promise = new Promise( (resolve) => {
        let sql = 'SELECT accounts.id, accounts.username, accounts.password, ' +
                  'faculty.facultynumber, faculty.firstname, faculty.lastname ' +
                  'FROM accounts INNER JOIN faculty ' +
                  'ON accounts.id = faculty.accountid '
        MySQLDB.sqlCommand(sql).then( (results) => {
            resolve(results)
        })
    })
    let data = await promise    
    return data

}

const addAccountToFaculty = async (facultyid, username, password) => {
    let createdDate = dateFormat.format(new Date(), 'YYYY-MM-DD hh:mm:ss')
    let updatedDate = createdDate
    let id = guid()
    let encryptedPassword = encryption.encrypt(password)

    let promise = new Promise( (resolve) => {
        let sql = "INSERT INTO accounts(id, username, password, createddate, updateddate)"
        sql += " VALUES('" + id + "', '" + username + "', '" + encryptedPassword + "', '" + createdDate + "', '" + updatedDate + "')"

        MySQLDB.sqlCommand(sql).then( (result) => {
            resolve(result)
        })
    })
    
    let row = await promise
    if ( row.affectedRows > 0 ) {
        // Link the Account to faculty account
        promise = null
        promise = new Promise( (resolve) => {
            sql = "UPDATE faculty SET accountid = '" + id + "' WHERE id = '" + facultyid + "'"
            MySQLDB.sqlCommand(sql).then( (result) => {
                resolve(result)
            })
        })

        console.log(await promise)
    } 
}


module.exports = {
    getAllFacultyData,
    addAccountToFaculty
}