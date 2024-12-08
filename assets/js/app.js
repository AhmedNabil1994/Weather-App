"use strict";
// DOM elements
const navLinksParent = document.querySelector("ul.navbar-nav");
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
