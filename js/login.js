


var ref = new Firebase("https://uroar.firebaseio.com");
$(document).ready(function() {
	initializePage();


})



function initializePage() {
    

}


function signUpUser() {

    var userEmail=$('#regEmail').val();
    var userName = $('#regName').val();
    var passWord = $('#regPassword').val();
    var pwRepeat = $('#regPasswordAgain').val();
    var testName = sessionStorage.getItem(userName);
    var letters = /^[A-Za-z]+$/;
    var re = /^\w+$/;
    
    if(userEmail===''|| passWord==='' || pwRepeat==='' || userName==='') {
        $('#regError').html('<p style="color:red;text-align:center;">ERROR: PLEASE FILL OUT ALL FIELDS</p>');
        console.log("here");
    }
    else if(!(pwRepeat === passWord)) {
        console.log("here2");
        $('#regError').html('<p style="color:red;text-align:center;">ERROR: PASSWORDS DO NOT MATCH</p>');
    }
    else if (testName != null) {   

        $('#regError').html('<p style="color:red;text-align:center;">ERROR: USERNAME ALREADY EXIST</p>');
        
    }else if(!userName.substr(0,1).match(letters)) {
         $('#regError').html('<p style="color:red;text-align:center;">ERROR:FIRST LETTER OF USERNAME CAN ONLY BE LETTERS</p>');
    }else if (!re.test(userName.substr(1))) {
    	$('#regError').html('<p style="color:red;text-align:center;">ERROR:Username must contain only letters, numbers and underscores!</p>');	
    }
    else
    {

       
       ref.createUser({
         email    : userEmail,
         password : passWord,
         userName: userName
       }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
           
             console.log("Successfully created user account with uid:", userData.uid);

             ref.authWithPassword({
                    email: userEmail,
                    password: passWord,
                },signupLoginCallback);

          }
        });

     
        
       
    }
        
}

var signupLoginCallback = function(error,authData)
  {
    var userEmail=$('#regEmail').val();
    var userName = $('#regName').val();
    if (error) 
    {
      console.log("Login Failed!", error);
    } 
    else 
    {
      console.log("Authenticated successfully with payload:", authData);
      ref.child("users").child(authData.uid).set({
             email: userEmail,
             name: userName
             });

      window.location.href = 'index.html';
      
     
    }
  }


function authorizeLogin() {
    var userEmail = $('#inputEmail').val();
    var passWord = $('#inputPassword').val();
   

    
    
    if(userEmail==='' || passWord==='') {
        $('#logError').html('<p style="color:red;text-align:center;">ERROR: PLEASE ENTER BOTH EMAIL AND PASSWORD</p>');
        console.log("here");
    }else{
        ref.authWithPassword({
            email    : userEmail,
            password : passWord
        }, function(error, authData) {
            if (error) {
                switch (error.code) {
                case "INVALID_EMAIL":
                    $('#logError').html('<p style="color:red;text-align:center;">ERROR: The user account email is invalid</p>');
                    console.log("The specified user account email is invalid.");
                break;
                case "INVALID_PASSWORD":
                    $('#logError').html('<p style="color:red;text-align:center;">ERROR: The user account password is incorrect.</p>');
                    console.log("The specified user account password is incorrect.");
                break;
                case "INVALID_USER":
                  $('#logError').html('<p style="color:red;text-align:center;">ERROR: The user account does not exist.</p>');
                  console.log("The specified user account does not exist.");
                break;
                default:
                console.log("Error logging user in:", error);
    }




            } else {
                sessionStorage.setItem('currUid',authData.uid);
                window.location.href = 'myEvents.html';
                console.log("Authenticated successfully with payload:", authData);
            }
        });

    }

    
           
}



function cancel(){
window.location.href = 'index.html';

}




 var authDataCallback = function(authData) {
        console.log("authCallback Event is called from onAuth Event");
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
            userData = authData;


        } else {
            console.log("User is logged out");
            $(".status").html('You are not logged in!').show();
            userData = null;
            listRef = null;
        }
    }

    ref.onAuth(authDataCallback);