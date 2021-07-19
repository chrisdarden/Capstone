const path = require('path');
const fetch = require('node-fetch');
// API Key
const dotenv = require('dotenv');
dotenv.config();


const geonamekey = process.env.geonamekey;
console.log("Geoname key = " + geonamekey);

const port = 8080;
// Require Express to run server and routes
var express = require('express');

// Start up an instance of app
var app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server

const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) })

app.use(express.static('website'));

app.get('/', (req, res) => res.sendFile(path.resolve('dist/index.html')));

app.get('/geonameApi', (req, res) => {
    console.log("in geoname api")
    const response = fetch(`http://api.geonames.org/postalCodeSearchJSON?postalcode=${zip}&username=${apikey}`);
    try {
        const data = response.json();
        console.log(data);
        res.send(data);
    } catch (error) {
        alert(error);
        console.log("error", error);

    }
})

// app.post("/entry", (req, res) => {
//     projectData = req.body;
// });