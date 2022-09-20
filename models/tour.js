const mongoose = require('mongoose');

// schema design
const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this tour package."],
        trim: true,
        unique: [true, "Name must be unique."],
        minLength: [5, "Name must be at least 5 characters."],
        maxLength: [100, "Name is too large."],
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    features: {
        type: String,
        default: "Free pickup and drop facility, Free professional guide",
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative."],
    },
    image: {
        type: String,
        required: [true, "Please provide an image URL for this tour package."],
    },
}, {
    timestamps: true,
}
)

tourSchema.methods.logger = function () {
    console.log(`Data saved for ${this.name}`);
}

const tour = mongoose.model('tour', tourSchema)

module.exports = tour;