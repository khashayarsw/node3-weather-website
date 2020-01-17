// Initial Modules:
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Initial express:
const app = express();

//Define Paths for Express config:
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Customize server : give folder to it:
app.use(express.static(publicDirectoryPath));



//Setup handlebars engine and views location:
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'khashayar'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help Me',
        name: 'khashayar'
    })
})



app.get('/weather', (req, res) => {
    const addressValue = req.query.address;
    if (!addressValue) {
        return res.send({
            error: "Address not provided!"
        })
    }
    geoCode(addressValue, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
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
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        value: req.query.search
    })
})



app.get('/help/*', (req, res) => {
    res.render("404", {
        name: 'khashayar',
        errorMessage: "Help article not found"
    })


})
app.get('*', (req, res) => {
    res.render("404", {
        name: 'khashayar',
        errorMessage: "Page not found"
    })
})







app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});