const fs = require('fs');
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/APIFeatures');


exports.getToursStat = async (req, res) => {
  try {
    const stat = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: '$difficulty',
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        },

      },
      {
        $sort: { avgPrice: 1 }
      }
    ])

    res.status(200).json({
      status: 'success',
      stat,
    })



  } catch (Error) {
    console.log(Error.message)

  }

}

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
// Filters the documents to pass only the documents that match 
// the specified condition(s) to the next pipeline stage.
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: { numTourStarts: -1 }
      },
      {
        $limit: 12
      }
    ]);

    res.status(200).json({
      status: 'success',

      data: {
        plan
      }
    })

  } catch (Error) {
    res.status(400).json({
      status: 'fail',
      message: Error.message,
    });
  }
}
  ;

/* functions for routes */
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5'
  req.query.sort = '-ratingsAverage,price'
  req.query.fields = 'name,price,summary,ratingsAverage'
  next();

}

exports.getAllTours = async (req, res) => {
  try {

    /*Query Excution */

    const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate()
    const tours = await features.query

    res.status(200).json({
      status: 'success',
      results: tours.length,
      tours,
    })


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
