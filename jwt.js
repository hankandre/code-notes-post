const jwt = require('jsonwebtoken')
const { promisify } = require('bluebird')

exports.JsonWebTokenError = jwt.JsonWebTokenError
exports.NotBeforeError = jwt.NotBeforeError
exports.TokenExpiredError = jwt.TokenExpiredError
exports.decode = promisify(jwt.decode)
exports.sign = promisify(jwt.sign)
exports.verify = promisify(jwt.verify)
