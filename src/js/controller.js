import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import launchView from "./views/launchView.js";
import upcomingView from "./views/upcomingView.js";
import paginationView from "./views/paginationView.js";
import newsView from "./views/newsView.js";

//parcel code
// if (module.hot) {
//   module.hot.accept();
// }

// Call and render specific launch data
const controlLaunch = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    launchView.renderSpinner();

    //// 0) Update results view to mark select search result.
    upcomingView.render(model.getUpcomingResultsPage());

    //// 1) Loading Launch
    await model.loadLaunch(id);

    //// 2) Rendering Markup
    launchView.render(model.state.launch);
  } catch (err) {
    launchView.renderError();
    console.log(err);
  }
};
controlLaunch();

/// Call and render all upcoming launch data
const controlUpcoming = async function () {
  try {
    upcomingView.renderSpinner();

    /////1) load search results
    await model.loadUpcoming();

    /////2) render results
    // upcomingView.render(model.state.upcoming.results);
    upcomingView.render(model.getUpcomingResultsPage());

    /////3) Render initial pagination buttons
    paginationView.render(model.state.upcoming);
  } catch (err) {
    upcomingView.renderError();
    console.log(err);
  }
};
controlUpcoming();

/// render pagination
const controlPagination = function (goToPage) {
  /////1) render NEW results
  upcomingView.render(model.getUpcomingResultsPage(goToPage));

  /////2) Render NEW pagination buttons
  paginationView.render(model.state.upcoming);
};

// call and render news data
const controlNews = async function () {
  try {
    //// 1) Load news
    await model.loadNews();

    //// 2) Render news
    await newsView.render(model.state.news);
    newsView.slider();
    newsView.intersection();
  } catch (err) {
    newsView.renderError();
  }
};
controlNews();

// subscriber
const init = function () {
  launchView.addHandlerRender(controlLaunch);
  paginationView.addHandlerClick(controlPagination);
};
init();

// // leaflet
// ////////////////////////////////////////////////////
// var map = L.map("map").setView([51.505, -0.09], 13);
// var marker = L.marker([51.5, -0.09]).addTo(map);

// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 19,
//   attribution:
//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map);
// //////////////////////////////////////
