// function to get the current date format

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = date.getDay();
  let hour = date.getHours().toString().padStart(2, "0");
  let minute = date.getMinutes().toString().padStart(2, "0");

  let dayName = days[dayIndex];
  return `${dayName} ${hour}:${minute}`;
}

let dateElement = document.querySelector(".currentDayTime");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//functions to update weather stats
function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentLocationTemp = document.querySelector(".temp");
  currentLocationTemp.innerHTML = `${currentTemp}`;
  let fUnitLink = document.querySelector("#fareinheit-link");
  fUnitLink.addEventListener("click", fareinheit);
  let cUnitLink = document.querySelector("#celcius-link");
  cUnitLink.addEventListener("click", celcius);

  function fareinheit(event) {
    event.preventDefault();
    let fLinkTemp = document.querySelector(".temp");
    let fTemp = Math.round(response.data.main.temp);
    fLinkTemp.innerHTML = `${fTemp}`;
  }

  function celcius(event) {
    event.preventDefault();
    let cLinkTemp = document.querySelector(".temp");
    let cTemp = Math.round((response.data.main.temp - 32) * (5 / 9));
    cLinkTemp.innerHTML = `${cTemp}`;
  }
}

function showHumidity(response) {
  let currentHumidity = response.data.main.humidity;
  let currentLocationHumidity = document.querySelector(".humidity");
  currentLocationHumidity.innerHTML = `${currentHumidity}%`;
}

function showWind(response) {
  let currentWind = Math.round(response.data.wind.speed);
  let currentLocationWind = document.querySelector(".wind");
  currentLocationWind.innerHTML = `${currentWind} miles/hour`;
}

function showWeatherConditions(response) {
  let weatherCondition = response.data.weather[0].description;
  let currentWeatherCondition = document.querySelector(".weather");
  currentWeatherCondition.innerHTML = `${weatherCondition}`;
}
function showWeatherIcon(response) {
  let weatherIcon = response.data.weather[0].icon;
  let weatherElement = document.querySelector("#icon");
  weatherElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
  );
  weatherElement.setAttribute("alt", response.data.weather[0].icon);
}

// function for current location
function currentPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "9977cb0fff6fd5cefef93a62c355a4e6";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showData);
}
// function for current location button click
function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let currentLocationBtn = document.querySelector(".current-location-btn");
currentLocationBtn.addEventListener("click", searchCurrentLocation);

//function to search city
function searchWithCity(city) {
  let apiKey = "9977cb0fff6fd5cefef93a62c355a4e6";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showData);
}

// function for search button
function searchButton(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchWithCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchButton);

// function to update current location and city weather stats together
function showData(response) {
  let searchCityResult = document.querySelector(".Houston");
  searchCityResult.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  let currentTime = new Date();
  let currentDateTime = formatDate(currentTime);
  let dateElement = document.querySelector(".currentDayTime");
  dateElement.innerHTML = currentDateTime;
  showTemperature(response);
  showHumidity(response);
  showWind(response);
  showWeatherConditions(response);
  showWeatherIcon(response);
}

searchWithCity("Houston");
