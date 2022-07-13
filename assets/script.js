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
      $("#weather-dashboard").html(
          `${city} ${day} <img src='http://openweathermap.org/img/w/${icon}.png'/>`
      );
      // weather conditions
      $("#temp").html(`Temperature: ${data.current.temp} F`);
      $("#wind").html(`Wind Speed: ${data.current.wind_speed} mph`);
      $("#humidity").html(`Humidity: ${data.current.humidity} %`);
      // reset
      $(".5day-forecast").html("");

      // loop data through 5 cards
      for (let i = 1; i < 6; i++) {
          icon = data.daily[i].weather[0].icon;
          eachDay = new Date(data.daily[i].dt * 1000).toLocaleDateString("en-US", {
              timeZone: `${data.timeZone}`,
            });
          // fill forecast cards
          $(".5day-forecast").append(`
          <div class="col-auto mb-3">
          <div class="card text-light cardbg no-gutters" style="width: 14rem;">
              <div class="card-body">
                  <h5 class="card-title">${day}</h5>
                  <p class="card-text my-3"><img src='http://openweathermap.org/img/w/${icon}.png'/></p>
                  <p class="card-text my-3">Temperature: ${data.daily[i].temp.day} F</p>
                  <p class="card-text my-3">Wind Speed: ${data.daily[i].wind_speed} mph</p>
                  <p class="card-text my-3">Humidity: ${data.daily[i].humidity} %</p>                
              </div>
          </div>`);
      }
  })
}

// a function to control the search bar
function searchBar(event) {
  event.preventDefault();
  // set entry as variable
  city = $("#city").val();
  // if entry was already searched, display its data
  if (searchHistory.includes(city)) {
      displayConditions(city);
  } else {
      // store search history, display the returned weather conditions
      searchHistory.unshift(city);
      localStorage.setItem("searches", JSON.stringify(searchHistory));
      displayConditions(city);
  }

}



// see if I can make this work???
// // a function to display the searches saved to localstorage
// function displaySearchHistory() {
//   searchHistory = JSON.parse(localStorage.getItem("searches"));
//   console.log(searchHistory);
//   if (searchHistory == null) searchHistory = [];
//   // only display 5 most recent searches
//   if (searchHistory.length > 5) {
//     searchHistory.pop();
//   }
// }