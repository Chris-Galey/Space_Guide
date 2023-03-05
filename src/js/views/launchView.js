import icons from "url:../../img/icons.svg";
import View from "./view.js";

class LaunchView extends View {
  _parentElement = document.querySelector(".launch__slide");
  _errorMessage = "We could not find that launch, Try another one!";
  _message = "";

  // Hashchange Publisher
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
    // window.addEventListener("hashchange", controlLaunch());
    // window.addEventListener("load", controlLaunch());
  }

  _generateMarkup() {
    return `
    
    <div class="launch__img"><img src=${this._data.image} alt=""></div>
    <div class="launch__content">

    <div class="status">

    <h2>status</h2>
    <p>${this._data.statusName}</p>
    <p>Update: ${this._data.statusDesc}</p> 

    </div>

<div class="launch__mission">

<h2>mission</h2>
<p>Description: ${this._data.missionDesc}</p>
<p>Type: ${this._data.missionType}</p>
<p>Orbit: ${this._data.missionOrbit}</p>

</div>


<div class="launch__service">

<h2>servicer</h2>
<p>Name: ${this._data.servicerName}</p
<p>Type: ${this._data.servicerType}</p>
<p> Total launch attempt: ${this._data.servicerTotal}</p>
<p>Year-to-Date launch attempt: ${this._data.servicerAnnual}</p>

</div> 

</div>

`;
  }
}

export default new LaunchView();
