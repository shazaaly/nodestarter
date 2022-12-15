const fs = require('fs');
const Tour = require('../models/tourModel');

/* functions for routes */
exports.getAllTours = async (req, res) => {
  try {
    /*console.log(req.query) ==== > object */
    const queryObj = { ...req.query }
    const exclude = ['page', 'limit', 'fields', 'sort']
    exclude.forEach(el => delete queryObj[el])
    let queryString = JSON.stringify(queryObj)
    // console.log(queryString)
    queryString = queryString.replace(/\b(gte|ge|le|lte)\b/g, match => `$${match}`)

    let query = Tour.find(JSON.parse(queryString))
    // console.log(JSON.parse(queryString));
    if (req.query.sort) {
      let sortBy = req.query.sort.split(',').join(' ')
      // console.log(sortBy)
      query = query.sort(sortBy)

    } else {
      query = query.sort('-createdAt')

    }



    const tours = await query


  } catch (Error) {
    console.log(Error.message)

  }

}

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    return res.status(201).json({
      status: 'successful',
      data: {
        tour: newTour,
      },
    });
  } catch (Error) {
    res.status(400).json({
      status: 'fail',
      message: Error.message,
    });
  }
};

//get tour by id route
exports.getTour = async (req, res) => {
  try {
    const id = req.params.id;
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (Error) {
    res.status(404).json({
      status: 'fail',
      message: Error.message,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (Error) {
    res.status(404).json({
      status: 'fail',
      message: Error.message,
    });
  }
};

//DELETE BY ID:

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (Error) {
    res.status(404).json({
      status: 'fail',
      message: Error.message,
    });
  }
};
