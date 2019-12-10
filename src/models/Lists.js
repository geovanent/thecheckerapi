const mongoose = require('mongoose')

const listsSchema = mongoose.Schema({
    lists:[{
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
        },
        stats: {
            member_count: {
                type: Number
            }
        }
    }],
})

const Lists = mongoose.model('Lists', listsSchema)

module.exports = Lists