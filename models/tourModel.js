const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a tour name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  rating: {
    type: Number,
    default: 4.2,
  },
});
/* create tour model out of schema */
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
