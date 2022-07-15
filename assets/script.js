// a variable to store the openweather API key
const apiKey = '&appid=db48e387d4849a796217eec1e8c0d5e8';
//a variable to store the api link for searched city's future conditions
const locationApi = "https://api.openweathermap.org/data/2.5/onecall?";
// a variable to store the api link for the searched city's current conditions
const cityApi = "https://api.openweathermap.org/data/2.5/weather/?q="; 

let lat;
let lon;
let icon;
let day;
let city;

// fetch request for searched city's current weather conditions
function currentConditions(city) {
  fetch(cityApi + city + apiKey).then(function (response) {
      // if search returns
      if (response.ok) {
          response.json().then(function (data) {
              //get coordinates for forecast
              console.log(data);
              lat = data.coord.lat;
              lon = data.coord.lon;
              icon = data.weather[0].icon;
          // call showConditions fn to display
              showConditions(city);
          });
      } else {
          // if search not found
          savedSearch.shift();
          // alert
          alert("City not found, please enter another city name");
          location.reload();
      }
  });
}

// a function to show conditions in the current city (search), and 5day forecast
function showConditions(city) {
  fetch(locationApi + "&lat=" + lat + "&lon=" + lon + apiKey)
  .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      console.log(data)

      icon = data.current.weather[0].icon;
     
      today = new Date().toLocaleDateString("en-US", {
          timeZone: `${data.timeZone}`,
      });

      // date and city name in dashboard container
      

      // loop data through weather forecast cards






