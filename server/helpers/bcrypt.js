const bcrypt = require("bcryptjs")

function hashPassword(password) {
    let hash = bcrypt.hashSync(password, 2)
    return hash
}

function compare(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = {
    hashPassword,
    compare
}