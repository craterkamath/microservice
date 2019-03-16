var ip_addr = "52.72.177.105:80";

global_category = "";
global_act = "";
category_data = {};
category_count = -1;

function loadphotos(element){
  
  console.log(element);
  if (element){    
    var category = element.innerHTML;
    window.global_category = category;
  }

  console.log(window.global_category);
  var count_call = `http://${ip_addr}/api/v1/categories/${global_category}/acts/size`;

  var xhttp2 = new XMLHttpRequest();
  xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var data = JSON.parse(xhttp2.responseText);
       window.category_count =  parseInt(data[0]);
    }
  };

  xhttp2.open("GET", count_call, true);
  xhttp2.send();

  
  var api_call = `http://${ip_addr}/api/v1/categories/${global_category}/acts?start=1&end=${window.category_count}`; 
  console.log(window.category_count);
  var gallery = document.querySelector("#frame");
  gallery.innerHTML = " ";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var data = JSON.parse(xhttp.responseText);
       var k = 1;
       console.log(data);
       for (i in data){
          image = data[i];
          var wrapper = document.createElement("a");
          wrapper.setAttribute("class", "slide-panel-button");
          wrapper.setAttribute("tabindex", k.toString());
          k = k + 1;
          wrapper.setAttribute("id", image["actId"]);
          window.category_data[image["actId"]] = image;

          var img_wrapper = document.createElement("img");
          var imgURL = 'data:image/png;base64,' + image["imgB64"];
          img_wrapper.setAttribute("src", imgURL);
          wrapper.appendChild(img_wrapper);

          gallery.appendChild(wrapper);
       }

       ready_copy();
    }
  };
  xhttp.open("GET", api_call, true);
  xhttp.send();

}


function ready_copy(){

    $('.slide-panel-button').on('click', function(event){
      event.preventDefault();
      var img_id = this.id;
      window.global_act = this.id;
      var caption_wrapper = document.getElementById("caption");
      caption_wrapper.innerHTML = '"' + window.category_data[img_id]["caption"] + '"';

      var upvote_wrapper = document.getElementById("number_likes");
      upvote_wrapper.innerHTML = parseInt(window.category_data[img_id]["upvotes"]);


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

}




jQuery(document).ready(function($){

    var api_call = "http://" + ip_addr + "/api/v1/categories"; 

    var sidebar = document.querySelector("#cat_list");
    sidebar.innerHTML = " ";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var data = JSON.parse(xhttp.responseText);
         for (item in data){
            sidebar.innerHTML += (`\n <li> \n <a onclick="loadphotos(this)">${item}</a> \n </li> \n`);
            window.global_category = item;
         }
      }
    };
    xhttp.open("GET", api_call, true);
    xhttp.send();

    loadphotos(false);
    // ready_copy();
    
    var btn_upvote = document.querySelector("#upvote");
    btn_upvote.onclick = function(){
              let upvote_count = parseInt(category_data[window.global_act]["upvotes"]);
              category_data[window.global_act]["upvotes"] = (upvote_count + 1).toString();
              let upvote_call = `http://${ip_addr}/api/v1/acts/upvote`;


              var xhttp3 = new XMLHttpRequest();
              xhttp3.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("Upvote Sucessfull: " + window.global_act);
                }
              };

              xhttp3.open("POST", upvote_call, true);
              xhttp3.send("["+ window.global_act + "]");
              $('#number_likes').text(upvote_count+1);
          }

    var btn_delete = document.querySelector("#delete");

    btn_delete.onclick = function(){
              let image_id = window.global_act;
              let delete_call = `http://${ip_addr}/api/v1/acts/${window.global_act}`;

              var xhttp3 = new XMLHttpRequest();
              xhttp3.onreadystatechange = function() {
                // alert(this.status);
                if (this.readyState == 4 && this.status == 200) {
                    console.log("Delete Sucessfull: " + window.global_act);
                    t1 = window.setTimeout(function(){ window.location = "index.html"; },100);
                }
              };

              xhttp3.open("DELETE", delete_call, true);
              xhttp3.send();

    } 

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
