const getCoordinates = async(url) => {
    const res = await fetch(url)
    try {
        const coordinates = await res.json();
        console.log(coordinates)
        return coordinates
    } catch (error) {
        console.log("error", error)
    }
}


module.exports = { getCoordinates }