const mongoose = require('mongoose');

const solarDataSchema = new mongoose.Schema({
    facility: String,
    timestamp: Date,
    activePower: Number,
    energy: Number,
  });
  
  module.exports = mongoose.model('SolarData', solarDataSchema);