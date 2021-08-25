const path = require('path');
const express = require('express');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// use hbs
const hbs = require('hbs');

// Use express
const app = express();

// Define pahts for Express config
const publicDirectoryPath = (path.join(__dirname, '../public/'));
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Render a view with Handlebars
app.get('', (req, res) => {
    // use res.render to render hbs-views
    res.render('index', {
        title: 'Weather',
        name: 'Niek'
    }); 
})


app.get('/about', (req, res) => {
    // use res.render to render hbs-views
    res.render('about', {
        title: 'About me',
        name: 'Niek'
    }); 
})

app.get('/help', (req, res) => {
    // use res.render to render hbs-views
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Niek'
    }); 
})


app.get('', (req, res) => {
    // Send HTML
    res.send('<h1>Weather</h1>');
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

       
    })
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        // Search term is not defined
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

// 404-page: match anything that hasn't been matched before for all /help/* calls
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Niek',
        errorMessage: 'Help page not found'
    });
})


// 404-page: match anything that hasn't been matched before
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Niek',
        errorMessage: 'Page not found'
    });
})

// Start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

