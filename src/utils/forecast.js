const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=4ad22ef89945cdedfa4b071807dde4a8&query=12.58,77.38&units=f'

// request({ url: url, json: true }, (error, response) => {
//     // const data=JSON.parse(response.body)
//     // console.log(data.current)
//     // console.log(response.body.current)
//     if (error) {
//         console.log("unable to connect to network")
//     } else if (response.body.error) {
//         console.log("unable to find location")
//     }
//     else {
//         console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees out.")
//     }

// })

const forecast =(lati,longi,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=4ad22ef89945cdedfa4b071807dde4a8&query='+lati+','+longi//+'&units=f'

request({ url: url, json: true }, (error,{body}) => {
    if (error) {
        callback("unable to connect to network",undefined)
    } else if (body.error) {
        callback("unable to find location",undefined)
    }
    else {
        callback(undefined,body.current.weather_descriptions[0] + ". It is currently " +body.current.temperature + " degrees out. It feels like " +body.current.feelslike + " degrees out. The humidity is " + body.current.humidity + "%.")
    }

})
}

module.exports = forecast
