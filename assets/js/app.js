"use strict";
// DOM elements
const navLinksParent = document.querySelector("ul.navbar-nav");
const weatherCardsContainer = document.querySelector("#weather .row");
// variables

// events
navLinksParent.addEventListener("click", function (e) {
  styleClickedLink(e.target);
});

// functions
function styleClickedLink(clickedLink) {
  if (clickedLink.classList.contains("nav-link")) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });
    clickedLink.classList.add("active");
  }
}

function displayCards(weatherData) {
  let cards = "";
  for (let index = 0; index < 3; index++) {
    if (index === 0) {
      cards += ` <div class="col-md-6 col-lg-4 ">
            <div class="card card_${index + 1}">
              <div class="card-header d-flex justify-content-between">
                <p class="m-0">${new Date(
                  weatherData.forecast.forecastday[index].date
                ).toLocaleString("en-US", { weekday: "long" })}</p>
                <p class="m-0">${new Date(
                  weatherData.forecast.forecastday[index].date
                ).getDate()}${new Date(
        weatherData.forecast.forecastday[index].date
      ).toLocaleString("en-US", { month: "long" })}</p>
              </div>
              <div class="card-body py-5">
                <h5 class="card-title">${weatherData.location.name}</h5>
                <p class="card-text">${weatherData.current.temp_c}&deg;C</p>
                <div class="d-flex justify-content-between align-items-center status">
                  <img src="${weatherData.current.condition.icon}" alt="${
        weatherData.current.condition.text
      }">
                  <p class="m-0">${weatherData.current.condition.text}</p>
                </div>
                <div class="icons d-flex">
                  <div class="me-2">
                    <i class="fa-solid fa-umbrella"></i>
                    <span>${
                      weatherData.forecast.forecastday[index].day
                        .daily_chance_of_rain
                    }%</span>
                  </div>
                  <div class="me-2">
                    <i class="fa-solid fa-wind"></i>
                    <span>${weatherData.current.wind_kph}km/h</span>
                  </div>
                  <div>
                    <i class="fa-solid fa-compass"></i>
                    <span>${weatherData.current.wind_dir}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    } else {
      cards += `<div class="col-md-6 col-lg-4">
            <div class="card card_${index + 1} text-center">
              <div class="card-header">
                <p class="m-0">${new Date(
                  weatherData.forecast.forecastday[index].date
                ).toLocaleString("en-US", { weekday: "long" })}</p>
              </div>
              <div class="card-body py-5">
                <h5 class="card-title">
                  <img src="${
                    weatherData.forecast.forecastday[index].day.condition
                      .icon
                  }" alt="${
        weatherData.forecast.forecastday[index].day.condition.text
      }">
                </h5>
                <p class="card-text">${
                  weatherData.forecast.forecastday[index].day.maxtemp_c
                }&deg;C</p>
                <div class="status">
                  <p class="">${
                    weatherData.forecast.forecastday[index].day.mintemp_c
                  }&deg;</p>
                  <p class="m-0">${
                    weatherData.forecast.forecastday[index].day.condition
                      .text
                  }</p>
                </div>
              </div>
            </div>
          </div>`;
    }
  }
  weatherCardsContainer.innerHTML = cards;
}

getWeather("cairo");
function getWeather(city) {
  let req = new XMLHttpRequest();
  req.open(
    "GET",
    `http://api.weatherapi.com/v1/forecast.json?key=d185b75d38f2481da10172021241012&q=${city}&days=3`
  );
  req.send();
  req.responseType = "json";
  req.addEventListener("load", () => {
    if (req.status >= 200 && req.status < 300) {
      let weatherDetails = req.response;
      console.log(weatherDetails);
      displayCards(weatherDetails);
    }
  });
}
