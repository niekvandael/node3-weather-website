const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoibmlla3ZhbmRhZWwiLCJhIjoiY2tzbGt1bGduMGl6dTJ2cGY5Y2RwaDk2MiJ9.KowmLc7DA3EZHwqi6VqkTw&limit=1';

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to mapbox service!', undefined /* explicit undefined, can be left out */);
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search!', undefined /* explicit undefined, can be left out */)
        } else {
            const latitude = body.features[0].center[1];
            const longtitude = body.features[0].center[0];
            const place_name = body.place_name;

            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });

        }
    })
}

module.exports = geocode;