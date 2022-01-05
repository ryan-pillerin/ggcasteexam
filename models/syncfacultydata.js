const MySQL = require('mysql');
const {v1: guid} = require('uuid')
const dateFormat = require('date-and-time')

let config_srms = {
    host: '192.168.2.14',
    user: 'root',
    password: 'moth34board',
    database: 'itwebpor_ggcast'
}

let config_lms = {
    host: '192.168.2.14',
    user: 'root',
    password: 'moth34board',
    database: 'ggcastlms'
}

const syncDataFromSRMS = async () => {
    conn_srms = MySQL.createConnection(config_srms)
    conn_lms = MySQL.createConnection(config_lms)
    
    let srmsPromise = new Promise( (resolve, reject) => {
        conn_srms.connect( (err) => {
            if ( err ) {
                reject(err)
            } else {
                resolve(conn_srms)
            }
        })
    })

    conn_srms = await srmsPromise

    let queryPromise = new Promise ( (resolve, reject) => {
        conn_srms.query("SELECT IDNumber, FirstName, MiddleName, LastName FROM staff", (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
    
    let facultyRecords = await queryPromise

    let lmsPromise = null
    let sql = null

    lmsPromise = new Promise( (resolve, reject) => {
        conn_lms.connect( (err) => {
            if ( err ) {
                reject(err)
            } else {
                facultyRecords.forEach( (value, key) => {
                    let id = guid()
                    let dateNow = dateFormat.format(new Date(), 'YYYY-MM-DD hh-mm-ss')
                    sql = "INSERT INTO faculty(id, facultynumber, lastname, firstname, middlename, createddate, updateddate)"
                    sql += " VALUES('" + id + "','" + value.IDNumber + "', '" + value.LastName + "', '" + value.FirstName + "', '" + value.MiddleName + "', '" + dateNow + "', '" + dateNow + "') "
                    console.log(sql)
                    conn_lms.query(sql, (err, result) => {
                        if ( err ) {
                            reject(err)
                        } else {
                            resolve(result)
                        }
                    })
                })
            }
        })
    })

    console.log(await lmsPromise)
}

const syncStudentDataFromSRMS = async () => {
    conn_srms = MySQL.createConnection(config_srms)
    conn_lms = MySQL.createConnection(config_lms)

    let promiseSrms = new Promise( (resolve, reject) => {
        let sql = "SELECT * FROM itwebpor_ggcast.studeprofile"
        
        conn_srms.connect( (err) => {
            if ( err ) {
                reject(err)
            } else {
                conn_srms.query(sql, (err, rows) => {
                    resolve(rows)
                })
            }
        })
    })

    let studentData = await promiseSrms

    let lmsPromise = null
    let sql = null

    lmsPromise = new Promise( (resolve, reject) => {
        conn_lms.connect( (err) => {
            if ( err ) {
                reject(err)
            } else {
                // Insert Data into the database
                studentData.forEach( (value, key) => {
                    let id = guid()
                    let idNumber = value.StudentNumber
                    let firstname = value.FirstName
                    let lastname = value.LastName
                    let middlename = value.MiddleName
                    let gender = value.Sex
                    let civilstatus = value.CivilStatus
                    let birthplace = value.BirthPlace
                    let email = value.email
                    let mobilenumber = value.contactNo
                    let birthdate = dateFormat.format(value.birthDate, "YYYY-MM-DD")
                    let purokstreet = value.sitio
                    let municipalitycity = value.city
                    let province = value.province
                    let zipcode = ''
                    let graduationDate = value.graduationDate

                    sql = "INSERT INTO students(id, code, firstname, lastname, middlename, " +
                            "gender, civilstatus, birthplace, email, mobilenumber, birthdate, " +
                            "purokstreet, municipalitycity, province, zipcode, graduationDate) " +
                            "VALUE('" + id + "', '" + idNumber + "', '" + firstname + "', '" + lastname + "', " +
                            "'" + middlename + "', '" + gender + "', '" + civilstatus + "', '" + birthplace + "', " +
                            "'" + email + "', '" + mobilenumber + "', '" + birthdate + "', '" + purokstreet + "', " +
                            "'" + municipalitycity + "', '" + province + "', '" + zipcode + "', '" + graduationDate + "') "
                    conn_lms.query(sql, (err, rows) => {
                        //console.log(err)
                        console.log(value.StudentNumber + ': ' + rows.affectedRows + ' record/s added.')
                    })
                })
            }
        })
    })

}

module.exports = {
    syncDataFromSRMS,
    syncStudentDataFromSRMS
}