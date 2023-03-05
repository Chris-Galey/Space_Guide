import icons from "url:../../img/icons.svg";
import View from "./view.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".launch__pagination");

  // Publisher
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".launch__btn");
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //// page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn launch__btn btn--next">Next</button>`;
    }

    //// last page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn launch__btn btn--prev">Prev</button>
      `;
    }
    //// other page
    if (curPage < numPages) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn launch__btn btn--prev">&lang; Prev</button>
      <button data-goto="${
        curPage + 1
      }" class="btn launch__btn btn--next">Next &rang;</button>`;
    }
    //// page 1, and no other pages
    return "";
  }
}

export default new PaginationView();
