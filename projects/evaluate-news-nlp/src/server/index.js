const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const MeaningCloud = require("meaning-cloud");
const meaningCloudApi = MeaningCloud({
  key: process.env.API_KEY,
  endpoints: {
    "sentiment-analysis": "/sentiment-2.1",
  },
  of: json,
});

const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const { json } = require("body-parser");
app.use(cors());
app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.post("/sentiment", (req, res) => {
    const analysisText = req.body.txt
  meaningCloudApi.sentiment(
    { txt: analysisText },
    (error, result) => {
      if (error) {
        console.log("Error during creating meaning cloud request");
        res.send();
        return;
      }
      console.log("Got sentiment results", result);
      res.send(result);
    }
  );
});

module.exports = app;
