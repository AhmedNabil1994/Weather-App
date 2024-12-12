"use strict";
// Global DOM elements
const navLinksParent = document.querySelector("ul.navbar-nav");
const weatherCardsContainer = document.querySelector("#weather .row");
const searchInput = document.getElementById("search");
const numberInput = document.getElementById("number");
const addBtn = document.querySelector(".addBtn");
const searchErrorMsg = document.querySelector(".errr-msg-search");
const numberErrorMsg = document.querySelector(".errr-msg-number");

// Glabal Variables of API URL
const baseURL = "https://api.weatherapi.com/v1";
const forecast = "/forecast.json";
const key = "d185b75d38f2481da10172021241012";

// events
navLinksParent.addEventListener("click", function (e) {
  styleClickedLink(e.target);
});

/*
 * Fetches and displays weather data based on user input.
 * If no city is entered, defaults to "alexandria".
 * If no number of days is specified, defaults to 3 days.
 * e.target.value - The city entered by the user.
 * numberInput.value - The number of forecast days entered by the user.
 */
searchInput.addEventListener("input", function (e) {
  getWeather(e.target.value || "alexandria", numberInput.value || 3);
});

/*
 * Check if the number input is valid (1-7).
 * Fetch and display weather data based on user input.
 * Defaults to "alexandria" if no city is entered.
 * Defaults to 3 if no number is entered.
 * Clear the number input field after submission.
 */
addBtn.addEventListener("click", function () {
  if (validateNumInput()) {
    getWeather(searchInput.value || "alexandria", numberInput.value || 3);
  }
});

// functions
/**
 * @description Adds the "active" class to the clicked navigation link and removes it from all other navigation links.
 * @param {HTMLElement} clickedLink - The navigation link that was clicked.
 */
function styleClickedLink(clickedLink) {
  if (clickedLink.classList.contains("nav-link")) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });
    clickedLink.classList.add("active");
  }
}

/**
 * @description Dynamically generates and displays weather forecast cards for a specified number of days.
 * @param {Object} weatherData - The weather data object containing current, forecast, and location data.
 * @param {number} [numOfDays=3] - The number of forecast days to display. Defaults to 3.
 */
function displayCards(weatherData, numOfDays = 3) {
  let cards = "";
  // object destructuring
  const { current, forecast, location } = weatherData;
  for (let index = 0; index < numOfDays; index++) {
    if (index === 0) {
      cards += ` <div class="col-md-6 col-lg-4 box">
            <div class="card">
              <div class="card-header d-flex justify-content-between">
                <p class="m-0">${new Date(
                  forecast.forecastday[index].date
                ).toLocaleString("en-US", { weekday: "long" })}</p>
                <p class="m-0">${new Date(
                  forecast.forecastday[index].date
                ).getDate()} ${new Date(
        forecast.forecastday[index].date
      ).toLocaleString("en-US", { month: "long" })}</p>
              </div>
              <div class="card-body py-5">
                <h5 class="card-title">${location.name}</h5>
                <p class="card-text">${current.temp_c}&deg;C</p>
                <div class="d-flex justify-content-between align-items-center status">
                  <img src="${current.condition.icon}" alt="${
        current.condition.text
      }">
                  <p class="m-0">${current.condition.text}</p>
                </div>
                <div class="icons d-flex">
                  <div class="me-2">
                    <i class="fa-solid fa-umbrella"></i>
                    <span>${
                      forecast.forecastday[index].day.daily_chance_of_rain
                    }%</span>
                  </div>
                  <div class="me-2">
                    <i class="fa-solid fa-wind"></i>
                    <span>${current.wind_kph}km/h</span>
                  </div>
                  <div>
                    <i class="fa-solid fa-compass"></i>
                    <span>${current.wind_dir}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    } else {
      cards += `<div class="col-md-6 col-lg-4 box">
            <div class="card text-center">
              <div class="card-header d-flex justify-content-between">
                <p class="m-0">${new Date(
                  forecast.forecastday[index].date
                ).toLocaleString("en-US", { weekday: "long" })}</p>
                <p class="m-0">${new Date(
                  forecast.forecastday[index].date
                ).getDate()} ${new Date(
        forecast.forecastday[index].date
      ).toLocaleString("en-US", { month: "long" })}</p>
              </div>
              <div class="card-body py-5">
                <h5 class="card-title">
                  <img src="${
                    forecast.forecastday[index].day.condition.icon
                  }" alt="${forecast.forecastday[index].day.condition.text}">
                </h5>
                <p class="card-text">${
                  forecast.forecastday[index].day.maxtemp_c
                }&deg;C</p>
                <div class="status">
                  <p class="">${
                    forecast.forecastday[index].day.mintemp_c
                  }&deg;</p>
                  <p class="m-0">${
                    forecast.forecastday[index].day.condition.text
                  }</p>
                </div>
              </div>
            </div>
          </div>`;
    }
  }
  weatherCardsContainer.innerHTML = cards;
}

/**
 * @description Fetches weather data for a given city and displays weather forecast cards.
 * @param {string} [city="alexandria"] - The name of the city to fetch weather data for. Defaults to "alexandria".
 * @param {number} [numOfDays=3] - The number of forecast days to retrieve. Defaults to 3.
 */
async function getWeather(city = "alexandria", numOfDays = 3) {
  try {
    searchErrorMsg.classList.add("d-none");
    let res = await fetch(
      `${baseURL}${forecast}?key=${key}&q=${city}&days=${numOfDays}`
    );
    let weatherDetails = await res.json();
    if (res.ok) {
      displayCards(weatherDetails, numOfDays);
      searchErrorMsg.classList.add("d-none");
    } else {
      searchErrorMsg.innerHTML = "No matching location found.";
      searchErrorMsg.classList.remove("d-none");
    }
  } catch (error) {
    searchErrorMsg.innerHTML = "Invalid URL";
    searchErrorMsg.classList.remove("d-none");
  }
}
getWeather();

/**
 * @description Validates the input to ensure it is a number between 1 and 7 (inclusive).
 * @returns {boolean} - Returns `true` if the input is valid (a number between 1 and 7) or empty to show default number (3); otherwise, `false`.
 */
function validateNumInput() {
  const regex = /^[1-7]$/;
  if (regex.test(numberInput.value) || numberInput.value.length === 0) {
    numberErrorMsg.classList.add("d-none");
    return true;
  } else {
    numberErrorMsg.classList.remove("d-none");
    return false;
  }
}
