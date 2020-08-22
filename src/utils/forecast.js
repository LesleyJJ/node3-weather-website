const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&appid=308cd333680d89d4120fa5ce5f570349&units=metric&lang=en';

    request({
        url,
        json: true
    }, (err, {
        body
    }) => {
        if (err) {
            callback('Unable to connect weather service', undefined);
        } else if (body.message) {
            callback('Unable to find location', undefined);
        } else {
            const forecast = body.daily[0].weather[0].description + ' today, it is currently ' +
                body.current.temp + ' degrees out. The high today is ' + body.daily[0].temp.max +
                ' degrees with the low of ' + body.daily[0].temp.min + ' degrees. The wind speed is ' +
                body.current.wind_speed + 'km/h';

                const capitalizedForecast = forecast.charAt(0).toUpperCase() + forecast.slice(1);


            callback(undefined, capitalizedForecast);
        }

    });
}

module.exports = forecast;