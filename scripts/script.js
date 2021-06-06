//********************VARIABLES STARTS**************************//

let index = 0; //Global index whick kept changing on changing of page/sheet
let bars = document.querySelector(".bars");
let tools = document.querySelector(".tools");
let board = document.querySelector(".board");
let fas = document.querySelectorAll(".fas");
let pencil = document.querySelector(".fa-pencil-alt");
let eraser = document.querySelector(".fa-eraser");
let colorPicker = document.querySelector(".color-picker");
let redColor = document.querySelector(".red");
let greenColor = document.querySelector(".green");
let blueColor = document.querySelector(".blue");
let blackColor = document.querySelector(".black");
let yellowColor = document.querySelector(".yellow");
let widthBox = document.querySelector(".width-box");
let eraserWidthBox = document.querySelector(".eraser-width-box");
let pencilSlider = document.querySelector(".pencil-slider");
let eraserSlider = document.querySelector(".eraser-slider");
let redoBtn = document.querySelector(".fa-redo");
let undoBtn = document.querySelector(".fa-undo");
let downloadBtn = document.querySelector(".fa-download");
let clipBoard = document.querySelector(".fa-clipboard");
let uploadBtn = document.querySelector(".fa-upload");
let lightMode = document.querySelector(".fa-sun");
let rightPanel = document.querySelector(".right-panel");
let newPage = document.querySelector(".fa-file");
let plusBtn = document.querySelector(".fa-plus");
let pageContainer = document.querySelector(".page-container");
let recordingBtn = document.querySelector('.fa-video');
let leftPanel = document.querySelector('.left-panel');
let undoMemory = boardMemory[index].undoMemory;
let undoIndex = boardMemory[index].undoIndex;
let memory = boardMemory[index].memory;
let memoryIndex = boardMemory[index].memoryIndex;
let redoMemory = boardMemory[index].redoMemory;
let redoIndex = boardMemory[index].redoIndex;
let zoomInBtn = document.querySelector(".fa-search-plus");
let zoomOutBtn = document.querySelector(".fa-search-minus");
let zoomLevel = 1;
let lastSelectedColor; //variable for previous seleced color of penc
let selectedColor = "black"; //to track color of current selected color

//**********************************************************************//

//********************PAGE and PlusBtn Functionality**********//
plusBtn.addEventListener("click", function () {
  count++;
  let div = pageCreator();
  pageContainer.appendChild(div);
  let pagesArr = document.querySelectorAll(".page");
  for (let i = 0; i < pagesArr.length; i++) {
    pagesArr[i].addEventListener("click", function (e) {
      index = e.currentTarget.getAttribute("number");
      console.log(index);
      draw();
    });
  }
});
//**********************************************//

//*****************Recording btn********************//
recordingBtn.addEventListener('click',function(){
  leftPanel.classList.toggle('left-panel-hidden');
});
//*************************************************//
// ********************page**Btn********************//
newPage.addEventListener("click", function () {
  rightPanel.classList.toggle("right-panel-hidden");
});
//**********************************************//

//******************Light/Dark Mode*******************/
lightMode.addEventListener("click", function () {
  lightMode.classList.toggle("on");
  tool.fillStyle = "#fff";
  tool.fillRect(0, 0, window.innerWidth, window.innerHeight);
  draw();
});
//************************************************/

//*********to change selecte tool color********//
for (let i = 0; i < fas.length; i++) {
  fas[i].addEventListener("click", function (e) {
    for (let i = 0; i < fas.length; i++) {
      fas[i].classList.remove("tool-active");
    }
    e.target.classList.add("tool-active");
  });
}
//**********************************************//

//*******************ANIMATION of Bars*********************/
bars.addEventListener("click", function () {
  bars.classList.toggle("change");
  tools.classList.toggle("tools-inactive");
});
//********************************************************/

