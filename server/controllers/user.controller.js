const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const image = require('../utils/image')


const getMe = async (req, res) => {
    const { user_id } = req.user
    const response = await User.findById(user_id)

    if(!response){
        res.status(200).send({ msg: 'No se ha encontrado el usuario' })
    } else {
        res.status(200).send(response)
    }

}

const getUsers = async (req, res) => {
    const { active } = req.query

    let response = null

    if(active === undefined) {
        response = await User.find()
    } else {
        response = await User.find({ active })
    }

    res.status(200).send({response})
}

const createUser = async (req, res) => {
    const { email, password } = req.body;

    // Verificar si ya existe un usuario con el mismo correo electrónico
    User.findOne({ email: email }, (error, existingUser) => {
        if (error) {
            return res.status(500).send({ msg: 'Error interno del servidor' });
        }

        // Si existe un usuario con el mismo correo electrónico, enviar una respuesta de error
        if (existingUser) {
            return res.status(400).send({ msg: 'Ya existe un usuario con este correo electrónico' });
        }

        // Si no existe un usuario con el mismo correo electrónico, crear uno nuevo
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = new User({ ...req.body, active: false, password: hashPassword });

        if (req.files.avatar) {
            const imagePath = image.getFilePath(req.files.avatar);
            user.avatar = imagePath
        }

        // Guardar el nuevo usuario en la base de datos
        user.save((saveError, userStored) => {
            if (saveError) {
                return res.status(400).send({ msg: 'Error al crear el usuario' });
            } else {
                return res.status(201).send(userStored);
            }
        });
    });
};

const updateUser = async (req, res) => {
    const { id } = req.params
    const userData = req.body

    // * Password

    if(userData.password){
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(userData.password, salt)
        userData.password = hashPassword
    } else {
        delete userData.password
    }

    // * avatar

    if(req.files.avatar){
        const imagePath = image.getFilePath(req.files.avatar)
        userData.avatar = imagePath
    }

    User.findByIdAndUpdate({ _id: id }, userData, (error) => {
        if(error){
            res.status(400).send({ msg: 'Error al actualizar el usuario' })
        } else {
            res.status(200).send({ msg: 'Datos de usuarios actualizados' })
        }
    })
    
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    User.findByIdAndDelete(id, (error) => {
        if(error){
            return res.status(400).send({ msg: 'Error al eliminar el usuario' })
        } else {
            return res.status(200).send({ msg: 'Usuario Eliminado' })
        }
    })
}

module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}