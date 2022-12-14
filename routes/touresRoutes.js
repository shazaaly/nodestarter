const express = require('express');
const router = express.Router();

const toursController = require('../controllers/toursController');
//access param using param middleware:
// router.param("id", toursController.idChecker);

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
