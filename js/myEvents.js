
var eventData;

var ref = new Firebase("https://uroar.firebaseio.com");
$(document).ready(function() {
	initializePage();


})



function initializePage() {



 ref.child('users').on("child_added", function(snapshot) {
    console.log(snapshot.val());

 

  // Add the compiled html to the page
    if(snapshot.val().event != null ){
      $(".display-cards").append(displayEvents(snapshot.val(),snapshot.key()));
      eventData = snapshot.val();
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

function displayEvents(data,key){
  var index;
  var html = '';

 console.log("key is " + key);
  html += '<div class="w3-card-2"><header class="w3-container w3-light-grey" id="cardTop">';
      var payload = data.filePayload;
      if (payload != null) {
        var imgId=data.name+"Icon";
        html+='<p  id="cardHeader"><img class="userIcon" id='+imgId+' align="middle"> '+data.name+'</p></header><div class="w3-container" id='+key+' onclick="openDetailModal(this.id)" >';
        
        console.log("imgId is "+imgId);
        
      } else {
        html+='<p id="cardHeader"><img src="img/emptyIcon.jpg" class="userIcon" align="middle"> '+data.name+'</p></header><div class="w3-container" id='+key+' onclick="openDetailModal(this.id)">';
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

function openDetailModal(id){


  ref.child('users').child(id).on('value',function(snapshot){
    console.log(snapshot.val());
  

    $("#modal-content").html(displayModal(snapshot.val()));
      $('#myModal2').modal('show');
     console.log("the id  of the modal is "+ id);

  });







}

function displayModal(data){
  var html = '';
  var index;
  console.log("displayModal");

  html +='<div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
  html +='<h4 class="modal-title" id="myModalLabel">Event Detail</h4></div>';
  html +='<div class="modal-body"> <div class="container" id="modalContainer">';
  html +='<p><strong>Title: '+data.event.title+' </strong><span style="float:right" class="label label-pill label-default">'+data.event.number+' people</span></p>';
  html +='<p >Start At: '+data.event.time+'</p> ';
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
  html +=' <hr><p><strong>Location: </strong><span style="float:right" class="label label-pill label-default">10 mi</span></p>';
  html +=' <p>'+data.event.address+'</p><hr>';
  html +=' <p><Strong>Description</strong></p><p>'+data.event.description+'</p><hr>';
  html +=' </div></div>';
  html +=' <div class="modal-footer"><button type="button" class="btn btn-default" id="closeModal" data-dismiss="modal" onclick="closeModal()" >Close</button><button type="button" class="btn btn-info" id="jionModalBtn">Join</button></div>';
  return html;
}

function closeModal(){

  //$("#modal-content").empty();
}
