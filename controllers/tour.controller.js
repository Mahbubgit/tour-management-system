// const tour = require("../models/tour");
const { getTourServices  } = require("../services/tour.services")

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
