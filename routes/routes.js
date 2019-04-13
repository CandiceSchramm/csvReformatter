module.exports = function(app) {
    app.get("/reformat/:String", function(req,res) {
        res.send(req.params.String);
        }
    );
};

