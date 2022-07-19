// a variable to store the openweather API key
const apiKey = 'db48e387d4849a796217eec1e8c0d5e8';


// click event to grab input value to pass to api call
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', function(){
    let searchValue = document.getElementById('search').value
    console.log(searchValue)
    getLatLon(searchValue)
});
// create geocode fn to grab coordinates for current weather and forecast weather
function getLatLon(searchValue, cityName){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}=&name${cityName}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        currentWeather(data[0].lat, data[0].lon)
        forecast(data[0].lat, data[0].lon)
//    grab 'name' value from API and display it in h2 element on currentWeather
        var cityName = document.createElement('h2')
        cityName.textContent = 'City: ' + data.name

        document.getElementById('currentWeather').append(cityName)
    })
}

// date and city name in dashboard container
function currentWeather(lat, lon,) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var temperature = document.createElement('h3')
        temperature.textContent = 'temp: ' + data.current.temp
    

        document.getElementById('currentWeather').append(temperature)
    })
}    


// loop data through weather forecast cards
function forecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
        for(var i = 1; data.daily.length-3; i++) {
            var forecastTemp = document.createElement('div')
            forecastTemp.setAttribute('class', 'forecastCards')
            forecastTemp.textContent = "temp: " + data.daily[i].temp.day

            document.getElementById('forecastCard').append(forecastTemp)

            var forecastWeather = document.createElement('div')
            forecastWeather.setAttribute('class', 'forecastCards')
            forecastWeather.textContent = " " + data.daily[i].weather.icon

            document.getElementById('forecastCard').append(forecastWeather)

            // var forecastWeather = document.createElement('p')
            // forecastWeather.setAttribute('class', 'forecastCards')
            // forecastWeather.textContent = " " + data.daily[i].weather.icon

            // document.getElementById('forecastCard').append(forecastWeather)
        }
        // console.log(data) 
    })
}   







