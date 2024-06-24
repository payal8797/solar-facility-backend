const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nominalPower: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Facility', FacilitySchema);
