({
    plugins: ['jsdom-quokka-plugin'],
    'jsdom': {
        'config': {
            'file': 'src/client/views/index.html'
        }
    }

})

import { getCoordinates } from './coordinates.js'
import { getImage } from './pixaby.js';

var weatherReport = {}
document.getElementById('submit').addEventListener('click', submit);
const weatherbitKey = "7d4bdc7cf3c24e8d86b3934a7a659726"

function submit(event) {
    event.preventDefault()
    let geoUrl = "http://api.geonames.org/postalCodeSearchJSON?country=us&postalcode="
    let geonameApi = "&username=chrisdarden"
    let zip = document.getElementById('zip').value
    let date = document.getElementById('date').value
    let date = document.getElementById('dateEntry').value
        //check for empty field
    if (zip == "" || date == "") {
        document.getElementById('img').src = missed
        alert("You have to enter a zipcode and date of travel.")
        return
    }

    clearUI()
    let url = geoUrl + zip + geonameApi
    console.log(`url for getCoordinates is ${url}`)
    getCoordinates(url)
        //then store coordinated and post data to server
        .then((coordinates) => {
            if (coordinates.totalResultsCount == 0) {
                document.getElementById('img').src = notFound
                alert("Invalid Location")
                clearUI(1);
            }
            return postData('/addCoordinates', {
                longitude: coordinates.postalCodes[0].lng,
                latitude: coordinates.postalCodes[0].lat,
                city: zip,
                cityName: coordinates.postalCodes[0].placeName
            })
        })
        .then(function(res) {
            var index = res.length - 1
            const lat = res[index].latitude
            const lon = res[index].longitude
            const cityName = res[index].cityName
            return { lat, lon, cityName }
        })
        .then(function({ lat, lon, cityName }) {
            const weatherbitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&units=I&key=${weatherbitKey}`
            getWeatherBitData(weatherbitUrl)
                .then(async(weatherData) => {
                    var i = weatherData.data.map((element) => element.valid_date).indexOf(date)
                    if (i != -1) {
                        return await postData('/addWeather', {
                            maxTemp: weatherData.data[i].high_temp,
                            minTemp: weatherData.data[i].low_temp,
                            press: weatherData.data[i].pres,
                            cityName: cityName

                        })
                    } else {
                        return postData('/addWeather', {
                            maxTemp: "Weather Data Not Available!",
                            minTemp: "Weather Data Not Available!",
                            press: "Weather Data Not Available!",
                            name: "Weather Data Not Available!",
                        })
                    }
                })
                .then(function(res) {
                    var index = res.length - 1
                    weatherReport = Object.assign({}, res[index]);
                    // document.getElementById('print').style.display = "block"
                    updateUI(res, index)
                    console.log(res[index])
                    return res[index].cityName
                })
                .then(function(res) {
                    console.log("cityName is = " + res);
                    getImage(res).then(function(pixabayData) {
                        console.log(pixabayData);
                        let imgSrc = pixabayData.img;
                        const img = document.getElementById("img");
                        img.src = imgSrc;
                    });
                });
        })
}




const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credientials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const data = await response.json();
        return data
    } catch (error) {
        alert("error" + error)
    }
}

const updateUI = async(res, index) => {
    try {
        if (res[index].press == "Weather Data Not Available!") {
            document.getElementById('value').style.color = "red"
                // document.getElementById('img').src = notFound
        } else { document.getElementById('value').style.color = "black" }

        const cityName = res[index].cityName
        console.log(`cityName is ${res[index].cityName}`)
            //to use the last element stored in array we use index
        document.getElementById('city-name').value = res[index].cityName;
        document.getElementById('pressure').value = res[index].press;
        document.getElementById('temp-min').value = res[index].minTemp;
        document.getElementById('temp-max').value = res[index].maxTemp;

        // document.getElementById('img').src = notFound
        return { cityName }
    } catch (error) { console.log("error1" + error) }
}

const getWeatherBitData = async(url) => {
    const res = await fetch(url)
    try {
        const weatherData = await res.json();
        console.log(weatherData)
        return weatherData
    } catch (error) {
        console.log(error)
    }

}

function clearUI(a) {
    document.getElementById('cityEntry').value = "";
    document.getElementById('city-name').innerHTML = "";
    document.getElementById('pressure').innerHTML = "";
    document.getElementById('temp-min').innerHTML = "";
    document.getElementById('temp-max').innerHTML = "";
}

export { postData }