board.height = window.innerHeight;
board.width = window.innerWidth;
let tool = board.getContext("2d");
window.addEventListener("resize", function () {
  board.height = window.innerHeight;
  board.width = window.innerWidth;
  draw();
});
draw();
// ========================Draw starts================
function draw() {
  if (lightMode.classList.contains("on")) {
    tool.fillStyle = "#fff";
    tool.fillRect(0, 0, window.innerWidth, window.innerHeight);
    console.log("ligh");
  } else {
    tool.fillStyle = "#333";
    tool.fillRect(0, 0, window.innerWidth, window.innerHeight);
    console.log("dark");
  }
  // tool.fillRect(0, 0, window.innerWidth,window.innerHeight);
  // drawing image on canvas from memory
  for (let i = 0; i <= boardMemory[index].memoryIndex; i++) {
    console.log("drawn");
    console.log(index);
    tool.putImageData(boardMemory[index].memory[i], 0, 0);
  }
  tool.lineCap = "round";
  tool.strokeStyle = selectedColor;
  tool.lineWidth = 3;
}
// =========================================================////

//-------------------pencil and eraser ----------------------////
pencil.addEventListener("click", function () {
  colorPicker.classList.add("unhide");
  widthBox.classList.add("unhide");
  eraserWidthBox.classList.remove("unhide");
  tool.lineWidth = pencilSlider.value;
  if (selectedColor == "#333") {
    console.log(selectedColor);
    selectedColor = lastSelectedColor;
    tool.strokeStyle = selectedColor;
  }
});

redColor.addEventListener("click", function () {
  selectedColor = "#eb3b5a";
  lastSelectedColor = "#eb3b5a";
  tool.strokeStyle = selectedColor;
});

greenColor.addEventListener("click", function () {
  selectedColor = "#20bf6b";
  lastSelectedColor = "#20bf6b";
  tool.strokeStyle = selectedColor;
});

blueColor.addEventListener("click", function () {
  selectedColor = "#45aaf2";
  lastSelectedColor = "#45aaf2";
  tool.strokeStyle = selectedColor;
});

blackColor.addEventListener("click", function () {
  selectedColor = "black";
  lastSelectedColor = "black";
  tool.strokeStyle = selectedColor;
});

yellowColor.addEventListener("click", function () {
  selectedColor = "#fed330";
  lastSelectedColor = "#fed330";
  tool.strokeStyle = selectedColor;
});

pencilSlider.addEventListener("change", function () {
  tool.lineWidth = pencilSlider.value;
});

pencil.addEventListener("dblclick", function () {
  colorPicker.classList.remove("unhide");
  widthBox.classList.remove("unhide");
});

eraser.addEventListener("click", function () {
  activeTool = "eraser";
  if (lightMode.classList.contains("on")) {
    selectedColor = "#fff";
  } else {
    selectedColor = "#333";
  }
  tool.strokeStyle = selectedColor;
  eraserWidthBox.classList.add("unhide");
  colorPicker.classList.remove("unhide");
  widthBox.classList.remove("unhide");
  tool.lineWidth = eraserSlider.value;
});

eraserSlider.addEventListener("change", function () {
  tool.lineWidth = eraserSlider.value;
});

eraser.addEventListener("dblclick", function () {
  eraserWidthBox.classList.remove("unhide");
});
//------------------------------------------------------------//

//----------------------------------PENCIL STROKE---------------//
let isMouseDown = false;
board.addEventListener("mousedown", function (e) {
  let x = e.clientX;
  let y = e.clientY;
  tool.lineCap = "round";
  tool.beginPath();
  tool.moveTo(x, y);
  isMouseDown = true;
});

board.addEventListener("mousemove", function (e) {
  let x = e.clientX;
  let y = e.clientY;
  tool.lineCap = "round";

  if (isMouseDown == true) {
    tool.lineTo(x, y);
    tool.stroke();
  }
});

board.addEventListener("mouseup", function (e) {
  let x = e.clientX;
  let y = e.clientY;
  tool.lineCap = "round";
  tool.lineTo(x, y);
  tool.stroke();
  // tool.closePath();
  isMouseDown = false;
  if (e.type != "mouseout") {
    console.log("added");
    boardMemory[index].memory.push(
      tool.getImageData(0, 0, window.innerWidth, window.innerHeight)
    );
    boardMemory[index].memoryIndex++;
    boardMemory[index].undoMemory.push(
      tool.getImageData(0, 0, window.innerWidth, window.innerHeight)
    );
    boardMemory[index].undoIndex++;
    console.log(boardMemory);
  }
});
//----------------------------------PENCIL STROKE END---------------//

//------------------DOWNLOAD BTN START----------------
downloadBtn.addEventListener("click", function () {
  let a = document.createElement("a");
  let url = board.toDataURL("image/png");
  a.href = url;
  a.download = "file.png";
  a.click();
  a.remove();
});
//---------------------------------------------------//

