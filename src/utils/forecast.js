const request = require('request');

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=a123e930dc021503d8ba4fad0e5ebf93&query=' + 
                   longitude + ',' + latitude + '&units=f';

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weatherstack service!', undefined);
        } else if (body.error){
            callback('Unable to find location. Try another search!', undefined)
        } else {
           callback(undefined, 
                "It is currently " + body.current.temperature + 
                    " out. It feels like " + body.current.feelslike + " degrees out."
            );

        }
    })
}

module.exports = forecast;