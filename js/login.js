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

       var ref = new Firebase("https://uroar.firebaseio.com");
       ref.createUser({
         email    : userEmail,
         password : passWord,
         userName: userName
       }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
             ref.child("users").child(userData.uid).set({
             name: userName
             });
             window.location.href = 'index.html';
             console.log("Successfully created user account with uid:", userData.uid);
          }
        });

     
        
       
    }
        
}


function authorizeLogin() {
    var userEmail = $('#inputEmail').val();
    var passWord = $('#inputPassword').val();
   

    
    
    if(userEmail==='' || passWord==='') {
        $('#logError').html('<p style="color:red;text-align:center;">ERROR: PLEASE ENTER BOTH EMAIL AND PASSWORD</p>');
        console.log("here");
    }else{
        var ref = new Firebase("https://uroar.firebaseio.com");
        ref.authWithPassword({
            email    : userEmail,
            password : passWord
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                window.location.href = 'myEvents.html';
                console.log("Authenticated successfully with payload:", authData);
            }
        });

    }

    
           
}

function cancel(){
 window.location.href = 'index.html';

}
