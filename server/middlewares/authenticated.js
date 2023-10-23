const jwt = require('../utils/jwt');

const asureAuth = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(403).send({ msg: 'La peticion no tiene la cabecera ' })
    }

    const token = req.headers.authorization.replace('Bearer', '')
    
    try{
        const payload = jwt.decoded(token)

        const { exp } = payload
        const currentData = new Date().getTime()

        // console.log('--------------------------------')
        // console.log(exp)
        // console.log(currentData)

        if(exp <= currentData){
            return res.status(400).send({ msg: 'El token ha caducado' })
        }

        req.user = payload
        next()

    } catch(error){
        return res.status(400).send({ msg: 'Token Invalido' })
    }

}

module.exports = {
    asureAuth
}