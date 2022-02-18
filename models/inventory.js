let mongoose = require('mongoose');

// Create a model class
let inventoryModel = mongoose.Schema(
    {
        name: String,
        number: Number,
        email: String
    },
    {
        collection: "Contact"
    }
);

module.exports = mongoose.model('Contact', inventoryModel);