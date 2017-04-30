const express = require ( 'express' )
const hbs = require ( 'hbs' )
const fs = require( 'fs' )

var app = express()

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
// set the view engine to be used 
app.set('view engine', 'hbs')

app.use( ( req, res, next ) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log)
    next()
})

// This adds maintainance middle ware and if next is not called then on all url request ti the server only maintainance page will be displayed
// app.use( ( req, res, next ) => {
//     res.render('maintainance.hbs')
// })

// This is middle ware to tweak express to serve static content from given directory, should be after maintainance else it will display static content
app.use( express.static( __dirname + '/public'))

app.get('/', ( req, res ) => {
    res.render('home.hbs', {
        title : 'My Home Page',
        welcomeMessage : 'Hello to my website'
    })
})

app.get('/bad', (req,res) => {
    res.send( {
        errorMessage : 'Unable to server request'
    })
})

// Using handlebars template, node looks in views folder by default hence we don't need to give path if template file is in views folder directly
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title : 'About Page',
        heading : 'About Page',
        currentYear : new Date().getFullYear()
    })
})

app.listen(3500 , () => {
    console.log("Server started on port 3500")
})