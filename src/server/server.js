// API Key
const dotenv = require('dotenv');
dotenv.config();

const apikey = process.env.geonameKey;
console.log("Geoname key = " + apikey);

const port = 8000;
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

app.get('/geoname', async(req, res) => {
    const response = await fetch(`http://api.geonames.org/postalCodeSearchJSON?postalcode=${zip}&username=${apikey}`);
    try {
        const data = await response.json();
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

// app.get("/", (req, res) => {
//     res.send("hello");;
// });