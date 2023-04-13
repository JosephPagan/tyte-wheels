const mongoose = require('mongoose')

const KeepSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    keepDate: { type: Date, default: Date.now },
    wheelsImage: { type: String },
    duration: { type: String, default: null }
})

module.exports = mongoose.model('Keep', KeepSchema)