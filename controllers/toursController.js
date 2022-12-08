const fs = require('fs');
const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );
//middleware to check id:

exports.idChecker = (req, res, next, val) => {
  return res.status(404).json({
    status: 'fail',
    message: 'ID not Valid',
  });

  next();
};
/* middleware to check if body contains name and price props */
exports.bodyChecker = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Request Body has no price or name',
    });
  }
  next();
};

/* functions for routes */
//get tours data from tours-simple file :

exports.getAllTours = (req, res) => {
  console.log(req.reqTime);
  res.status(200).json({
    status: '200',
    time: req.reqTime,
    // data: {
    //   tours,
    // },
  });
};

//post tours data from tours-simple file :
exports.createTour = (req, res) => {
  //create new tour id:
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `./dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: "success",
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
};
//get tour by id route
exports.getTour = (req, res) => {
  // console.log(req.params);
  //to convert id string to number
  const id = req.params.id * 1;
  // const tour = tours.find((tour) => tour.id === id);
  // if (!tour) {
  //   return res.status(404).json({
  //     status: "Not Found",
  //     message: "Invalid id",
  //   });
  // }
  res.status(200).json({
    status: 'success',
    requestedAt: req.reqTime,
    // data: {
    //   tour,
    // },
  });
};

// UPDATE CERATIN PART OF DATA:

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<div>Data updated<div/>',
    },
  });
};
//DELETE BY ID:

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
