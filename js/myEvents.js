


var ref = new Firebase("https://uroar.firebaseio.com");
$(document).ready(function() {
	initializePage();



})



function initializePage() {
     // Grab the template script
  var theTemplateScript = $("#cards-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);



 ref.on("value", function(snapshot) {
    console.log(snapshot.val());


  //Pass our data to the template
  var theCompiledHtml = theTemplate(snapshot.val());

  // Add the compiled html to the page
  $(".display-cards").append(theCompiledHtml);

  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


}


function joinEvent(){

      

  var el = document.getElementById("joinButton");


     if (el.firstChild.data == "Join +") 
    {
       el.style.backgroundColor = '#DA4453';
       el.firstChild.data = "Not Going";
      
    }
    else 
    {
     el.firstChild.data = "Join +";
     el.style.backgroundColor = ' #5cb85c';
    }


}


