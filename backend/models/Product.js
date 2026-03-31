const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a product title'],
            trim: true,
        },
        tag: {
            type: String,
            required: [true, 'Please add a category tag (e.g. ABSTRACT, ORIGINAL)'],
            trim: true,
            uppercase: true,
        },
        price: {
            type: Number,
            required: [true, 'Please add a product price'],
            min: [0, 'Price must be a positive number'],
        },
        image: {
            type: String,
            required: [true, 'Please provide an image URL'],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Product', productSchema);
