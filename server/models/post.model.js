const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const PostSchema = mongoose.Schema({
    title: String,
    miniature: String,
    content: String,
    path: {
        type: String,
        uniqued: true
    },
    create_at: Date
})

PostSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Post', PostSchema)
