function ready(fn) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function gtag_report_conversion(event) {
  gtag('event', 'conversion', {
    'send_to': event
  });

  gtag('event', 'generate_lead', {
    'currency': 'BRL',
    'value': '10.50'
  });

  var transaction = this.event.target.parentElement.id +
    '-' + new Date().getTime()

  gtag('event', 'purchase', {
    transaction_id: transaction,
  });

  console.log(transaction)

  return false;
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
    .length - 6;

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

function ImgCarousel(slider) {
  this.document = window.document;

  this.dots = this.document
    .getElementById('imgDots');

  this.setEvents = function () {

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

    Array.from(this.dots.children)
      .forEach(function (dot, idx) {
        idx === slide
          ? dot.classList.add('img-dots-active')
          : dot.classList.remove('img-dots-active');
      });
  }
}

(function () {
  ready(function () {
    randomizeComments();
    var sliderComentarios = new KeenSlider('#c-slider');
    new CommentsCarousel(sliderComentarios).setEvents();

    var loaded = [];
    var images = [];

    for (var i = 1; i <= 12; i++) {
      images.push({
        webp: '/img/clinica-' + i + '.webp',
        jpg: '/img/clinica-' + i + '.jpg',
      })
    }

    function loadImages(s) {
      var slideIdx = s.track.details.rel;
      loaded[slideIdx] = true;

      s.slides.forEach((element, idx) => {
        if (loaded[idx]) {
          var onError = 'this.onerror=null;this.src="' +
            images[idx].jpg + '"';

          element.querySelector('img')
            .setAttribute('onerror', onError);

          element.querySelector('img')
            .setAttribute('src', images[idx].webp);

          element.querySelector('div.content')
            .classList.add('blur');

          var src = element.querySelector('div.content>img').src;
          var bg = "url('" + src + "')";

          element.querySelector('div.content').style
            .setProperty('--bg', bg);
        }
      });
    }

    var sliderEstrutura = new KeenSlider('#e-slider', {
      animationEnded: loadImages,
      created: loadImages,
      loop: false,
      initial: 0,
    });

    new ImgCarousel(sliderEstrutura)
      .setEvents();
  });
})();

function handlePhoneInput(e) {
  e.target.value = phoneMask(e.target.value)
}

function phoneMask(phone) {
  return phone.replace(/\D/g, '')
    .replace(/^(\d)/, '($1')
    .replace(/^(\(\d{2})(\d)/, '$1) $2')
    .replace(/(\d{4})(\d{1,5})/, '$1-$2')
    .replace(/(-\d{5})\d+?$/, '$1');
}

function postLead(id) {
  let data = {
    nome: document.getElementById('nome' + id).value,
    email: document.getElementById('email' + id).value,
    telefone: document.getElementById('telefone' + id).value
  };

  fetch('/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => {
    console.log("Request complete! response:", res);
  });
}