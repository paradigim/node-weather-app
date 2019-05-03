const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// defines path for express config
const app = express()
const pathDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

// setup handlebar engines and views
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// setup static directory
app.use(express.static(pathDir))




app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Pritam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: "Pritam"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        messege: 'i am geting help',
        name: 'Pritam'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'must provide a search location'
        })
    }



    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })

})





app.get('/help/*', (req, res) => {
    res.render('error404', {
        errorMsgs: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        errorMsgs: 'page not found'
    })
})





app.listen(3000, () => {
    console.log('server is responding at port 3000')
})