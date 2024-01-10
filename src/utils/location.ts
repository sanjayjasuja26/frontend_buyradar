import { GEOCODE_API_KEY } from "app/constants"
// import geoip from "geoip-country"
// import jstz from 'jstz';

export const geoFindMe = () => {
  if (!navigator.geolocation) {

    return {
      latitude: "", longitude: "",
    }
  }
  function success(position: any) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // reverseGeocodingWithGoogle(longitude, latitude)
    displayLocation(latitude, longitude)
  }
  function error() {
    console.log("Unable to retrieve your location");
  }
  navigator.geolocation.getCurrentPosition(success, error);
}

function displayLocation(latitude: any, longitude: any) {
  var request = new XMLHttpRequest();
  var method = 'GET';
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + `&sensor=false&key=${GEOCODE_API_KEY}`;
  var async = true;

  request.open(method, url, async);
  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var data = JSON.parse(request.responseText);
    }
  };
  request.send();
};

export const getIPFromAmazon = () => {
  fetch("https://geolocation-db.com/json/").then(res => res.json()).then(data => {    
    localStorage.setItem('geolocation', JSON.stringify(data))
  })
  .catch(err => {
    console.log("@getIPFromAmazon", err) 
  })
}


export const getMyLatLong = async ()=>{
  function success(position: any) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    localStorage.setItem('lat_long', JSON.stringify({
      latitude,
      longitude
    }))
   
  }
  function error() {
    console.log("Unable to retrieve your location");
  }
 const data =   navigator.geolocation.getCurrentPosition(success, error)

}
