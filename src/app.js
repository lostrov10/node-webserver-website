const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs' )
app.set('views', viewsPath )
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lior Ost'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Lior Ost'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Lior Ost',
        message: 'For more help contact help center at : 04-6451000'        
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
 
    
    
 
    geocode(address, (error, {latitude, longitude, location} = {}) => {
    
        if (error) {
            return res.send({ error })                
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })                
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })           
        })
    })    
       
    

   
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Lior Ost',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Lior Ost',
        errorMessage: '404 - page not found.'
    })
})

app.listen(port, () => {
    console.log('Web server is up on port ' + port)
})