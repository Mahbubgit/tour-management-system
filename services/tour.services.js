const viewCount = require('../middleware/viewCount');
const Tour = require('../models/tour');

exports.getTourServices = async (filters, queries) => {

    const tours = await Tour.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy);

    const totalTourPackage = await Tour.countDocuments(filters);
    const pageCount = Math.ceil(totalTourPackage / queries.limit);

    return { totalTourPackage, pageCount, tours };
}

exports.postTourService = async (data) => {
    const tour = await Tour.create(data);
    return tour;
}

exports.viewTourByIdService = async (tourId) => {
    const result = await Tour.findById(tourId);
    return result;
}

exports.updateTourInfoByIdService = async (tourId, data) => {
    const result = await Tour.updateOne({ _id: tourId }, { $set: data }, {
        runValidators: true
    });
    return result;
}

exports.viewTourTrendService = async () => {
    const result = await Tour.find().sort({ view: -1 }).limit(3);
    return result;
}

exports.viewCheapestTourService = async () => {
    const result = await Tour.find().sort({ price: 1 }).limit(3);
    return result;
}
