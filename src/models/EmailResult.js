const mongoose = require('mongoose')

const emailResultSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    result: {
        type: String,
    },
    reason: {
        type: String,
    },
    id: {
        type: String,
    },
})

const Lists = mongoose.model('EmailResult', emailResultSchema)

module.exports = Lists
