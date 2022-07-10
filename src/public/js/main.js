function ready(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

(function () {
  ready(function () {
    console.log('dom loaded...')

    var slider = new KeenSlider("#c-slider")


  });
})();