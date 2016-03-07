var currUser = sessionStorage.getItem('currUid');
var ref = new Firebase("https://uroar.firebaseio.com");
var firebaseRef = 'https://uroar.firebaseio.com/';
var authData = ref.getAuth();

var spinner = new Spinner({color: '#ddd'});
$(document).ready(function() {
	initializePage();

    

 })

 function initializePage(){

    $("#upload-button").on('click', function() {
       $("#file-upload").click();
    });

  
    ref.child('users').child(authData.uid).on("value", function(snapshot) {
    console.log(snapshot.val());
    var data = snapshot.val();
    var uid="5ca06f8e-0c11-48fa-a218-4e43d0296d68";
    var email = data.email;
    var userName = data.name;
    

    console.log("email is"+email);
    $("#usernameText").text(userName);
    $("#emailText").text(email);
  }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
  } );

    var f = new Firebase(firebaseRef + '/users/'+authData.uid+'/filePayload');
    f.on('value', function(snap) {
      var payload = snap.val();
      if (payload != null) {
        document.getElementById("icon").src = payload;
      } else {
        $('#body').append("Not found");
      }

    });
 }
  


function handleFileSelect(evt) {
  var f = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = (function(theFile) {
    return function(e) {
      var filePayload = e.target.result;
      // Generate a location that can't be guessed using the file's contents and a random number
      //var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256(filePayload));
      var f = new Firebase(firebaseRef + 'users/'+authData.uid+'/filePayload');
      spinner.spin(document.getElementById('spin'));
      // Set the file payload to Firebase and register an onComplete handler to stop the spinner and show the preview
      f.set(filePayload, function() { 
        spinner.stop();
        document.getElementById("icon").src = e.target.result;
        $('#file-upload').hide();
        // Update the location bar so the URL can be shared with others
      });
    };
  })(f);
  console.log("f is "+ f);
  reader.readAsDataURL(f);
}



$(function() {
  console.log("button clicked");
  $('#spin').append(spinner);
    // No hash found, so render the file upload button.
    $('#file-upload').show();
    document.getElementById("file-upload").addEventListener('change', handleFileSelect, false);

    // A hash was passed in, so let's retrieve and render it.
   // spinner.spin(document.getElementById('spin'));
    var f = new Firebase(firebaseRef + '/users/'+authData.uid+'/filePayload');
    f.on('child_changed', function(snap) {
      var payload = snap.val();
      if (payload != null) {
        document.getElementById("icon").src = payload;
      } else {
        $('#body').append("Not found");
      }
      //spinner.stop();
    });
  
});

