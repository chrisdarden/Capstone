/* Global Variables */

pressMe.addEventListener('click', (e) => {
    e.preventDefault();
    const zipcode = document.getElementById("zip").value
    const url = geoUrl + zipcode + geonameApi
    console.log(`First Zipcode: ${zipcode}`)
    if (zipcode == "" || zipcode.length < 5) {
        window.alert('Please enter a zipcode of 5 digits.');
        return
    } else {
        const getCoordinates = async(url) => {
            console.log("getCoordinates start")
            const res = await fetch(url)
            try {
                const coordinates = await res.json();
                console.log(coordinates)
                return coordinates
            } catch (error) {
                console.log("error", error)
            }

        }

    }
});

const postData = async(url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const performAction = async function() {
    const webTemp = await getTemperature(baseURL, zipInput.value, key)
    const data = {
        temp: webTemp.main.temp,
        date: newDate,
        userRes: feelings.value
    }

    console.log(data);
    /*add data to Post*/
    await postData('/add', data)

    //update UI
    updateUI()
        //     }
        //     /*Add event listener*/
        // document.getElementById('generate').addEventListener('click', performAction);
}

export { postData, performAction }













// // // Retrieve the data from api
// // function retrieveData(zipcode) {
// //     console.log("**RETRIEVE DATA**");
// //     console.log(`Zipcode = ${zipcode}`)
// //     fetch('/getGeoName', {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json"
// //             },
// //             body: JSON.stringify({
// //                 zipcode: zipcode
// //             })

// //         })
// //         .then(res => res.json())
// //         .then(console.log(res))

// // // sends data to server
// // .then(data => addEntry({...data }))
// //     .catch(error => console.log(`Error: ${error}`));

// // };

// // Send the data to the server
// const addEntry = (data) => {
//     console.log("in addEntry")
//     console.log("name= " + data.postalCodes[0].placeName)
//     console.log("lat= " + data.postalCodes[0].lat)
//     console.log("lng= " + data.postalCodes[0].lng)
//     const payload = data;
//     console.log(data);
//     const userData = {
//         zip: zip.value,
//         name: data.postalCodes[0].placeName,
//         lat: data.postalCodes[0].lat,
//         lng: data.postalCodes[0].lng,

//     }
//     console.log(userData);
//     // fetch('/entry', {
//     //         method: 'POST',
//     //         credentials: 'same-origin',
//     //         headers: { 'Content-Type': 'application/json' },
//     //         body: JSON.stringify(payload)
//     //     })
//     //     // .then(userData => response.json())
//     //     // .then(() => getData())
//     //     // .then(updateUI(userData))
//     //     .catch(error => console.log(`Error: ${error}`));
// };

// // Function to update UI 
// function updateUI(userData) {
//     // console.log('in update');
//     // console.log(userData);
//     let newDate = getDate();
//     document.getElementById('date').innerHTML = `Today's date is ${newDate}.`;
//     document.getElementById('temp').innerHTML = `Temperature = ${userData.temperature} ℉`;
//     // console.log(isNaN(userData.feelings));
//     let x = isNaN(userData.feelings);
//     if (isNaN(userData.feelings) === false || userData.feelings == "") {
//         document.getElementById('content').innerHTML = "Apparently you aren't feeling anything.";
//     } else {
//         document.getElementById('content').innerHTML = `I'm feeling ${document.getElementById('feelings').value}`;
//     }
// }

// // Retrieve data from the server
// const getData = async(url = "") => {
//     const response = await fetch("/entry");
//     try {
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// }

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