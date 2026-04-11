(function () {
  var search = document.getElementById('search');
  var neighborhood = document.getElementById('neighborhood');
  var amenity = document.getElementById('amenity');
  var grid = document.getElementById('parks-grid');
  var count = document.getElementById('parks-count');

  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.park-card'));

  function filter() {
    var q = search.value.toLowerCase().trim();
    var hood = neighborhood.value;
    var am = amenity.value;
    var visible = 0;

    cards.forEach(function (card) {
      var name = card.querySelector('.park-card__name').textContent.toLowerCase();
      var addr = card.querySelector('.park-card__address').textContent.toLowerCase();
      var cardHood = card.getAttribute('data-neighborhood') || '';
      var cardAmenities = card.getAttribute('data-amenities') || '';

      var matchSearch = !q || name.indexOf(q) !== -1 || addr.indexOf(q) !== -1;
      var matchHood = !hood || cardHood === hood;
      var matchAmenity = !am || cardAmenities.indexOf(am) !== -1;

      if (matchSearch && matchHood && matchAmenity) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    count.textContent = visible;
  }

  search.addEventListener('input', filter);
  neighborhood.addEventListener('change', filter);
  amenity.addEventListener('change', filter);
})();
