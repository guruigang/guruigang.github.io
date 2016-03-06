var ref = new Firebase("https://uroar.firebaseio.com");
var currUser = sessionStorage.getItem('currUid');
var currGeoLoca = []; 
var addressGeo =[];
var geoFire = new GeoFire(ref.child("users").child(currUser).child("event"));
var groRef = geoFire.ref();

$(document).ready(function() {

})

var placeSearch, autocomplete;


function initAutocomplete() {
   // Create the autocomplete object, restricting the search to geographical
   // location types.
    autocomplete = new google.maps.places.Autocomplete(
     /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')));
        // When the user selects an address from the dropdown, populate the address
    
     
 }



// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
           currGeoLoca[0] = position.coords.latitude;
           currGeoLoca[1] = position.coords.longitude;
           var geolocation = {
           lat: position.coords.latitude,
           lng: position.coords.longitude

           };
           var circle = new google.maps.Circle({
           center: geolocation,
           radius: position.coords.accuracy
           });
           autocomplete.setBounds(circle.getBounds());
         });
    }
}

function geocodeAddress(address) {
	    var geocoder = new google.maps.Geocoder;
        
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
                     
               
          	  console.log(results);
              console.log("lat is"+results[0].geometry.location);
              addressGeo[0] =results[0].geometry.location.lat();
              addressGeo[1] =results[0].geometry.location.lng();
              geoFire.set(address, addressGeo).then(function() {
  				console.log("Provided key has been added to GeoFire");
			  }, function(error) {
  				console.log("Error: " + error);
			  });


          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
}

function pushInfo(){
	var title = $('#titleInput').val();
	console.log("title is :" + title);
	var dateTime = $("#dateTimeInput").val().replace("T"," ");
	console.log("time is :" + dateTime);
	var address = autocomplete.getPlace().formatted_address;
	console.log("address is "+address);
	var numPeople = $('#numInput').val();
	var descrip = $('#descripInput').val();
	console.log("descrip is "+descrip);
	geocodeAddress(address);


	ref.child("users").child(currUser).child("event").set({
		title:title,
		time:dateTime,
		number:numPeople,
		description:descrip
    });

}
