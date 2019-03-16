jQuery(document).ready(function($){
  //open the side panel
  $('.slide-panel-button').on('click', function(event){
    event.preventDefault();
    $('.slide-panel').addClass('is-visible');
    $(".page-wrapper").removeClass("toggled");
  });
  
  //close the side panel
  $('.slide-panel').on('click', function(event){
    if( $(event.target).is('.slide-panel') || $(event.target).is('.slide-panel-close') ) { 
      $('.slide-panel').removeClass('is-visible');
      event.preventDefault();
      $(".page-wrapper").addClass("toggled");
    }
  });

  $("#upvote").click(function(){
    let upvote_count = parseInt($('#number_likes').text());
    $('#number_likes').text(upvote_count+1);
  });


});


$(".sidebar-dropdown > a").click(function() {


  $(".sidebar-submenu").slideUp(200);
  if (
    $(this)
      .parent()
      .hasClass("active")
  ) {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .parent()
      .removeClass("active");
  } else {
    $(".sidebar-dropdown").removeClass("active");
    $(this)
      .next(".sidebar-submenu")
      .slideDown(200);
    $(this)
      .parent()
      .addClass("active");
  }
});

$("#close-sidebar").click(function() {
  $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function() {
  $(".page-wrapper").addClass("toggled");
});
