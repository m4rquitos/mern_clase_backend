const Course = require('../models/course.model')
const image = require('../utils/image')

//TODO Functions
async function createCourse(req, res){
    const course = new Course(req.body)

    const imagePath = image.getFilePath(req.files.miniature)
    course.miniature = imagePath

    course.save((error, courseStored) => {
        if(error){
            return res.status(400).send({ msg: 'Error al crear el curso' })
        }  else {
            return res.status(200).send(courseStored)
        }
    }) 

}

async function getCourse(req, res) {

    const { page = 1, limit = 10 } = req.query

    const options = {
        page: parseInt(page),
        limit: parseInt(limit)
    }

    Course.paginate({}, options, (error, courses) => {
        if(error){
            return res.status(400).send({ msg: 'Error al obtener los datos' })
        } else {
            return res.status(200).send(courses)
        }
    })
}

async function updateCourse(req, res) {
    const { id } = req.params
    const courseData = req.body

    if(req.files.miniature){
        const imagePath = image.getFilePath(req.files.miniature)
        courseData.miniature = imagePath
    }

    Course.findByIdAndUpdate({ _id: id }, courseData, (error) => {
        if(error){
            return res.status(400).send({ msg: 'Error al actualizar el curso' })
        } else {
            return res.status(200).send(courseData)
        }
    })
}

async function deleteCourse(req, res) {
    const { id } = req.params

    Course.findByIdAndDelete(id, (error) => {
        if(error){
            return res.status(400).send({ msg: 'Error al eliminar el curso' })
        } else {
            return res.status(200).send({ msg: 'Curso Eliminado' })
        }
    })
}

module.exports = {
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse
}
