const mongoose = require('mongoose')

const youtuberSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    youtubedToChannel:{
        type: String,
        required: true
    },
    youtubedDate:{
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports =mongoose.model('Youtuber',youtuberSchema)