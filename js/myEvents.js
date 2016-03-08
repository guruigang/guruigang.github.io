


var ref = new Firebase("https://uroar.firebaseio.com");
$(document).ready(function() {
	initializePage();


})



function initializePage() {
     // Grab the template script
  var theTemplateScript = $("#cards-template").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);



 ref.on("child_added", function(snapshot) {
    console.log(snapshot.val());


  //Pass our data to the template
  var theCompiledHtml = theTemplate(snapshot.val());

  // Add the compiled html to the page
  $(".display-cards").append(displayEvents(snapshot.val()));

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

function displayEvents(contact){
  
  var html = '';



  html += '<li class="list-group-item contact">';
    html += '<div>';
      html += '<p class="lead">'+contact.name+'</p>';
      html += '<p>'+contact.email+'</p>';
      html += '<p><small title="'
                +contact.location.zip+'">'
                +contact.location.city
                +', '
                +contact.location.state
                +'</small></p>';
    html += '</div>';
  html += '</li>';
  return html;
}

