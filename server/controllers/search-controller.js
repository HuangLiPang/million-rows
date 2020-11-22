const mongoose = require("mongoose");

const millionRows = mongoose.model("million-rows");

exports.search = async function (req, res) {
    const query = req.body;
    const urlData = await millionRows
        .find(
            {
                $and: [
                    { $text: { $search: query.word } },
                    { word: new RegExp(`^${query.word}.*`) },
                ],
            },
            { _id: 0, word: 1, definition: 1 },
            { sort: { date: -1 } }
        )
        .exec();
    if (urlData) {
        res.status(200).json(urlData);
    } else {
        res.status(200).json([]);
    }
};