//-------------------------CLEAR CANVAS FNCTN START--------------------//
function clearCanvas() {
  if (lightMode.classList.contains("on")) {
    tool.fillStyle = "#fff";
  } else {
    tool.fillStyle = "#333";
  }
  tool.fillRect(0, 0, window.innerWidth, window.innerHeight);
  boardMemory[index].undoMemory = [];
  boardMemory[index].undoIndex = -1;
  boardMemory[index].memory = [];
  boardMemory[index].memoryIndex = -1;
}
//-------------------------------------------------------------//

// ==============================UNDOBTN STARTS=================//
undoBtn.addEventListener("click", function () {
  if (boardMemory[index].undoIndex < 0) {
    console.log(boardMemory);
    clearCanvas();
  } else if (boardMemory[index].undoIndex == 0) {
    boardMemory[index].redoMemory.push(boardMemory[index].undoMemory.pop());
    boardMemory[index].redoIndex++;
    console.log(boardMemory);
    clearCanvas();
  } else {
    console.log("deleted");

    boardMemory[index].memoryIndex--;
    boardMemory[index].memory.pop();
    boardMemory[index].undoIndex--;
    boardMemory[index].redoMemory.push(boardMemory[index].undoMemory.pop());
    boardMemory[index].redoIndex++;
    console.log(boardMemory);
    tool.putImageData(
      boardMemory[index].undoMemory[boardMemory[index].undoIndex],
      0,
      0
    );
  }
});
// ========================================================//

// ===============================redo btn start===========//
redoBtn.addEventListener("click", function () {
  if (boardMemory[index].redoIndex < 0) {
    console.log(boardMemory);
    draw();
  } else {
    console.log("redo");
    tool.putImageData(
      boardMemory[index].redoMemory[boardMemory[index].redoIndex],
      0,
      0
    );
    boardMemory[index].redoIndex--;
    let val = boardMemory[index].redoMemory.pop();
    boardMemory[index].undoMemory.push(val);
    boardMemory[index].undoIndex++;
    boardMemory[index].memory.push(val);
    boardMemory[index].memoryIndex++;
    console.log(boardMemory);
  }
});
// =====================================================//

// ======================ZOOMIN BTN===============================//
zoomInBtn.addEventListener("click", function () {
  if (zoomLevel < 2) {
    zoomLevel += 0.1;
    console.log("zoomed-in");
    tools.style.zIndex = "5";
    bars.style.zIndex = "5";
    board.style.transform = `scale(${zoomLevel})`;
  }
});
// ==============================================================//

//======================ZOOM_OUT_START============================//
zoomOutBtn.addEventListener("click", function () {
  if (zoomLevel > 1) {
    zoomLevel -= 0.1;
    tools.style.zIndex = "5";
    bars.style.zIndex = "5";
    console.log("zoomed-out");
    board.style.transform = `scale(${zoomLevel})`;
  }
});
//===============================================================//

// //***************************STICKY***********************//
// clipBoard.addEventListener("click", function () {
//   stickyContainer.classList.toggle("sticky-gone");
// });
// let remove = document.querySelector(".remove");
// let sticky = document.querySelector(".sticky");
// let minimize = document.querySelector(".minimize");
// let stickyContainer = document.querySelector(".sticky-container");
// dragElement(stickyContainer);

// remove.addEventListener("click", function () {
//   stickyContainer.classList.toggle("sticky-gone");
// });

// minimize.addEventListener("click", function () {
//   sticky.classList.toggle("sticky-hidden");
//   stickyContainer.classList.toggle("sticky-container-hide");
// });

// function dragElement(elmnt) {
//   var pos1 = 0,
//     pos2 = 0,
//     pos3 = 0,
//     pos4 = 0;
//   if (document.querySelector(".sticky-header")) {
//     /* if present, the header is where you move the DIV from:*/
//     document.querySelector(".sticky-header").onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = elmnt.offsetTop - pos2 + "px";
//     elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
//   }

//   function closeDragElement() {
//     /* stop moving when mouse button is released:*/
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }
// //******************************************************//



//**************PAGE CREATOR*********************//
function pageCreator() {
  let div = document.createElement("div");
  div.classList.add("page");
  let num = `${count}`;
  div.setAttribute("number", num);
  div.innerText = `Page-${count + 1}`;
  return div;
}
//**************************************//


