"use strict";
// DOM elements
const navLinksParent = document.querySelector("ul.navbar-nav");
const weatherCardsContainer = document.querySelector("#weather .row");
const searchInput = document.getElementById("search");
const numberInput = document.getElementById("number");
const addBtn = document.querySelector(".addBtn");
const searchErrorMsg = document.querySelector(".errr-msg-search");
const numberErrorMsg = document.querySelector(".errr-msg-number");

// variables
const baseURL = "https://api.weatherapi.com/v1";
const forecast = "/forecast.json";
const key = "d185b75d38f2481da10172021241012";

// events
navLinksParent.addEventListener("click", function (e) {
  styleClickedLink(e.target);
});

searchInput.addEventListener("input", function (e) {
  getWeather(e.target.value, numberInput.value || 3);
});

addBtn.addEventListener("click", function () {
  const numOfDays = +numberInput.value;
  if (validateNumInput()) {
    getWeather(searchInput.value || "cairo", numOfDays);
    // clear input
    numberInput.value = "";
  }
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

function displayCards(weatherData, numOfDays = 3) {
  let cards = "";
  for (let index = 0; index < numOfDays; index++) {
    if (index === 0) {
      cards += ` <div class="col-md-6 col-lg-4 box">
            <div class="card">
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
      cards += `<div class="col-md-6 col-lg-4 box">
            <div class="card text-center">
              <div class="card-header">
                <p class="m-0">${new Date(
                  weatherData.forecast.forecastday[index].date
                ).toLocaleString("en-US", { weekday: "long" })}</p>
              </div>
              <div class="card-body py-5">
                <h5 class="card-title">
                  <img src="${
                    weatherData.forecast.forecastday[index].day.condition.icon
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
                    weatherData.forecast.forecastday[index].day.condition.text
                  }</p>
                </div>
              </div>
            </div>
          </div>`;
    }
  }
  weatherCardsContainer.innerHTML = cards;
}

getWeather();
async function getWeather(city = "cairo", numOfDays = 3) {
  try {
    searchErrorMsg.classList.add("d-none");
    let res = await fetch(
      `${baseURL}${forecast}?key=${key}&q=${city}&days=${numOfDays}`
    );
    let weatherDetails = await res.json();
    if (res.ok) {
      console.log(weatherDetails);
      displayCards(weatherDetails, numOfDays);
      searchErrorMsg.classList.add("d-none");
    } else {
      console.log(weatherDetails.error);
      searchErrorMsg.innerHTML = "No matching location found.";
      searchErrorMsg.classList.remove("d-none");
    }
  } catch (error) {
    console.log(error);
    searchErrorMsg.innerHTML = "Invalid URL";
    searchErrorMsg.classList.remove("d-none");
  }
}

function validateNumInput() {
  const regex = /[1-7]/;
  if (regex.test(numberInput.value)) {
    numberErrorMsg.classList.add("d-none");
    return true;
  } else {
    numberErrorMsg.classList.remove("d-none");
    return false;
  }
}