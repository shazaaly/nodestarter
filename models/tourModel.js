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
  maxGroupSize: {
    type: Number,
    required: [true, 'Please add group Size'],
  },
  difficulty: {
    type: String,
    required: [true, 'Please add difficulty'],
  },
  rating: {
    type: Number,
    default: 4.2,
  },
  ratingsAverage: {
    type: Number,
  },
  ratingsQuantity: {
    type: Number,
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: true

  },
  description: {
    type: String,
    trim: true
  },
  duration: Number,
  imageCover: String,
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
});


/* create tour model out of schema */
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
