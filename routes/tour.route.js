const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour.controller');

router.route('/')
    .get(tourController.getTours)
    .post(tourController.postTour)

router.route("/:id")
    .get(tourController.getTourDetails)
    .patch(tourController.updateTourInfoById)

router.route("/tour/trending")
    .get(tourController.getTourTrending)

router.route("/tour/cheapest")
    .get(tourController.getCheapestTour)

module.exports = router;