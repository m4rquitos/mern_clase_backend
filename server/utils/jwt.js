const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../constants')


const createAccesssToken = (user) => {
    const expirationTokenn = new Date()
    expirationTokenn.setHours(expirationTokenn.getHours() + 3)

    const payload = {
        token_type: 'access',
        user_id: user._id,
        iat: Date.now(),
        exp: expirationTokenn.getTime()
    }

    return jwt.sign(payload, JWT_SECRET_KEY)
}

const createRefreshToken = (user) => {
    const expirationToken = new Date()
    expirationToken.getMonth(expirationToken.getMonth() + 1)

    const  payload = {
        token_type: 'refresh',
        user_id: user._id,
        iat: Date.now(),
        exp: expirationToken.getTime()
    }
    return jwt.sign(payload, JWT_SECRET_KEY)
}

function decoded(token){
    return (jwt.decode(token, JWT_SECRET_KEY, true))
}



module.exports = {
    createAccesssToken,
    createRefreshToken,
    decoded
}