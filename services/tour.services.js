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

exports.postTourService = async (data) => {
    const tour = await Tour.create(data);
    return tour;
}
