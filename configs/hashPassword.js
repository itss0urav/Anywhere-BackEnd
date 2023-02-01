const bcrypt = require('bcrypt')

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
}

const verifyPassword = async (password, fetchedPassword) => {
    const validate = await bcrypt.compare(password, fetchedPassword)

    const returnVal = validate ? true : false

    return returnVal

}

module.exports = { hashPassword, verifyPassword }