var button = document.getElementById('btn')
var httpRequest = new XMLHttpRequest();
var userInput = document.getElementsByTagName('input')[0]
var textColumnLeft1 = document.getElementById('leftColumnInput')
var localDive = document.getElementById('style-nav2')
var script = document.createElement('script');
var extraInfo1 = document.getElementById('extraInfo1')
var button2 = document.getElementById('button2')
var userInput2  = document.getElementById('idive1')
var long;
var lat;

var option;
var option1;
var option2;
var option3;
var optgroup;

var map;
var shape;
var icon;
var image;
var marker;

var globLat;
var globLong;
var globName;

var localId;

//travel breifing API


button.addEventListener("click", function(event) {
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object = JSON.parse(httpRequest.responseText)
      console.log(object)
      long = (object.results[0].geometry.location.lng)
      lat = (object.results[0].geometry.location.lat);
      getDiveSites(lat, long);

        }
      }    //here I am getting the latitude and Longitude from the location that requested.
    }

    httpRequest.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userInput.value +'&key=AIzaSyA42x7FNCeCrCZZiLRep6SE2sVWjT_dDrA')
    httpRequest.send();
})
// https://galvanize-cors-proxy.herokuapp.com/
function getDiveSites(lat, long){
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object2 = JSON.parse(httpRequest.responseText)
        for (var i = 0; i < object2.sites.length; i++) {
        globName = object2.sites[i].name;
        globLat = Number(object2.sites[i].lat);
        globLong = Number(object2.sites[i].lng);
        globId = object2.sites[i].id;
        globalContent = globName +":" + " " + "Lat" + " " + globLat + ", " + "Lng" + globLong + ", " + "iDive#" + " " + globId;
          globalMarkers(map, globalContent)
          map.setZoom(9);

        option = document.createElement("h2")
        option1 = document.createElement("p")
        option2 = document.createElement("p")
        option3 = document.createElement("p")
        option4 =document.createElement("b")

        textColumnLeft1.appendChild(option)
        option.innerHTML = object2.sites[i].name;
        textColumnLeft1.appendChild(option1)
        option1.innerHTML = "Latitude" + " " + object2.sites[i].lat + ", " + " " + "Longitude" + " " + object2.sites[i].lng;
        textColumnLeft1.appendChild(option2)
        option2.innerHTML = object2.sites[i].distance + " " + "Miles from the Longitute and Latitude of" + " " + userInput.value;
        textColumnLeft1.appendChild(option4)
        option4.innerHTML = "iDive #  " + " " + object2.sites[i].id;
            }
          }  //The lat and long is then passed into the dive API to retrieve the locations.
        }
      }
    httpRequest.open('GET', 'http://api.divesites.com/?mode=sites&lat=' + lat +'&lng=' + long + '&dist=30')
    httpRequest.send();
}
// local dive search with the localbutton click
localDive.addEventListener("click", function(event) {
  httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
      var object3 = JSON.parse(httpRequest.responseText)
      console.log(object3)
      for (var i = 0; i < object3.sites.length; i++) {
        localId = object3.sites[i].id;
        localName = object3.sites[i].name;
        localLat = Number(object3.sites[i].lat);
        localLong = Number(object3.sites[i].lng);
        contentString = localName +":" + " " + "Lat" + " " + localLat + ", " + "Lng" + localLong + ", " + "iDive#" + " " + localId;
        localMarkers(map, contentString);
        map.setZoom(8);
        option = document.createElement("h2")
        option1 = document.createElement("p")
        option2 = document.createElement("p")
        option3 = document.createElement("p")
        option4 = document.createElement("b")



        textColumnLeft1.appendChild(option)
        option.innerHTML = object3.sites[i].name;
        textColumnLeft1.appendChild(option3)
        option3.innerHTML = object3.request.loc.name;
        textColumnLeft1.appendChild(option1)
        option1.innerHTML = "Latitude" + " " + object3.sites[i].lat + ", " + " " +"Longitude" + " " + object3.sites[i].lng;
        textColumnLeft1.appendChild(option2)
        option2.innerHTML = object3.sites[i].distance + " " + "Miles from your current location"
        textColumnLeft1.appendChild(option4)
        option4.innerHTML = "iDive #  " + " " + object3.sites[i].id;
        }

          //figure out where I am then take the lat and long and send it
    }     //no lat or long needs to be passed into this since no parameters are used it defaults to the users location.
  }
}
      httpRequest.open('GET', 'http://api.divesites.com/?mode&dist=100')
      httpRequest.send();

//
//
});
//end local dive search


button2.addEventListener('click', function(event){
event.preventDefault()
extraInfo1.innerHTML = ("")

httpRequest.onreadystatechange = function(){
  if(httpRequest.readyState === 4){
    if(httpRequest.status < 400){
        var object4 = JSON.parse(httpRequest.responseText)
        for (var i = 0; i < object4.urls.length; i++) {
          console.log(object4.urls[i].name)
          var h4 = document.createElement("h4")
          var h5 = document.createElement("h5")
          extraInfo1.appendChild(h4)
          h4.innerHTML = object4.urls[i].name;
          extraInfo1.appendChild(h5)
          h5.innerHTML = object4.urls[i].url;

        }


      }
    }
  }
  httpRequest.open('GET', 'http://api.divesites.com/?mode=detail&siteid=' + userInput2.value)
  httpRequest.send();
})


function initMap() {
 map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: {lat: 39.7392, lng: -104.9903}
  });
  setMarkers(map);
}

function setMarkers(map) {
    shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };
    icon = {
    url: "https://images-na.ssl-images-amazon.com/images/I/31%2BAsK5M7dL.jpg", // url
    scaledSize: new google.maps.Size(15, 15), // scaled size
    origin: new google.maps.Point(0,0), // origin
  };
}


function localMarkers(map, contentString){

  var infowindow = new google.maps.InfoWindow({
    content: contentString

  });


var marker = new google.maps.Marker({
    position: {lat: localLat, lng: localLong},
    map: map,
    icon: image,
    shape: shape,
    icon: icon,
    draggable: false,
    animation: google.maps.Animation.DROP
  })

  marker.addListener('click', function() {
    infowindow.open(map, marker);

  });
 map.panTo(marker.position);
}


function globalMarkers(map, globalContent){
  var infowindow = new google.maps.InfoWindow({
    content: globalContent
  });

var marker = new google.maps.Marker({
    position: {lat: globLat, lng: globLong},
    map: map,
    icon: image,
    shape: shape,
    icon: icon,
    draggable: false,
    animation: google.maps.Animation.DROP
  })
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  map.panTo(marker.position);
}
