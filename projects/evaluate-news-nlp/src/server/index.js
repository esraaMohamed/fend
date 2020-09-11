const dotenv = require("dotenv");
dotenv.config();

const baseUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}`

var path = require("path");
const fetch = require('node-fetch')
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
var allowedOrigins = ['http://localhost:8080',
  'http://localhost:8080/sentiment'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", (req, res) => {
  res.sendFile("dist/index.html");
});

app.listen(8081, () => {
  console.log("Example app listening on port 8081!");
});

app.post("/sentiment", (req, res) => {
  const url = req.body.url;
  console.log('analysisText', url)
  const fetchUrl = `${baseUrl}&lang=auto&of=json&url=${url}&verbose=y`
  fetch(fetchUrl, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({ url })
  }).then(data =>  data.json()).then(data => res.send(data))
});

module.exports = app;
