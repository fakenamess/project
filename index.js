let weatherData = {
  Paris: {
    temperature: 19,
    humidity: 80
  },
  London: {
    temperature: 15,
    humidity: 75
  },
  NewYork: {
    temperature: 22,
    humidity: 70
  }
};

function roundNumber(number) {
  return Math.round(number);
}

function displayWeather(city) {
  let cityData = weatherData[city];
  if (cityData) {
    let temperature = roundNumber(cityData.temperature);
    let humidity = roundNumber(cityData.humidity);
    alert(
      `It is currently ${temperature}°C (${
        (temperature * 9) / 5 + 32
      }°F) in ${city} with a humidity of ${humidity}%`
    );
  } else {
    alert(
      `Sorry, we don't know the weather for this city. Try going to https://www.google.com/search?q=weather+${city}`
    );
  }
}

document.getElementById("search-button").addEventListener("click", function () {
  let cityInput = document.getElementById("city-input").value;
  displayWeather(cityInput);
});
function displayDateTime() {
  var datetimeElement = document.getElementById("datetime");
  var currentDate = new Date();
  var dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var day = dayOfWeek[currentDate.getDay()];
  var time = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  datetimeElement.textContent = day + " " + time;
}

displayDateTime();
setInterval(displayDateTime, 1000);

var searchForm = document.getElementById("search-form");
var searchResult = document.getElementById("search-result");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var cityInput = document.getElementById("city");
  var cityName = cityInput.value;

  searchResult.textContent = cityName;
  cityInput.value = "";
});
var temperatureElement = document.getElementById("temperature");
var celsiusElement = document.getElementById("celsius");
var convertLink = document.getElementById("convert");

function convertTemperature() {
  var temperature = parseFloat(celsiusElement.textContent);
  var isCelsius = true;

  convertLink.addEventListener("click", function (event) {
    event.preventDefault();

    if (isCelsius) {
      temperature = (temperature * 9) / 5 + 32;
      celsiusElement.textContent = temperature.toFixed(2);
      convertLink.textContent = "Convert to Celsius";
      isCelsius = false;
    } else {
      temperature = ((temperature - 32) * 5) / 9;
      celsiusElement.textContent = temperature.toFixed(2);
      convertLink.textContent = "Convert to Fahrenheit";
      isCelsius = true;
    }
  });
}

convertTemperature();
function searchWeather() {
  var city = document.getElementById("cityInput").value;
  getWeather(city);
}

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  getCityByCoordinates(latitude, longitude);
}

function getCityByCoordinates(latitude, longitude) {
  var apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  var url = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;

  $.get(url, function (data) {
    var city = data.name;
    var temperature = data.main.temp;

    displayWeather(city, temperature);
  });
}

function getWeather(city) {
  var apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${city}&appid=${apiKey}`;

  $.get(url, function (data) {
    var temperature = data.main.temp;

    displayWeather(city, temperature);
  }).fail(function () {
    alert("Failed to fetch weather data for the city.");
  });
}

function displayWeather(city, temperature) {
  document.getElementById("cityName").textContent = city;
  document.getElementById("temperature").textContent =
    "Temperature: " + temperature + " K";
}
