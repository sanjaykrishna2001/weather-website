const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2FuamF5a3Jpc2huYW0iLCJhIjoiY2t6OXNwcnhzMXh1ZTJ4cDR2Mm5kOXlicSJ9.ZzXLJ2fdc0_JdGrrMwIQ3A'

    request({ url, json: true }, (error, { body }) => {
        console.log((body.features).length)
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode