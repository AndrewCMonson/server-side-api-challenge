const apiKey = '9a50a6a2d31e9e6443bc11bc63ba5142';

let city;

const pullWeather = (cityName) => {
    const apiURL = `https://corsproxy.io/?https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(apiURL)
        .then(response => console.log(response));
}

pullWeather('Sacramento');

