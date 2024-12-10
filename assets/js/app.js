"use strict";
// DOM elements
const navLinksParent = document.querySelector("ul.navbar-nav");
const weatherCardsContainer = document.querySelector("#weather .row");
// variables
const url =
  "http://api.weatherapi.com/v1/forecast.json?key=d185b75d38f2481da10172021241012&q=cairo&days=3";
let weatherDetails;
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

function displayCards() {
  let cards = "";
  for (let index = 0; index < 3; index++) {
    if (index === 0) {
      cards += ` <div class="col-md-6 col-lg-4 ">
            <div class="card card_${index + 1}">
              <div class="card-header d-flex justify-content-between">
                <p class="m-0">${new Date(
                  weatherDetails.forecast.forecastday[index].date
                ).toLocaleString("en-US", { weekday: "long" })}</p>
                <p class="m-0">${new Date(
                  weatherDetails.forecast.forecastday[index].date
                ).getDate()}${new Date(
        weatherDetails.forecast.forecastday[index].date
      ).toLocaleString("en-US", { month: "long" })}</p>
              </div>
              <div class="card-body py-5">
                <h5 class="card-title">${weatherDetails.location.name}</h5>
                <p class="card-text">${weatherDetails.current.temp_c}&deg;C</p>
                <div class="d-flex justify-content-between align-items-center status">
                  <img src="${weatherDetails.current.condition.icon}" alt="${
        weatherDetails.current.condition.text
      }">
                  <p class="m-0">${weatherDetails.current.condition.text}</p>
                </div>
                <div class="icons d-flex">
                  <div class="me-2">
                    <i class="fa-solid fa-umbrella"></i>
                    <span>${
                      weatherDetails.forecast.forecastday[index].day
                        .daily_chance_of_rain
                    }%</span>
                  </div>
                  <div class="me-2">
                    <i class="fa-solid fa-wind"></i>
                    <span>${weatherDetails.current.wind_kph}km/h</span>
                  </div>
                  <div>
                    <i class="fa-solid fa-compass"></i>
                    <span>${weatherDetails.current.wind_dir}</span>
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
                  weatherDetails.forecast.forecastday[index].date
                ).toLocaleString("en-US", { weekday: "long" })}</p>
              </div>
              <div class="card-body py-5">
                <h5 class="card-title">
                  <img src="${
                    weatherDetails.forecast.forecastday[index].day.condition
                      .icon
                  }" alt="${
        weatherDetails.forecast.forecastday[index].day.condition.text
      }">
                </h5>
                <p class="card-text">${
                  weatherDetails.forecast.forecastday[index].day.maxtemp_c
                }&deg;C</p>
                <div class="status">
                  <p class="">${
                    weatherDetails.forecast.forecastday[index].day.mintemp_c
                  }&deg;</p>
                  <p class="m-0">${
                    weatherDetails.forecast.forecastday[index].day.condition
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

(function getWeather() {
  let req = new XMLHttpRequest();
  req.open("GET", url);
  req.send();
  req.responseType = "json";
  req.addEventListener("load", () => {
    if (req.status >= 200 && req.status < 300) {
      weatherDetails = req.response;
      console.log(weatherDetails);
      displayCards();
    }
  });
})();
