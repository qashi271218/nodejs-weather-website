const request = require('postman-request');
const foreCast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9e45653694cbc67b68fcb1941c58a832`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                tempMin: Math.ceil(body.main.temp_min - 273.15),
                tempMax: Math.ceil(body.main.temp_max - 273.15),
                temp: Math.ceil(body.main.temp - 273.15),
                forecast: body.weather[0].main,
                country: body.sys.country
            })
        }
    })
}

module.exports = { foreCast }