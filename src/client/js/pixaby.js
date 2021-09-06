const pixabayBaseURL = "https://pixabay.com/api/?"
const pixabayAPIKey = "23040464-5966423a7bc13d25399e40339"

getImage = async(res) => {
    const URL = pixabayBaseURL + 'key=' + pixabayAPIKey + '&q=' + res + '&category=places&image_type=photo&orientation=horizontal&safesearch=true';
    console.log(URL)
    return await (fetch(URL)
        .then(res =>
            res.json()
        )
        .then(data => {

            if (data.hits != null && data.hits.length > 0) {
                pixabayData = { img: data.hits[0].webformatURL }
                return pixabayData
            } else {
                console.log("image not found")
                pixabayData = { img: "" }
                return pixabayData
            }
        })
        .catch(err => {
            console.log(err)
            return err.message
        })
    )
}

// getImage("New Orleans")

module.exports = { getImage }