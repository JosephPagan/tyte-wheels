const mongoose = require('mongoose')

const StationSchema = new mongoose.Schema({
    stationName: { type: String, required: true },
    zipCode: { type: String, required: true },
    capacity: { type: Number, required: true },
    keepCount: { type: Number, required: true, default: 0 },
})

module.exports = mongoose.model('Station', StationSchema)