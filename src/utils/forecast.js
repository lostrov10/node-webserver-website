const request = require('request')

const forecast = (latitude , longitude, callback) => {   
    const url = 'http://api.weatherstack.com/current?access_key=aedd370dd3cdca66ff9f4e390a70f5a6&query=' + latitude + ',' + longitude + '&units=f'
    
    request({url: url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, 'The weather is ' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out in ' + body.location.region + ', It feels like ' + body.current.feelslike + ' degress out and the humidity is: ' + body.current.humidity)
        }
    })
}

module.exports = forecast