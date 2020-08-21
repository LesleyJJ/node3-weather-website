const request = require('request');

const giocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGVzbGV5amoiLCJhIjoiY2tkdzQ0NTMyMWV2dDJ4cXM0b3gzNmpycSJ9.XaS9jnhwDCE0osie9ooG9Q&limit=1';

    request({
        url,
        json: true
    }, (err, {body}) => {
        if (err) {
            callback('Unable to connect location service', undefined);
        } else if (body.features.length === 0) {
            callback('Not found location, search again', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                placeName: body.features[0].place_name
            });
        }

    });
}

module.exports = giocode;