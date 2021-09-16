const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
const { request } = require("express");
app.use(cors());
app.use(express.static('dist'));

const port = 8080;
const server = app.listen(port, listening);

function listening() {
    console.log(`The server is running locally on port:${port}`);
};

var locationData = [];

//POST
app.post('/addCoordinates', storeCoordinates)

function storeCoordinates(req, res) {
    newEntry = {
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        city: req.body.city,
        cityName: req.body.cityName,
        tripLength: req.body.tripLength
    }
    locationData.push(newEntry)
    console.log("Location Coordinates Received!")
    res.send(locationData)
}

//GET
app.get('/getLocation', getLocationData)

function getLocationData(req, res) {
    res.send(locationData)
    console.log("Location Coordinates Send!")
}


let weatherData = []

app.post('/addWeather', storeWeatherData)

function storeWeatherData(req, res) {
    newWeatherEntry = {
        maxTemp: req.body.maxTemp,
        minTemp: req.body.minTemp,
        press: req.body.press,
        snow: req.body.snow,
        clouds: req.body.cloudes,
        wind: req.body.wind,
        name: req.body.name,
        cityName: req.body.cityName,
        tripLength: req.body.tripLength
    }
    weatherData.push(newWeatherEntry)
    console.log("Weather Data Received!")
    res.send(weatherData)
}

module.exports = { storeWeatherData }
module.exports = { storeCoordinates }