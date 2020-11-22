const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const mongoURI = require("./config/constants").mongoURI;

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
mongoose.connect(mongoURI, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useMongoClient: true,
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

fs.createReadStream("./data/urbandict-word-defs.csv")
    .pipe(csv())
    .on("data", (row) => {
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
            const item = new MillionRows(dic);
            item.save();
        } catch (err) {
            console.error(err);
        }
    })
    .on("end", () => {
        console.log("CSV file successfully processed");
    });
