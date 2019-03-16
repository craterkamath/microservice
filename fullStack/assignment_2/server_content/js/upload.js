var ip_addr = "52.72.177.105:80"

$(document).ready(function() {
  var api_call = "http://" + ip_addr + "/api/v1/categories"; 
  var list_cat = document.querySelector("#list");
  list_cat.innerHTML = " ";

  var sidebar = document.querySelector("#cat_list");
  sidebar.innerHTML = " ";

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var data = JSON.parse(xhttp.responseText);
       // alert(xhttp.status);
       // console.log(data);
       sidebar.innerHTML = " ";
       for (item in data){
         list_cat.innerHTML += (" \n <div class=\"dropdown-item\"><input class=\"btn btn-success\" onclick=\" getData(this) \" name=\"submit\" value=\"" + item + "\"></div>");
          sidebar.innerHTML += ("\n <li> \n <a href=\"index.html\">"+item+"</a> \n </li> \n");
       }
    }
  };
  xhttp.open("GET", api_call, true);
  xhttp.send();
});


function getData(element){


  var file = document.querySelector('#img1').files[0];  
  var reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function () {

      var capt = document.querySelector("#caption").value;
      var act_id = document.querySelector("#actid").value;
      var uname = document.querySelector("#uname").value;
      var file = document.querySelector('#img1').files[0];

      var bs64 = reader.result.split(",")[1];

      var category = element.value;
      var currentdate = new Date();
      var timestamp = moment(currentdate).format("DD-MM-YYYY:ss-mm-hh").toString();

      var keys = ['actId','username','timestamp','caption','categoryName',"imgB64"];

      var response_data = {};
      response_data[keys[0]] = act_id;
      response_data[keys[1]] = uname;
      response_data[keys[2]] = timestamp;
      response_data[keys[3]] = capt;
      response_data[keys[4]] = category;
      response_data[keys[5]] = bs64;


      var xhttp = new XMLHttpRequest();

      xhttp.open("POST", `http://${ip_addr}/api/v1/acts`, true);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4) {
          if(this.status==400){
              alert(this.status); 
          }
          else{
              console.log(this.status);
              t1 = window.setTimeout(function(){ window.location = "index.html"; },100);
            }
               
          }
        
       };

       console.log(response_data);
       xhttp.send(JSON.stringify(response_data));
   };

}


function initImageUpload(box) {
  let uploadField = box.querySelector('.image-upload');

  uploadField.addEventListener('change', getFile);

  function getFile(e){
    let file = e.currentTarget.files[0];
    checkType(file);
  }
  
  function previewImage(file){
    let thumb = box.querySelector('.js--image-preview'),
        reader = new FileReader();

    reader.onload = function() {
      thumb.style.backgroundImage = 'url(' + reader.result + ')';
    }
    reader.readAsDataURL(file);
    thumb.className += ' js--no-default';
  }

  function checkType(file){
    let imageType = /image.*/;
    if (!file.type.match(imageType)) {
      throw 'Datei ist kein Bild';
    } else if (!file){
      throw 'Kein Bild gewählt';
    } else {
      previewImage(file);
    }
  }
  
}

// initialize box-scope
var boxes = document.querySelectorAll('.box');

for (let i = 0; i < boxes.length; i++) {
  let box = boxes[i];
  initDropEffect(box);
  initImageUpload(box);
}



/// drop-effect
function initDropEffect(box){
  let area, drop, areaWidth, areaHeight, maxDistance, dropWidth, dropHeight, x, y;
  
  // get clickable area for drop effect
  area = box.querySelector('.js--image-preview');
  area.addEventListener('click', fireRipple);
  
  function fireRipple(e){
    area = e.currentTarget
    // create drop
    if(!drop){
      drop = document.createElement('span');
      drop.className = 'drop';
      this.appendChild(drop);
    }
    // reset animate class
    drop.className = 'drop';
    
    // calculate dimensions of area (longest side)
    areaWidth = getComputedStyle(this, null).getPropertyValue("width");
    areaHeight = getComputedStyle(this, null).getPropertyValue("height");
    maxDistance = Math.max(parseInt(areaWidth, 10), parseInt(areaHeight, 10));

    // set drop dimensions to fill area
    drop.style.width = maxDistance + 'px';
    drop.style.height = maxDistance + 'px';
    
    // calculate dimensions of drop
    dropWidth = getComputedStyle(this, null).getPropertyValue("width");
    dropHeight = getComputedStyle(this, null).getPropertyValue("height");
    
    // calculate relative coordinates of click
    // logic: click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center
    x = e.pageX - this.offsetLeft - (parseInt(dropWidth, 10)/2);
    y = e.pageY - this.offsetTop - (parseInt(dropHeight, 10)/2) - 30;
    
    // position drop and animate
    drop.style.top = y + 'px';
    drop.style.left = x + 'px';
    drop.className += ' animate';
    e.stopPropagation();
    
  }
}

// For Caption box

let input = document.querySelector(".input");
let placeholder = document.querySelector(".placeholder");
let underline = document.querySelector(".underline");

// add active classes to placeholder text and input field on click
input.addEventListener("click", () => {
  placeholder.classList.add("active");
  input.classList.add("active");
  underline.classList.add("active");
});

// remove active classes on blur if the input field is empty
input.addEventListener("blur", () => {
  if (input.value == "") {
    placeholder.classList.remove("active");
    input.classList.remove("active");
  underline.classList.remove("active");
  }
});