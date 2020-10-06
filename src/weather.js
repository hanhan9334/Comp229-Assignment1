const base = `http://api.openweathermap.org/data/2.5/weather`;
const imgUrl = `http://openweathermap.org/img/wn/${iconID}@2x.png`;
var iconID;


const getWeather = (address) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(address)}&appid=${key}`;

    fetch(url).then((response) => {
        response.json().then((data) => {
            console.log(data);
        })
    })
}

exports.getWeather = getWeather;