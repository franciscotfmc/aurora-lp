function ready(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeComments() {

  function getArray(id) {
    return window.document
      .getElementById(id)
      .children;
  }

  var max = getArray('c-slider')
    .length - 4;

  for (var index = 0; index < max; index++) {
    var comments = getArray('c-slider');
    var dots = getArray('commentsDots');
    var idxRemove = randomNumber(1, comments.length) - 1;
    comments[idxRemove].remove();
    dots[idxRemove].remove();
  }
}

function CommentsCarousel(slider) {
  this.document = window.document;

  this.arrowLeft = this.document
    .getElementById('commentsArrowLeft');
  this.arrowRight = this.document
    .getElementById('commentsArrowRight');
  this.dots = this.document
    .getElementById('commentsDots');

  this.setEvents = function () {
    this.arrowLeft
      .addEventListener('click', () => slider.prev());
    this.arrowRight
      .addEventListener('click', () => slider.next());

    Array.from(this.dots.children)
      .forEach(function (dot, idx) {
        dot.addEventListener('click',
          function () {
            slider.moveToIdx(idx);
          }
        );
      });

    slider.on('created', () => {
      this.updateClasses();
    });

    slider.on('optionsChanged', () => {
      this.updateClasses();
    });

    slider.on('slideChanged', () => {
      this.updateClasses();
    });

    this.updateClasses();
  }

  this.updateClasses = function () {
    var slide = slider.track.details.rel;

    slide === 0
      ? this.arrowLeft.classList.add('arrow-disabled')
      : this.arrowLeft.classList.remove('arrow-disabled');

    slide === slider.track.details.slides.length - 1
      ? this.arrowRight.classList.add('arrow-disabled')
      : this.arrowRight.classList.remove('arrow-disabled');

    Array.from(this.dots.children)
      .forEach(function (dot, idx) {
        idx === slide
          ? dot.classList.add('dot-active')
          : dot.classList.remove('dot-active');
      });
  }
}

(function () {
  ready(function () {
    randomizeComments();
    var slider = new KeenSlider('#c-slider');
    new CommentsCarousel(slider).setEvents();
  });
})();