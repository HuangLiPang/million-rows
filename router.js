const searchController = require("./controllers/search-controller");

module.exports = (app) => {
    app.post("/search", searchController.search);
};
