const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const CourseSchema = mongoose.Schema({
    title: String,
    miniature: String,
    descriptcion: String,
    url: String,
    price: Number,
    score: Number
})

CourseSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Course', CourseSchema)