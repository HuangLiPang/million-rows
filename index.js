const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/initializer");

db.initializer();
const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(cors());
app.use("/", express.static(__dirname + "/client/build"));
const router = require("./router");
router(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
});
app.use(function (req, res) {
    res.status(404).send(`${req.originalUrl} is not a valid endpoint.`);
});
