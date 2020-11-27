const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

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

mongoose.Promise = global.Promise;
// mongoose.set("debug", true);
mongoose.connect(MONGODB_URI, {
    keepAlive: true,
    // reconnectTries: Number.MAX_VALUE,
    // useMongoClient: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

mongoose.model("million-rows", millionRowsSchema);

const MillionRows = mongoose.model("million-rows");

// let rawdata = fs.readFileSync("./data/dictionary.json");
// let dics = JSON.parse(rawdata);
// for (const word in dics) {
//     const dic = {
//         word: word,
//         definition: dics[word],
//     };
//     const item = new MillionRows(dic);
//     item.save();
// }
let i = 0;
let data = [];
fs.createReadStream("./data/urbandict-word-defs.csv")
    .pipe(csv())
    .on("data", async (row) => {
        let dic;
        if (row["word"] && row["definition"]) {
            dic = {
                word: row["word"],
                definition: row["definition"],
            };
        } else {
            dic = {
                word: row["1"],
                definition: row["5"],
            };
        }
        try {
            data.push(dic);
        } catch (err) {
            console.error(err);
        }
    })
    .on("end", () => {
        MillionRows.collection.insertMany(data, onInsert);
        console.log("CSV file successfully processed");
    });

function onInsert(err, docs) {
    if (err) {
        // TODO: handle error
    } else {
        console.info("%d potatoes were successfully stored.", docs.length);
    }
}
