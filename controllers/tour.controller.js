const { ObjectId } = require("mongodb");
// const { getDb } = require("../utility/dbConnect");

const { getTourServices, postTourService, viewTourByIdService, updateTourInfoByIdService, viewTourTrendService, viewCheapestTourService } = require("../services/tour.services")

exports.getTours = async (req, res, next) => {
    try {

        console.log(req.query);

        let filters = { ...req.query };

        // sort, page, limit --> exclude
        const excludeFields = ['sort', 'page', 'limit'];
        excludeFields.forEach(field => delete filters[field]);

        // Filter (gt, lt, gte, lte) and added $ sign before (gt, lt, gte, lte)
        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        filters = JSON.parse(filtersString);

        // For Query with Sorting //
        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
            // console.log(sortBy);
        }
        // End of Query with Sorting //

        // Query by Fields(show data by column name) //
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
            // console.log(fields);
        }

        if (req.query.page) {
            const { page = 1, limit = 5 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
            console.log(queries.skip, queries.limit);
        }

        const tours = await getTourServices(filters, queries);
        res.status(200).json({
            status: "success",
            data: tours
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the data",
            error: error.message,
        })
    }
}

exports.postTour = async (req, res, next) => {
    try {
        const result = await postTourService(req.body);

        result.logger();

        res.status(200).json({
            status: 'success',
            message: 'Data inserted successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not inserted',
            error: error.message
        })
    }
}

module.exports.getTourDetails = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Please provide a valid tour id!" });
        }

        const tour = await viewTourByIdService(id, req.body);

        if (!tour) {
            return res.status(400).json({ success: false, error: "Couldn't find a tour package with this id." });
        }

        res.status(200).json({ success: true, data: tour });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get the data.",
            error: error.message,
        })

    }
};

exports.updateTourInfoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateTourInfoByIdService(id, req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully updated the tour information."
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't update the tour information",
            error: error.message
        })
    }
}


module.exports.getTourTrending = async (req, res, next) => {
    try {

        const tourTrend = await viewTourTrendService(req.body);

        res.status(200).json({ success: true, data: tourTrend });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get tour trending data.",
            error: error.message,
        })

    }
};

module.exports.getCheapestTour = async (req, res, next) => {
    try {

        const cheapestTour = await viewCheapestTourService(req.body);

        res.status(200).json({ success: true, data: cheapestTour });

    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Can't get cheapest tour data.",
            error: error.message,
        })

    }
};
