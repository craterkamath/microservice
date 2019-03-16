var ip_addr = "52.72.177.105:80"

$(document).ready(function() {

  var btn_category = document.getElementById("add_category");
  btn_category.onclick = function(){
    let category_field = document.getElementById("category");
    let category = category_field.value;

    var api_call = "http://" + ip_addr + "/api/v1/categories"; 

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         console.log("Added category:" + category);
      }
    };

    xhttp.open("POST", api_call, true);
    xhttp.send("[\"" + category + "\"]");
    t1 = window.setTimeout(function(){ window.location = "index.html"; },100);
  }

  var btn_user = document.getElementById("add_user");
  btn_user.onclick = function(){

      let uname_field = document.getElementById("uname");
      let uname = uname_field.value;

      let pwd_field = document.getElementById("pwd");
      let pwd = pwd_field.value;

      let response_data = {};
      response_data["username"] = uname;
      response_data["password"] = CryptoJS.enc.Hex.stringify(CryptoJS.SHA1(pwd)).toString() ;
      console.log(CryptoJS.enc.Hex.stringify(CryptoJS.SHA1(pwd)).toString());
      
      var api_call = "http://" + ip_addr + "/api/v1/users"; 


      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           console.log("Added user:" + uname);
        }
      };

      xhttp.open("POST", api_call, true);
      xhttp.send(JSON.stringify(response_data));
      t1 = window.setTimeout(function(){window.location = "index.html"; },300);

  }

});




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