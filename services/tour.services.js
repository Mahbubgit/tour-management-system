const Tour = require('../models/tour');

exports.getTourServices = async (filters, queries) => {

    const tours = await Tour.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);

    const totalTourPackage = await Tour.countDocuments(filters);
    const pageCount = Math.ceil(totalTourPackage/queries.limit);

    return { totalTourPackage, pageCount, tours };
}
