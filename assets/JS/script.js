const apiKey = '9a50a6a2d31e9e6443bc11bc63ba5142';
const cities = 'Cities';



/*
- getStoredArr is a function used to grab a stored array from local storage
- can be used for any stored array and it will parse
*/ 
// const getStoredArr = (localStorageArr) => JSON.parse(localStorage.getItem(localStorageArr));
/*
- initializeStorage takes a local storage key that has been converted to a variable and removes it from local storage
*/
// const initalizeStorage = (storageName) => {
// localStorage.removeItem(storageName);
// }


// This function is used to take in a city name and get it's geographical data from the Geo API of openweather
const getCityGeoData = (cityName) => {
    const apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(responseJSON => getLatLong(responseJSON));
        // .then(responseJSON => console.log(responseJSON));
}


// This function is used to convert geo data of getCityGeoData into a lat/lon to be used to get weather data
const getLatLong = (data) => {
    for(let i = 0; i < 1; i++){
        const cityLat = data[i].lat;
        const cityLon = data[i].lon;
        convertForecastCoordinates(cityLat, cityLon)
        convertCurrentWeatherCoords(cityLat, cityLon)
    }
}
// This function takes lat and lon as an arugment and retrives weather information
const convertForecastCoordinates = (lat, lon) => {
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        // .then(responseJSON => console.log(responseJSON))
        .then(responseJSON => displayForecast(responseJSON))
}

const convertCurrentWeatherCoords = (lat, lon) => {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        // .then(responseJSON => console.log(responseJSON))
        .then(responseJSON => displayCurrentWeather(responseJSON))
}

// This function is used to display the current weather at the top of the page
const displayCurrentWeather = (data) => {
    const currentWeather = data.weather[0];
    const temperatureInfo = data.main;
    const cityName = data.name;
    const weatherIconEl = document.getElementById('icon-display');
    const tempDisplayEl = document.getElementById('temp-display');
    const feelsLikeEl = document.getElementById('feels-like');
    const cityDisplayEl = document.getElementById('city-display');
    const currentTemp = Math.ceil(temperatureInfo.temp);
    const weatherIcon = currentWeather.icon;
    const feelsLike = Math.ceil(temperatureInfo.feels_like);

    weatherIconEl.setAttribute('src', `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
    tempDisplayEl.textContent = `Current Temperature: ${currentTemp} degrees`;
    feelsLikeEl.textContent = `Feels like ${feelsLike} degrees`;
    cityDisplayEl.textContent = cityName;
    
}  

// This function is used to display the 5 day forecast
// The API returns data in 3 hour increments so I needed to use the 8th iteration of each increment to get a forecast that is 24 hour apart
const displayForecast = (data) => {
    const dataList = data.list;

    const dayOneTitleEl = document.getElementById('day-1-title');
    const dayOneIconEl = document.getElementById('day-1-icon');
    const dayOneTempEl = document.getElementById('day-1-temp')
    const dayOneTitle = dataList[0].dt_txt;
    const dayOneIcon = dataList[0].weather[0].icon;
    const dayOneTemp = Math.ceil(dataList[0].main.temp);

    dayOneTitleEl.innerText = dayOneTitle.slice(0, -9);
    dayOneIconEl.setAttribute('src', `https://openweathermap.org/img/wn/${dayOneIcon}@2x.png`);
    dayOneTempEl.textContent = `${dayOneTemp}°`;

    const dayTwoTitleEl = document.getElementById('day-2-title');
    const dayTwoIconEl = document.getElementById('day-2-icon');
    const dayTwoTempEl = document.getElementById('day-2-temp')
    const dayTwoTitle = dataList[8].dt_txt;
    const dayTwoIcon = dataList[8].weather[0].icon;
    const dayTwoTemp = Math.ceil(dataList[8].main.temp);

    dayTwoTitleEl.innerText = dayTwoTitle.slice(0, -9);
    dayTwoIconEl.setAttribute('src', `https://openweathermap.org/img/wn/${dayTwoIcon}@2x.png`);
    dayTwoTempEl.textContent = `${dayTwoTemp}°`;

    const dayThreeTitleEl = document.getElementById('day-3-title');
    const dayThreeIconEl = document.getElementById('day-3-icon');
    const dayThreeTempEl = document.getElementById('day-3-temp')
    const dayThreeTitle = dataList[16].dt_txt;
    const dayThreeIcon = dataList[16].weather[0].icon;
    const dayThreeTemp = Math.ceil(dataList[16].main.temp);

    dayThreeTitleEl.innerText = dayThreeTitle.slice(0, -9);
    dayThreeIconEl.setAttribute('src', `https://openweathermap.org/img/wn/${dayThreeIcon}@2x.png`);
    dayThreeTempEl.textContent = `${dayThreeTemp}°`;

    const dayFourTitleEl = document.getElementById('day-4-title');
    const dayFourIconEl = document.getElementById('day-4-icon');
    const dayFourTempEl = document.getElementById('day-4-temp')
    const dayFourTitle = dataList[24].dt_txt;
    const dayFourIcon = dataList[24].weather[0].icon;
    const dayFourTemp = Math.ceil(dataList[24].main.temp);

    dayFourTitleEl.innerText = dayFourTitle.slice(0, -9);
    dayFourIconEl.setAttribute('src', `https://openweathermap.org/img/wn/${dayFourIcon}@2x.png`);
    dayFourTempEl.textContent = `${dayFourTemp}°`;

    const dayFiveTitleEl = document.getElementById('day-5-title');
    const dayFiveIconEl = document.getElementById('day-5-icon');
    const dayFiveTempEl = document.getElementById('day-5-temp')
    const dayFiveTitle = dataList[32].dt_txt;
    const dayFiveIcon = dataList[32].weather[0].icon;
    const dayFiveTemp = Math.ceil(dataList[32].main.temp);

    dayFiveTitleEl.innerText = dayFiveTitle.slice(0, -9);
    dayFiveIconEl.setAttribute('src', `https://openweathermap.org/img/wn/${dayFiveIcon}@2x.png`);
    dayFiveTempEl.textContent = `${dayFiveTemp}°`;
    
}





const searchButton = document.getElementById('srch-btn')

// This event listener is incomplete. It needs to add and retrieve information from local storage
searchButton.addEventListener('click', event => {
    event.preventDefault();
    const documentMain = document.querySelector('main');
    documentMain.style.display = 'inline';
    const searchInput = document.getElementById('srch-input').value;
    const searchedCities = [];
    searchedCities.push(searchInput);

    

    getCityGeoData(searchInput);
    localStorage.setItem(cities, JSON.stringify(searchedCities))

    const localStoredArr = getStoredArr(cities);
    if(localStoredArr){

        localStoredArr.push(searchInput)
        localStorage.setItem(cities, JSON.stringify(localStoredArr))
        if(localStoredArr[0]){
            const firstRecentCity = document.getElementById('recent-city-1');
            firstRecentCity.textContent = localStoredArr[0];
        } 
    }
})