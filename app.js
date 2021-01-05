document.querySelector("body").style.visibility="hidden";
document.querySelector(".loader-wrapper").style.visibility="visible";
window.addEventListener("load",function(){//loads the js file after the window is loaded...previously the js file was loaded even before the document..resulting in null 

document.querySelector("body").style.visibility="visible";

var map;
var popup;
var KEY='iZJj2zgL2jg5BVzGxBIbLAecxihIFr02';


  L.mapquest.key = KEY;
  popup = L.popup();//popup that comes on each random click on the map
  map = L.mapquest.map('map', {
    center: [22.594631436960263, 88.35439805499618],
    layers: L.mapquest.tileLayer('map'),
    zoom: 12
  });

  //other controls
 map.addControl(L.mapquest.control());
    
  map.addEventListener("load",function(){
    document.querySelector(".lds-dual-ring").style.visibility="hidden";

  })
  L.mapquest.geocodingControl().addTo(map);//the search element
  document.querySelector(".mq-control").title="Search";


  map.addLayer(L.mapquest.trafficLayer());//adds traffic data to the map depending upon the availability 
        map.addLayer(L.mapquest.incidentsLayer());
        map.addLayer(L.mapquest.marketsLayer());


//reverse geocoding for the popup that comes on each random click
  map.on('click', function(e) {
  popup.setLatLng(e.latlng).openOn(this);
  L.mapquest.geocoding().reverse(e.latlng, generatePopupContent);
  });

  function generatePopupContent(error, response) {
  var location = response.results[0].locations[0];
  var street = location.street;
  var city = location.adminArea5;
  var state = location.adminArea3;
  popup.setContent(street + ', ' + city + ', ' + state);
  }      

document.querySelector("#directions-btn").addEventListener("click", function show()

  { 
     document.querySelector("#directions-btn").style.display="none";
     document.querySelector(".mq-control").style.visibility="hidden";
     document.querySelector(".close").style.display="block";
     document.querySelector(".mapquest-logo.logo-large.leaflet-control").style.left="-28.3rem";
     //the directions block
     L.control.zoom({
      position: 'topright'
    }).addTo(map);
  
    L.mapquest.directionsControl({
      routeSummary: {
        enabled: false
      },
      narrativeControl: {
        enabled: true,
        compactResults: false
      }
    }).addTo(map);
  })



  document.querySelector(".close").addEventListener("click" ,function (){
    
    
    document.querySelector(".leaflet-control-mapquest-directions ").style.display="none";
    document.querySelector("#directions-btn").style.display="block";
    document.querySelector(".mq-control").style.left="-27.2rem";
    document.querySelector(".mq-control").style.visibility="visible";
    document.querySelector(".close").style.display="none";
   
  })
})
