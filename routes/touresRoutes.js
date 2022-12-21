const express = require('express');
const router = express.Router();

const toursController = require('../controllers/toursController');
//access param using param middleware:
// router.param("id", toursController.idChecker);

router.route('/tours-stat').get(toursController.getToursStat)
router.route('/monthly-plan/:year').get(toursController.getMonthlyPlan)

router.route('/top-cheap-tours')
  .get(toursController.aliasTopTours, toursController.getAllTours)
//refractor
router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);

router
  .route('/')
  .get(toursController.getAllTours)
  .post(toursController.createTour);

module.exports = router;
