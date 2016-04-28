const express = require("express");
const path = require("path");
const port = 3000;
const app = express();

app.use(express.static(__dirname + "/build"));

app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.listen(port);
console.log("server started on port " + port);