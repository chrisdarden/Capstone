const path = require('path');
require('dotenv').config();
const geonamekey = process.env.geonamekey;
const port = 8080;
const bodyParser = require('body-parser')
const cors = require('cors');

console.log("Geoname key = " + geonamekey);

var express = require('express');
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) })

// ------------------------------------------SERVER CODE STARTS HERE----------------------

app.get('/', (req, res) => res.sendFile(path.resolve('dist/index.html')));

app.get('/all', sendData);

function sendData(req, res) {
    res.send(projectData);
    console.log(projectData)
};

app.post('/add', addData);

function addData(req, res) {
    projectData.temp = req.body.temp;
    projectData.date = req.body.date;
    projectData.userRes = req.body.userRes;
    console.log(projectData);
    res.send();
    console.log(projectData);
}

// ---------------------

// app.get('http://localhost:8080/getGeoName', (req, res) => {
//     // const zipcode = res.body.zipcode
//     const username = geonamekey
//     console.log("in geoname api")
//         // console.log(`zipcode = ${res.body.zipcode}`)
//     console.log(`geoname key = ${geonamekey}`)

//     res.fetch(`http://api.geonames.org/postalCodeSearchJSON?postalcode=${zipcode}&username=${username}`)
//     console.log(fetch(`http://api.geonames.org/postalCodeSearchJSON?postalcode=${zipcode}&username=${username}`))
//         .then(res => res.json())
//         .then(console.log(data))
//     send(data)

// })

// -------------