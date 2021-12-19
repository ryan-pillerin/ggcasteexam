const AES256 = require('aes256')

let _key = '7071cd94f1b27ac687aaa362087a0fdac4e321108a8f0b93d7ea5838603a766a'

const encrypt = (data) => {   
    return AES256.encrypt(_key, data)
}

const decrypt = (encryptedData) => {
    return AES256.decrypt(_key, encryptedData)
}

module.exports = {
    encrypt,
    decrypt
}