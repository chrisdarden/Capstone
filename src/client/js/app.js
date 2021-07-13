/* Global Variables */

const pressMe = document.getElementById('submit');

// API Key
// const dotenv = require('dotenv');
// dotenv.config();
// const api_key = process.env.geonameKey;
// console.log("Geoname key = " + geonameKey);

// Date Function
function getDate() {
    let d = new Date();
    let month = d.getMonth() + 1;
    let newDate = month + '.' + d.getDate() + '.' + d.getFullYear();
    return newDate;
}

// Generate event listener on generate button
pressMe.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Pressed")
    let zip = document.getElementById("zip").value;
    console.log(zip)
    if (zip == "" || zip.length < 5) {
        window.alert('Please enter a zipcode of 5 digits.');
        return
    } else {
        let geonameUrl = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${zip}&username=chrisdarden`;
        retrieveData(geonameUrl);
    }
});

// Retrieve the data from api
const retrieveData = async(geonameUrl) => {
    console.log("retrieve data");
    console.log(geonameUrl);

    // first fetch attempt to geoname url
    const request = await fetch(geonameUrl)
        .then(response => response.json())
        .then(data => addEntry({...data }))
        .catch(error => console.log(`Error: ${error}`));

};

// Send the data to the server
const addEntry = (data) => {
    const payload = data;
    console.log(data);
    // let newDate = getDate();
    const userData = {
        zip: zip.value,
        name: postalCodes[0].placeName,
        lat: postalCodes[0].lat,
        lng: postalCodes[0].lng,

    }
    console.log(userData);
    fetch('/entry', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        // .then(userData => response.json())
        .then(() => getData())
        .then(updateUI(userData))
        .catch(error => console.log(`Error: ${error}`));
};

// Function to update UI 
function updateUI(userData) {
    // console.log('in update');
    // console.log(userData);
    let newDate = getDate();
    document.getElementById('date').innerHTML = `Today's date is ${newDate}.`;
    document.getElementById('temp').innerHTML = `Temperature = ${userData.temperature} ℉`;
    // console.log(isNaN(userData.feelings));
    let x = isNaN(userData.feelings);
    if (isNaN(userData.feelings) === false || userData.feelings == "") {
        document.getElementById('content').innerHTML = "Apparently you aren't feeling anything.";
    } else {
        document.getElementById('content').innerHTML = `I'm feeling ${document.getElementById('feelings').value}`;
    }
}

// Retrieve data from the server
const getData = async(url = "") => {
    const response = await fetch("/entry");
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// const getApi = async(url) => {
//     const request = await fetch(url);
//     try {
//         const KEYS = request.json();
//         return KEYS;
//     } catch (error) {
//         console.log(error);
//     }
// };

// //Get API Keys
// async function getKey() {
//     const res = await fetch('/api')
//     try {
//         const KEYS = res.json();
//         return KEYS;
//     } catch (error) {
//         console.log('error', error);
//     }
// }