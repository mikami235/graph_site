var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.761404999999996, lng: 139.813953333},
    zoom: 15
  });
  // Markerの初期設定
  var markerOpts = {
  position: {lat:35.76, lng:139.81},
  map: map,
  title: "marker test"
  };
  // 直前で作成したMarkerOptionsを利用してMarkerを作成
  var marker = new google.maps.Marker(markerOpts);

}


