const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
const routes = require("./src/routes/routes.js");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
routes(app);
port = process.env.port||3000;
app.listen(port);
console.log("Started at :"+port);