
const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/f3e0b9fc030c8401081668876275feb7/' + lat +','+ long

    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the internet', undefined)
        }
        else if(body.error) {
            callback('Unable to fetch the location...', undefined)
        }
        else {
            callback(undefined, {
                Temp: body.currently.temperature,
                RainChance: body.currently.precipProbability
            })
        }
    })
}



module.exports = forecast