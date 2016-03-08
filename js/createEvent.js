var ref = new Firebase("https://uroar.firebaseio.com");
var currUser = sessionStorage.getItem('currUid');
var currGeoLoca = []; 
var addressGeo =[];
var geoFire = new GeoFire(ref.child("users").child(currUser).child("event"));
var groRef = geoFire.ref();
var authData = ref.getAuth();

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
              geoFire.set("Geocode", addressGeo).then(function() {
  				console.log("Provided key has been added to GeoFire");
			  }, function(error) {
  				console.log("Error: " + error);
			  });


          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
}



function pushEvent(userName,title,dateTime,numPeople,descrip){

  ref.child("events").child(authData.uid).set({
    author:userName,
    title:title,
    time:dateTime,
    number:numPeople,
    description:descrip
    });


}

function pushInfo(){
  //get Tags
  if ($("#eventInfo input:checkbox:checked").length > 0)
  {
    // any one is checked
    var tags=[];
    if(document.getElementById("sportLabelBox").checked==true){
      tags.push("sport");

    }
    if(document.getElementById("gameLabelBox").checked==true){
      tags.push("game");

    }
    if(document.getElementById("tripLabelBox").checked==true){
      tags.push("trip");

    }
    if(document.getElementById("foodLabelBox").checked==true){
      tags.push("food");

    }
    if(document.getElementById("rLabelBox").checked==true){
      tags.push("R");

    }

    console.log("tag has"+ tags.toString());

  }
  else
  {
    
  $( "#warning" ).append( "  <div class='alert alert-warning fade in'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>Warning!</strong> Please Choose one of the Tags.</div>" );
  return;
  
  }




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

  //push evet info under user
	ref.child("users").child(authData.uid).child("event").set({
		title:title,
    tags:tags,
		time:dateTime,
    address:address,
		number:numPeople,
		description:descrip
    });

  //get current user info
  ref.child('users').child(authData.uid).on("value", function(snapshot) {
    console.log(snapshot.val());
    var data = snapshot.val();
    var uid="5ca06f8e-0c11-48fa-a218-4e43d0296d68";
    var userName = data.name;

    
    pushEvent(userName,title,dateTime,numPeople,descrip);

  }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
  } );

}


function selectTag(labelId){

  var color;
  switch(labelId){
    case "sportLabel":
      color='#337ab7';
    break;
    case "gameLabel":
      color = '#5cb85c'
    break;
    case "tripLabel":
      color = '#5bc0de'
    break;
    case "foodLabel":
      color = '#f0ad4e'
    break;
    case "rLabel":
      color = '#d9534f'
    break;

  }
  var sportLabelColor = '#337ab7';
  var gameLabelColor ='#5cb85c';
  var tripLabelColor = '#5bc0de';
  var foodLabelColor ='#f0ad4e';
  var rLabelColor = '#d9534f';

  console.log("id is"+labelId);
  var el = document.getElementById(labelId);
  var idName = labelId+'Box';
  
  console.log (idName);

  var box = document.getElementById(idName);

  if (box.checked == false){
    box.checked=true;
    el.style.backgroundColor=color;

  }
  else{
    box.checked=false;
    el.style.backgroundColor='#D8D8D8';

  }
  

}