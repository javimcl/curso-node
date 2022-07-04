const express = require('express')
const app = express()
const hbs = require('hbs');

const port = process.env.PORT

//Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

//static content
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'Javier Lucero',
        titulo:'Curso Node'
    })
})

app.get('/hola-mundo', (req, res) => {
    res.send('Hello World on their respective route')
})
app.get('/generic', (req, res) => {
    res.render('generic', {
        nombre: 'Javier Lucero',
        titulo:'Curso Node'
    })
})

app.get('/elements', (req, res) => {
    res.render('elements', {
        nombre: 'Javier Lucero',
        titulo:'Curso Node'
    })
})

app.get('*', (req, res) => {
    res.send('404 | Page not found')
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})