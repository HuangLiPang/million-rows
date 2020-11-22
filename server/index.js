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
const router = require("./router");
router(app);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server started on port`, PORT);
});
app.use(function (req, res) {
    res.status(404).send(`${req.originalUrl} is not a valid endpoint.`);
});
