const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: String,
  species: String,
  age: Number,
  personality: String,
  mood: {
    type: String,
    default: 'Happy' 
  },
  adopted: {
    type: Boolean,
    default: false
  },
  adoption_date: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Pet', petSchema);


