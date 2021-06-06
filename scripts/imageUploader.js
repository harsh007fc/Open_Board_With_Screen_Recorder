//*************CODE FOR IMG UPLOADLOADING***************//

let imgContainer = document.querySelector(".img-container");
function CreateImgContainer() {
  let imgHeader = document.createElement("div");
  imgHeader.classList.add("img-header");
  let removeImg = document.createElement("div");
  removeImg.classList.add("remove-img");
  let minimizeImg = document.createElement("div");
  minimizeImg.classList.add("minimize-img");
  imgHeader.appendChild(removeImg);
  imgHeader.appendChild(minimizeImg);
  let imageDivContainer = document.createElement("div");
  imageDivContainer.classList.add("image-div-container");
  let picture = document.createElement("img");
  picture.classList.add("picture");
  picture.setAttribute("alt", "");
  imageDivContainer.appendChild(picture);
  imgContainer.appendChild(imgHeader);
  imgContainer.appendChild(imageDivContainer);
  console.log(imgContainer);
  document.body.appendChild(imgContainer);
}
let uplaodPic = document.querySelector(".pic");

uploadBtn.addEventListener("click", function () {
  uplaodPic.click();
  uplaodPic.addEventListener("change", function () {
    let file = uplaodPic.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function () {
        let result = reader.result;
        console.log(result);
        picture.src = result;
      };
      reader.readAsDataURL(file);
    }
  });
  CreateImgContainer();

  imgContainer.classList.toggle("img-gone");

  let removeImg = document.querySelector(".remove-img");
  removeImg.addEventListener("click", function () {
    imgContainer.classList.toggle("img-gone");
  });

  let picture = document.querySelector(" .picture");
  let minimizeImg = document.querySelector(".minimize-img");
  minimizeImg.addEventListener("click", function () {
    picture.classList.toggle("img-hidden");
    imgContainer.classList.toggle("img-container-hide");
  });

  dragElement(imgContainer);

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.querySelector(".img-header")) {
      /* if present, the header is where you move the DIV from:*/
      document.querySelector(".img-header").onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
});

//**************************************//