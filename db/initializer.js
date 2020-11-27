const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;
const COLLECTION = process.env.COLLECTION;

const { Schema } = mongoose;
const millionRowsSchema = new Schema(
    {
        word: String,
        definition: String,
    },
    {
        collection: COLLECTION,
    }
);

exports.initializer = function () {
    mongoose.Promise = global.Promise;
    mongoose.set("debug", true);
    mongoose.connect(MONGODB_URI, {
        keepAlive: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });

    mongoose.model(COLLECTION, millionRowsSchema);
};
