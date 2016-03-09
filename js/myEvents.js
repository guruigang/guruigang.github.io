


var ref = new Firebase("https://uroar.firebaseio.com");
$(document).ready(function() {
	initializePage();


})



function initializePage() {



 ref.child('users').on("child_added", function(snapshot) {
    console.log(snapshot.val());


 

  // Add the compiled html to the page
    if(snapshot.val().event != null ){
      $(".display-cards").append(displayEvents(snapshot.val()));
      var imgSrc = snapshot.val().filePayload;
      var imgId = snapshot.val().name+"Icon";
      if(imgSrc != null){
        document.getElementById(imgId).src =snapshot.val().filePayload;
      }
    }

  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


}


function joinEvent(id){

   console.log("button is id "+ id);   

  var el = document.getElementById(id);


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

function displayEvents(data){
  var index;
  var html = '';

  html += '<div class="w3-card-2"><header class="w3-container w3-light-grey" id="cardTop">';
      var payload = data.filePayload;
      if (payload != null) {
        var imgId=data.name+"Icon";
        html+='<p  id="cardHeader"><img class="userIcon" id='+imgId+' align="middle"> '+data.name+'</p></header><div class="w3-container" onclick="openDetailModal()" >';
        
        console.log("imgId is "+imgId);
        
      } else {
        html+='<p id="cardHeader"><img src="img/emptyIcon.jpg" class="userIcon" align="middle"> '+data.name+'</p></header><div class="w3-container" onclick="openDetailModal()">';
      }
     

     html+='<p ><strong class="eventTitle">'+data.event.title+'</strong><span style="float:right" class="label label-pill label-default">'+data.event.number+' people</span></p>';
     html+='<p>Start At: '+data.event.time+'</p>';
     for  (index = 0; index < data.event.tags.length; index++) {
        switch(data.event.tags[index]){
          case "sport":
            html+='<span class="label label-pill label-primary">Sport</span>';
          break;
          case "game":
            html+='<span class="label label-pill label-success">Game</span>';
          break;
          case "trip":
            html+='<span class="label label-pill label-info">Trip</span>';
          break;
          case "food":
            html+='<span class="label label-pill label-warning">Food</span>';
          break;
          case "R":
            html+='<span class="label label-pill label-danger">R</span>';
          break;
        }

     } 
     html+='<hr>';
     html+='<p><strong>Location: </strong><span style="float:right" class="label label-pill label-default">10 mi</span></p>';
     html+=data.event.address;
     html+='</div><button type="button" class="btn btn-default btn-block" id='+data.name+' onclick="joinEvent(this.id)">Join +</button></div>';


  return html;
}

function openDetailModal(){
  $('#myModal').modal('show');

}