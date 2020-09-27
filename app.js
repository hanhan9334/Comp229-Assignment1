const express = require("express");
const path = require('path');

const app = express();

//Set up directory to serve
app.use(express.static(path.join(__dirname, 'public')));

//Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/templates/views'));

//Set routes
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    })
})

app.get('/aboutme', (req, res) => {
    res.render('aboutMe', {
        title: 'About Me'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact Me'
    })
})

app.get('/projects', (req, res) => {
    res.render('projects', {
        title: 'My Projects'
    })
})

app.get('/services', (req, res) => {
    res.render('services', {
        title: 'Services'
    })
})

app.get('*', (req, res) => {
    res.render('404');

})

app.listen(3000, () => {
    console.log('Listening to port 3000.');
});