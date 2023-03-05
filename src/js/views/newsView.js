import View from "./view";

class NewsView extends View {
  _parentElement = document.querySelector(".news__slideshow");

  // _slide = document.querySelectorAll(".news__slide");
  _errorMessage = "We could not find this news stream";
  _message = "";
  // _btnRight = document.querySelector(".news__btn--right");
  // _btnLeft = document.querySelector(".news__btn--left");

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(result) {
    return `     
    <div class="news__slide">

    <div class="news__img"><img src="${result.image}" alt=''></div>

            <div class="news__description">

            <h3 class="news__title">${result.title}</h3>

            <blockquote class="news__text"><p>${
              result.summary
            }<a class=" news__anchor"href=${result.url}>Link Here...</a></p>
            </blockquote>
            
<div class="news__last">  <p class="news__author">-${result.author}</p>
<p class="news__date">${result.date.split("").slice(0, 10).join("")}</p></div>
          

            </div>
  </div>`;
  }

  slider() {
    const sliders = document.querySelectorAll(".news__slide");

    let curSlide = 0;
    const maxSlide = sliders.length;

    const goToSlide = function (slides) {
      sliders.forEach(
        (s, i) => (s.style.transform = `translateX(${115 * (i - slides)}%)`)
      );
    };

    const scaleSlide = function (slides) {
      sliders.forEach((s, i) => {
        if (slides != i) {
          s.style.scale = `${0.8}`;
          s.style.opacity = `${0.9}`;
          // s.style.filter = `blur(${1}px)`;
        } else {
          s.style.scale = `${1}`;
          s.style.opacity = `${1}`;
          // s.style.filter = `blur(${0}px)`;
        }
      });
    };
    const nextSlide = function () {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      goToSlide(curSlide);
      scaleSlide(curSlide);
    };

    const prevSlide = function () {
      if (curSlide === 0) {
        curSlide === maxSlide - 1;
      } else {
        curSlide--;
      }
      goToSlide(curSlide);
      scaleSlide(curSlide);
    };

    const init = function () {
      goToSlide(0);
      scaleSlide(0);
    };

    init();

    const btnLeft = document.querySelector(".news__btn--left");
    const btnRight = document.querySelector(".news__btn--right");

    btnLeft.addEventListener("click", function (e) {
      prevSlide();
    });
    btnRight.addEventListener("click", function (e) {
      nextSlide();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") prevSlide();
      e.key === "ArrowRight" && nextSlide();
    });
  }

  //observer
  intersection() {
    const allSections = document.querySelectorAll("section");

    const revealSection = function (entries, observer) {
      const [entry] = entries;

      if (!entry.isIntersecting) return;
      entry.target.classList.remove("section--hidden");
      observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });

    allSections.forEach(function (section) {
      sectionObserver.observe(section);
      section.classList.add("section--hidden");
    });
  }
}

export default new NewsView();
