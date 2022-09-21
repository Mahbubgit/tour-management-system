const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour.controller');
const viewCount = require('../middleware/viewCount');

router.route('/')
    .get(tourController.getTours)
    .post(tourController.postTour)

router.route("/:id")
    .get(viewCount, tourController.getTourDetails)
    .patch(tourController.updateTourInfoById)

router.route("/tour/trending")
    .get(tourController.getTourTrending)

router.route("/tour/cheapest")
    .get(tourController.getCheapestTour)
    
module.exports = router;