//***************************STICKY***********************//
clipBoard.addEventListener("click", function () {
    stickyContainer.classList.toggle("sticky-gone");
  });
  let remove = document.querySelector(".remove");
  let sticky = document.querySelector(".sticky");
  let minimize = document.querySelector(".minimize");
  let stickyContainer = document.querySelector(".sticky-container");
  dragElement(stickyContainer);
  
  remove.addEventListener("click", function () {
    stickyContainer.classList.toggle("sticky-gone");
  });
  
  minimize.addEventListener("click", function () {
    sticky.classList.toggle("sticky-hidden");
    stickyContainer.classList.toggle("sticky-container-hide");
  });
  
  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.querySelector(".sticky-header")) {
      /* if present, the header is where you move the DIV from:*/
      document.querySelector(".sticky-header").onmousedown = dragMouseDown;
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
  //******************************************************//