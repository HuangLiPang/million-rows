const mongoose = require("mongoose");
const mongoURI = require("../config/constants").mongoURI;

const { Schema } = mongoose;
const millionRowsSchema = new Schema(
    {
        word: String,
        definition: String,
    },
    {
        collection: "million-rows",
    }
);

exports.initializer = function () {
    mongoose.Promise = global.Promise;
    mongoose.set("debug", true);
    mongoose.connect(mongoURI, {
        keepAlive: true,
        reconnectTries: Number.MAX_VALUE,
        useMongoClient: true,
    });

    mongoose.model("million-rows", millionRowsSchema);
};
