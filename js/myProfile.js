var currUser = sessionStorage.getItem('currUid');
console.log("currUser is "+ currUser);
$(document).ready(function() {
	initializePage();
    

 })
 function initializePage(){
  var ref = new Firebase("https://uroar.firebaseio.com");
  var authData = ref.getAuth();
  ref.child('users').child(authData.uid).on("value", function(snapshot) {
    console.log(snapshot.val());
    var data = snapshot.val();
    var uid="5ca06f8e-0c11-48fa-a218-4e43d0296d68";
    var email = data.email;

    

    console.log("email is"+email);
    $("#emailText").text(email);
  }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
  } );


 
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
  } else {
    console.log("User is logged out");
  }

 }
   