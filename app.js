const express = require("express");
let bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");
const app = express();
const Tabletop = require("tabletop");

app.set("port", 4001);
const HOST = "0.0.0.0";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");


var publicSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/13Ke3iSa2OslWL02s8TDyb3bxWAwhcS7k0aKKwumSvBo/edit?usp=sharing";

const fetchDataFromSheet = async () => {
  return await Tabletop.init({
    key: publicSpreadsheetUrl,
    simpleSheet: true
  });
};


app.get("/", async (req, res) => {
  
  var sheetData = JSON.stringify(await fetchDataFromSheet(), null, 2);
  // console.log(sheetData);
res.render("index.ejs", {data: sheetData});
});

//defining the root endpoint
app.get("/data", async (req, res) => {
  
  var sheetData = await fetchDataFromSheet();
  // console.log(JSON.stringify(sheetData));

  res.status(200).send(JSON.stringify(sheetData));
});


//specifying the listening port
var server = app.listen(app.get("port"), HOST, function() {
  console.log(
    "The back end server is running on http://localhost:" + app.get("port")
  );
});
