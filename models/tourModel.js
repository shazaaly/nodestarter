const mongoose = require('mongoose');
const slugify = require('slugify')
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a tour name'],
    unique: true,
  },
  slug: String,
  secretTour: {
    type: Boolean,
    default: false


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
    default: Date.now(),
    select: false
  },
  startDates: [Date]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

/* document middleware run before saving/creting document
so we need to create a new tour to run this */

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });  /* this = document */
  next()
})

tourSchema.post('save', function (doc, next) {
  // console.log(doc);
  next();
})
tourSchema.virtual('durationInWeeks').get(function () {
  return this.duration / 7
})

/* QUERY MIDDLEWARE */
/* will run on get tour/:id */
tourSchema.pre('find', function (next) {
  console.log('this is a secret tour....');

  next();
})

/* create tour model out of schema */
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
