// import { __esModule } from "feather-icons";
import { async } from "regenerator-runtime";
import { API_URL, RES_PER_PAGE, API_NEWS_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  slider: {
    curSlide: 0,
    maxSlide: 10,
  },
  news: [],
  launch: {},
  upcoming: {
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};
console.log(state);

// Fetch News Data
export const loadNews = async function () {
  try {
    const data = await getJSON(`${API_NEWS_URL}`);

    state.news = data.map((el) => {
      return {
        image: el.imageUrl,
        title: el.title,
        summary: el.summary,
        author: el.newsSite,
        date: el.publishedAt,
        url: el.url,
      };
    });
  } catch (err) {
    throw err;
  }
};

//Fetch Specific Launch Data
export const loadLaunch = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    let { ...launch } = data;
    state.launch = {
      id: launch.id,
      statusName: launch.status.name,
      statusDesc: launch.status.description,
      start: launch.window_start,
      missionDesc: launch.mission.description,
      missionType: launch.mission.type,
      missionOrbit: launch.mission.orbit.name,
      padName: launch.pad.name,
      servicerName: launch.launch_service_provider.name,
      servicerType: launch.launch_service_provider.type,
      servicerTotal: launch.agency_launch_attempt_count,
      servicerAnnual: launch.agency_launch_attempt_count_year,
      image: launch.image,
      padName: launch.pad.name,
      padLong: launch.pad.longitude,
      padLat: launch.pad.latitude,
    };
  } catch (err) {
    throw err;
  }
};

//Fetch All Upcoming Data
export const loadUpcoming = async function () {
  try {
    const data = await getJSON(`${API_URL}`);

    console.log();
    state.upcoming.results = data.results.map((el) => {
      return {
        id: el.id,
        servicerName: el.launch_service_provider.name,
        missionName: el.name,
        statusName: el.status.name,
        start: el.window_start,
      };
    });
  } catch (err) {
    throw err;
  }
};

//Store pagination
export const getUpcomingResultsPage = function (page = state.upcoming.page) {
  state.upcoming.page = page;

  const start = (page - 1) * state.upcoming.resultsPerPage; //0;
  const end = page * state.upcoming.resultsPerPage; //4;

  return state.upcoming.results.slice(start, end);
};
