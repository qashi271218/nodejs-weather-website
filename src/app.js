const { geoCode } = require('./utils/geocode.js')
const { foreCast } = require('./utils/forecast.js');
const path = require('path')
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = 3000;

//Define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home',
        headerInfo: 'Home Page'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        headerInfo: 'About Us Page'
    })
});

app.get('/blog', (req, res) => {
    res.render('blog', {
        title: 'Blog',
        headerInfo: 'Blog Page'
    })
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact',
        headerInfo: 'Contact Page'
    })
});

app.get('/product', (req, res) => {
    res.render('product', {
        title: 'Product',
        headerInfo: 'Product Page'
    })
});

app.get('/about/*', (req, res) => {
    res.send('some information about this user not found')
});

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Weather',
        headerInfo: 'Weather Page'
    })
});

app.get('/forecast', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        foreCast(latitude, longitude, (error, { forecast, temp } = {}) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                temp,
                forecast,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404')
});

app.listen(port, () => {
    console.log(`you are listening at ${port}`)
})