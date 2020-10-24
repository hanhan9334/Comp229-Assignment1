const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const https = require('https');
const User = require('./src/models/user');
const auth = require('./src/middleware/auth');
const jwt = require('jsonwebtoken');
const contactRouter = require('./routers/contact');
require('dotenv').config({ path: __dirname + '/.env' });
require('./src/db/mongoose');


const app = express();


//Set up directory to serve
app.use(express.static(path.join(__dirname, 'public')));

//Set up body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(contactRouter);

//Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/templates/views'));

//Set routes
app.get('/', (req, res) => {
    const key = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=toronto&appid=${key}`;

    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const iconId = weatherData.weather[0].icon;
            const weather = weatherData.main.temp;
            const imgUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
            res.render('home', {
                title: 'Home',
                weather: weather,
                imgUrl: imgUrl
            })
        })
    })


})

app.get('/aboutme', (req, res) => {
    const key = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=toronto&appid=${key}`;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const iconId = weatherData.weather[0].icon;
            const weather = weatherData.main.temp;
            const imgUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
            res.render('aboutMe', {
                title: 'About Me',
                weather: weather,
                imgUrl: imgUrl
            })
        })
    })
})

app.get('/contact', (req, res) => {
    const key = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=toronto&appid=${key}`;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const iconId = weatherData.weather[0].icon;
            const weather = weatherData.main.temp;
            const imgUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
            res.render('contact', {
                title: 'Contact Me',
                weather: weather,
                imgUrl: imgUrl
            })
        })
    })
})



app.post("/contact", (req, res) => {

    console.log(req.body.fName);
    console.log(req.body.lName);
    console.log(req.body.email);

    res.redirect('/');
})

app.get('/projects', (req, res) => {
    const key = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=toronto&appid=${key}`;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const iconId = weatherData.weather[0].icon;
            const weather = weatherData.main.temp;
            const imgUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
            res.render('projects', {
                title: 'My Projects',
                weather: weather,
                imgUrl: imgUrl
            })
        })
    })
})
app.get('/services', (req, res) => {
    const key = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=toronto&appid=${key}`;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const iconId = weatherData.weather[0].icon;
            const weather = weatherData.main.temp;
            const imgUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
            res.render('services', {
                title: 'Services',
                weather: weather,
                imgUrl: imgUrl
            })
        })
    })
})

app.post('/signup', async (req, res) => {

    const user = new User(req.body);

    try {
        console.log(user);
        await user.save();

        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }

})

app.get('/login', (req, res) => {
    const key = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=toronto&appid=${key}`;
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const iconId = weatherData.weather[0].icon;
            const weather = weatherData.main.temp;
            const imgUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
            res.render('login', {
                title: 'Login',
                weather: weather,
                imgUrl: imgUrl
            })
        })
    })
})

app.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findByCredentials(req.body.email, req.body.password);
        console.log(user);
        if (!user) {
            res.render('loginFail');
        }
        console.log(user);
        User.findOne()
        res.render('userInfo', {
            name: user.name,
            email: user.email
        });
    } catch (e) {
        res.status(500).render('loginFail');
    }
})

app.get('contacts', (req, res) => {

})

app.get('*', (req, res) => {
    res.status(404).send(404);

})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, () => {
    console.log('Listening to port 3000.');
});