const LocalStrategy = require('passport-local').Strategy
const encryption = require('./encryption/aes256')

function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username)
        if ( user == null ) {
            return done(null, false, { message: 'No user with that username.'})
        }

        try {

            if ( encryption.decrypt(user.password) === password ) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Password Incorrect' })
            }
        } catch (e) {
            return done(e)
        }

    }

    passport.use( new LocalStrategy({ usernameField: 'username' },
    authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        done(null, getUserById(id))
    })
}

module.exports = initialize