"use strict";
// DOM elements
const navLinksParent = document.querySelector("ul.navbar-nav");
const weatherCardsContainer = document.querySelector("#weather .row");
console.log(weatherCardsContainer);
// arrays

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
  let cardEls = "";
  for (let index = 0; index < 3; index++) {
    if (index === 0) {
      cardEls += ` <div class="col-md-6 col-lg-4 ">
            <div class="card card_${index+1}">
              <div class="card-header d-flex justify-content-between">
                <p class="m-0">Monday</p>
                <p class="m-0">9December</p>
              </div>
              <div class="card-body py-5">
                <h5 class="card-title">Cairo</h5>
                <p class="card-text">23.1oC</p>
                <div class="d-flex justify-content-between status">
                  <i class="fa-solid fa-sun"></i>
                  <p>Sunny</p>
                </div>
                <div class="icons d-flex">
                  <div class="me-2">
                    <i class="fa-solid fa-umbrella"></i>
                    <span>20%</span>
                  </div>
                  <div class="me-2">
                    <i class="fa-solid fa-wind"></i>
                    <span>18km/h</span>
                  </div>
                  <div>
                    <i class="fa-solid fa-compass"></i>
                    <span>East</span>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    } else {
      cardEls += `<div class="col-md-6 col-lg-4">
            <div class="card card_${index+1} text-center">
              <div class="card-header">
                <p class="m-0">Tuesday</p>
              </div>
              <div class="card-body py-5">
                <h5 class="card-title">
                  <i class="fa-solid fa-cloud-sun"></i>
                </h5>
                <p class="card-text">23.1oC</p>
                <div class="status">
                  <p class="">14.1o</p>
                  <p class="m-0">Partly Cloudy</p>
                </div>
              </div>
            </div>
          </div>`;
    }
  }
  weatherCardsContainer.innerHTML = cardEls
}

displayCards();
