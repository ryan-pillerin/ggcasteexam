const e = require('express');
const MySQL = require('mysql');
require('dotenv').config()

let config = {
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    password: process.env.PASS,
    database: process.env.DB
}

let _conn = null

const _connect = async () => {
    
    let myPromise = new Promise( (resolve) => {
        _conn = MySQL.createConnection(config)

        _conn.connect( (error) =>  {
            let result = null
            /**
             * -1 - Connection Error
             *  0 - Connected Successfully
             */
            if ( error ) {
                result = {
                    code: -1,
                    message: error.message
                }
            } else {
                result = {
                    code: 0,
                    message: 'MySQL connected successfully!',
                    conn: _conn
                }
            }
            resolve(result)
        })
    })
    
    return await myPromise
}

const sqlCommand = async ( sql ) => {

    let promise = new Promise( (resolve, reject) => {
        _connect().then( (result) => {
            let conn = result.conn
            conn.query(sql, (err, result) => {
                if (err) {
                    resolve(err)
                } else {
                    resolve(result)
                }
            })
        })
    })

    return await promise
    
}

module.exports = {
    sqlCommand
}