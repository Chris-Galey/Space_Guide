import icons from "url:../../img/icons.svg";
import View from "./view.js";

class UpcomingView extends View {
  _parentElement = document.querySelector(".launch__list");
  _errorMessage = "We could not find the upcoming launches";
  _message = "";

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    // const options = {
    //   weekday: "short",
    //   era: "long",
    //   year: "numeric",
    //   month: "short",
    //   day: "numeric",
    //   timeZoneName: "short",
    // };

    return `          
    
    <li class="launch__item">
    <a class="launch__link ${
      result.id === id ? "launch__link--active" : ""
    }" href="#${result.id}">

    <h3 class="launch__name">${result.servicerName}</h3>
    <div class="launch__missionName">${result.missionName}</div>
    <div class="launch__start">${new Date(result.start)
      .toLocaleString("en-US")
      .replaceAll(",", " -")}</div>
    </a>

    </li>`;
  }
}

export default new UpcomingView();
