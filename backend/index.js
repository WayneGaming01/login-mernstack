const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const config = require("./configuration/config.json");
const post = require("./routes/post");
const requestIp = require("request-ip");
const cors = require("cors");
require("./configuration/mongo")();
app.set("trust proxy", false);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(requestIp.mw());
app.use(post);

app.listen(config.PORT, () => {
  console.log("App is running on port " + config.PORT);
});
