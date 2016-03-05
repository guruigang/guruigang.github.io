$(document).ready(function() {
	initializeNav();
    

   //console.log(window.location.href);
   //console.log(location.pathname.split('/').pop());
   var current_page = location.pathname.split('/').pop();
   if(current_page == 'myEvents.html'){
       $(".navbar #myEvents").addClass('active');
   }
   else if(current_page == 'combineSchedule.html'){
       $(".navbar #nav_friend").addClass('active');
   }
   else if(current_page == 'createEvent.html'){
       $(".navbar #createEvent").addClass('active');
   }
   
})

function initializeNav() {
   
    var htmlStr2 ='<nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><a class="navbar-brand" href="myEvents.html">URoar</a></div><div class="collapse navbar-collapse" id="myNavbar"><ul class="nav navbar-nav"><li id="myEvents"><a href="myEvents.html">Home</a></li><li id="createEvent"><a href="createEvent.html">Create Event</a></li><li><a href="#">Friends</a></li></ul><ul class="nav navbar-nav navbar-right"><li><a href="#"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li></ul></div></div></nav>';

    $("#navbar").html(htmlStr2);    
}

function logout() {
    window.location.href = 'index.html';
}