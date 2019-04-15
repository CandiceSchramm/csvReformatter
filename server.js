const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;


//routes
require("./routes/routes")(app);

//starting server
app.listen(PORT, function() {
    console.log("Server now on port " + PORT)
});

module.exports = app;