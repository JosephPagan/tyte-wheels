const mongoose = require('mongoose')

const KeepSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    keepStation: { type: String, required: true },
    stationName: { type: String, required: true },
    keepDate: { type: Date, default: Date.now },
    rideType: { type: String, required: true },
    wheelsImage: { type: String },
    duration: { type: String, default: null },
    keepPrice: { type: String, default: 0 },
    active: { type: Boolean, default: true }
})

module.exports = mongoose.model('Keep', KeepSchema)