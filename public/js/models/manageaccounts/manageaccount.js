export default class ManageAccount {
    
    constructor () {
        this.userAccount = []
    }

    addUserAccount = ({ facultyid, username, password }) => {

        /**
         * Add data into User Account Object then save the data into the database
         */
        this.userAccount.push({
            facultyid: facultyid,
            username: username,
            password: password
        })

        return this.userAccount
    }

}