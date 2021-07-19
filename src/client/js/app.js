/* Global Variables */

const pressMe = document.getElementById('submit');
// const zipcode = document.getElementById("zip").value;

// Date Function
// function getDate() {
//     let d = new Date();
//     let month = d.getMonth() + 1;
//     let newDate = month + '.' + d.getDate() + '.' + d.getFullYear();
//     return newDate;
// }

// Generate event listener on generate button
pressMe.addEventListener('click', (e) => {

    e.preventDefault();
    let zipcode = document.getElementById("zip").value;
    console.log("Pressed")
    console.log(`zipcode = ${zipcode}`)
    if (zipcode == "" || zipcode.length < 5) {
        window.alert('Please enter a zipcode of 5 digits.');
        return
    } else {
        retrieveData("", zipcode);
    }
});

// Retrieve the data from api
const retrieveData = async(req, res) => {
    console.log("retrieve data");
    console.log(`zipcode = ${res}`)
        // first fetch attempt to geoname url

    fetch('/geonameApi', {
            method: 'POST',
            body: JSON.stringify({ 'zip': res }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(console.log)

    // sends data to server
    .then(data => addEntry({...data }))
        .catch(error => console.log(`Error: ${error}`));

};

// Send the data to the server
const addEntry = (data) => {
    console.log("in addEntry")
    console.log("name= " + data.postalCodes[0].placeName)
    console.log("lat= " + data.postalCodes[0].lat)
    console.log("lng= " + data.postalCodes[0].lng)
    const payload = data;
    console.log(data);
    const userData = {
        zip: zip.value,
        name: data.postalCodes[0].placeName,
        lat: data.postalCodes[0].lat,
        lng: data.postalCodes[0].lng,

    }
    console.log(userData);
    // fetch('/entry', {
    //         method: 'POST',
    //         credentials: 'same-origin',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(payload)
    //     })
    //     // .then(userData => response.json())
    //     // .then(() => getData())
    //     // .then(updateUI(userData))
    //     .catch(error => console.log(`Error: ${error}`));
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