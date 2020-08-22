const path = require('path');
const express = require('express');
const hbs = require('hbs');
const giocode = require('./utils/giocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine ane views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lesley',
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Lesley'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpfull text',
        title: 'Help',
        name: 'Lesley'
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address term'
        })
    }

    giocode(req.query.address, (err, {longitude, latitude, placeName} = {}) => {
        if(err) {
            return res.send({
                error: err
            })
        }

        forecast(longitude, latitude, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err
                })
            }

            res.send({
                forecast: forecastData,
                location: placeName,
                address: req.query.address
            })
        })
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
         return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        errMsg: 'Help article not found',
        name: 'Lesley'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: 'page not found',
        name: 'Lesley'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port);
})