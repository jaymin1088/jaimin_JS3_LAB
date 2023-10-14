// Define your API key and base URL
const weatherApi = {
    key: '9f23b56e8dcad8299bf4e5a2a3fc932b',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
};

// Get DOM elements
const searchInputBox = document.querySelector('.search-box');
const locationCity = document.querySelector('.location .city');
const locationDate = document.querySelector('.location .date');
const currentTemp = document.querySelector('.current .temp');
const weatherStatus = document.querySelector('.current .weather');
const hiLowTemp = document.querySelector('.current .hi-low');
const weatherApp = document.querySelector('.app-wrap');

// Add an event listener for Enter key press
searchInputBox.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        getWeatherReport(searchInputBox.value);
    }
});

// Get weather report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
        .then((response) => response.json())
        .then((weather) => {
            showWeatherReport(weather);
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
}

// Show weather report
function showWeatherReport(weather) {
    if (weather.cod === '400') {
        swal('Empty Input', 'Please enter any city', 'error');
    } else if (weather.cod === '404') {
        swal('Bad Input', 'Entered city not found', 'warning');
    } else {
        locationCity.textContent = `${weather.name}, ${weather.sys.country}`;
        locationDate.textContent = dateManage(new Date());
        currentTemp.textContent = `${Math.round(weather.main.temp)}°C`;
        weatherStatus.textContent = `${weather.weather[0].main}`;
        hiLowTemp.textContent = `${Math.floor(weather.main.temp_min)}°C (min) / ${Math.ceil(weather.main.temp_max)}°C (max)`;
        changeBg(weather.weather[0].main);
        reset();
    }
}

// Function to reset the input box
function reset() {
    searchInputBox.value = '';
}

// Function to format the time
function getTime(date) {
    let hour = addZero(date.getHours());
    let minute = addZero(date.getMinutes());
    return `${hour}:${minute}`;
}

// Function to format the date
function dateManage(dateArg) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const year = dateArg.getFullYear();
    const month = months[dateArg.getMonth()];
    const date = dateArg.getDate();
    const day = days[dateArg.getDay()];
    return `${day} ${date} ${month} ${year}`;
}

// Function to change background image based on weather status
function changeBg(status) {
    const body = document.body;
    const imageUrl = getBackgroundImage(status);
    body.style.backgroundImage = `url(${imageUrl})`;
}

// Function to get background image URL based on weather status
function getBackgroundImage(status) {
    const backgroundImages = {
        Clouds: 'img/bg.jpg',
        Rain: 'img/bg.jpg',
        Clear: 'img/bg.jpg',
        Snow: 'img/bg.jpg',
        Sunny: 'img/bg.jpg',
        Thunderstorm: 'img/bg.jpg',
        Drizzle: 'img/bg.jpg',
        Mist: 'img/bg.jpg',
        Haze: 'img/bg.jpg',
        Fog: 'img/bg.jpg',
    };
    return backgroundImages[status] || 'img/bg.jpg';
}

// Function to add leading zero to a number
function addZero(num) {
    return num < 10 ? `0${num}` : num;
}
