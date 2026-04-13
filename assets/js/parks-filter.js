(function () {
  var search = document.getElementById('search');
  var neighborhood = document.getElementById('neighborhood');
  var amenity = document.getElementById('amenity');
  var grid = document.getElementById('parks-grid');
  var count = document.getElementById('parks-count');

  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.park-card'));

  // --- Map setup ---
  var map = null;
  var markers = [];
  var mapEl = document.getElementById('parks-map');
  var parksDataEl = document.getElementById('parks-data');

  if (mapEl && parksDataEl && typeof L !== 'undefined') {
    var parks = JSON.parse(parksDataEl.textContent);

    map = L.map('parks-map').setView([41.8827, -87.6636], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(map);

    var greenIcon = L.divIcon({
      className: 'park-marker',
      html: '<div style="background:#6d28d9;width:12px;height:12px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -10]
    });

    parks.forEach(function (park) {
      if (!park.lat || !park.lng) return;
      var popup = '<h4><a href="' + park.url + '">' + park.title + '</a></h4>'
        + '<p>' + park.neighborhood + '</p>'
        + '<p>' + park.address + '</p>';
      var marker = L.marker([park.lat, park.lng], { icon: greenIcon })
        .bindPopup(popup)
        .addTo(map);
      marker._parkData = park;
      markers.push(marker);
    });
  }

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

    // Sync map markers with filters
    if (map && markers.length) {
      var visibleBounds = [];
      markers.forEach(function (marker) {
        var p = marker._parkData;
        var title = p.title.toLowerCase();
        var addr = p.address.toLowerCase();
        var mHood = p.neighborhood || '';
        var mAmenities = p.amenities || '';

        var matchSearch = !q || title.indexOf(q) !== -1 || addr.indexOf(q) !== -1;
        var matchHood = !hood || mHood === hood;
        var matchAmenity = !am || mAmenities.indexOf(am) !== -1;

        if (matchSearch && matchHood && matchAmenity) {
          marker.addTo(map);
          visibleBounds.push(marker.getLatLng());
        } else {
          map.removeLayer(marker);
        }
      });

      if (visibleBounds.length > 0 && (q || hood || am)) {
        map.fitBounds(L.latLngBounds(visibleBounds).pad(0.1));
      }
    }
  }

  search.addEventListener('input', filter);
  neighborhood.addEventListener('change', filter);
  amenity.addEventListener('change', filter);
})();
