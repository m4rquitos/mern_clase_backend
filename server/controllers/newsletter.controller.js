const Newsletter = require('../models/newsletter.model')

//TODO Functions

function suscribeEmail(req, res){
    const { email } = req.body

    if(!email) return res.status(400).send({ msg: 'Email es obligatorio' })

    const newsletter = new Newsletter({
        email: email.toLowerCase()
    })

    newsletter.save((error) => {
        if(error){
            return res.status(400).send({ msg: 'El email ya esta registrado' })
        } else {
            res.status(200).send({ msg: 'Email registrado con exito' })
        }
    })
}

function getEmails(req, res){
    const { page = 1, limit = 5 } = req.query

    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    }

    Newsletter.paginate({}, options, (error, emailStored) => {
        if(error){
            return res.status(400).send({ msg: 'Error al obtener los email' })
        } else {
            return res.status(200).send(emailStored)
        }
    })

}

function deleteEmail(req, res){
    const { id } = req.params

    Newsletter.findByIdAndDelete(id, (error) => {
        if(error){
            return res.status(400).send({ msg: 'Error al eliminar los email'} )
        } else {
            return res.status(200).send({ msg: 'Eliminacion correcta' })
        }
    })
}

module.exports = {
    suscribeEmail,
    getEmails,
    deleteEmail
}