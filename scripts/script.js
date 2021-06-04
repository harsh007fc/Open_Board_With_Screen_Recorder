//********************VARIABLES STARTS**************************//
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
let uploadBtn = document.querySelector('.fa-upload');
let lightMode = document.querySelector('.fa-sun');
let undoMemory = [];
let undoIndex = -1;
let memory = [];
let memoryIndex = -1;
let redoMemory = [];
let redoIndex = -1;
let zoomInBtn = document.querySelector(".fa-search-plus");
let zoomOutBtn = document.querySelector(".fa-search-minus");
let zoomLevel = 1;
let lastSelectedColor; //variable for previous seleced color of penc 
let selectedColor = "black"; //to track color of current selected color
//**********************************************************************//

//*********************Light/Dark Mode*******************/
lightMode.addEventListener('click',function(){
    lightMode.classList.toggle('on');
    tool.fillStyle = "#fff";
    tool.fillRect(0, 0, window.innerWidth,window.innerHeight);
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

//*******************ANIMATION************************/
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
    if(lightMode.classList.contains('on')){
        tool.fillStyle = "#fff";
        tool.fillRect(0, 0, window.innerWidth,window.innerHeight);
        console.log("ligh");
    }
    else{
        tool.fillStyle = "#333";
        tool.fillRect(0, 0, window.innerWidth,window.innerHeight);
        console.log("dark");
    }
    // tool.fillRect(0, 0, window.innerWidth,window.innerHeight);
    for (let i = 0; i <= memoryIndex; i++) {
        console.log("drawn");
        tool.putImageData(memory[i], 0, 0);
    }
    tool.strokeStyle = selectedColor;
    tool.lineWidth = 3;
}
// draw();
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
    // tool.strokeStyle = "#eb3b5a";
});


greenColor.addEventListener("click", function () {
    selectedColor = "#20bf6b";
    lastSelectedColor = "#20bf6b";
    tool.strokeStyle = selectedColor;
    // tool.strokeStyle = "#20bf6b";
});


blueColor.addEventListener("click", function () {
    selectedColor = "#45aaf2";
    lastSelectedColor = "#45aaf2";
    tool.strokeStyle = selectedColor;
    // tool.strokeStyle = "#45aaf2";
});


blackColor.addEventListener("click", function () {
    selectedColor = "black";
    lastSelectedColor = "black";
    tool.strokeStyle = selectedColor;
    // tool.strokeStyle = "black";
});


yellowColor.addEventListener("click", function () {
    selectedColor = "#fed330";
    lastSelectedColor = "#fed330";
    tool.strokeStyle = selectedColor;
    // tool.strokeStyle = "#fed330";
});


pencilSlider.addEventListener("change", function () {
    tool.lineWidth = pencilSlider.value
});


pencil.addEventListener("dblclick", function () {
    colorPicker.classList.remove("unhide");
    widthBox.classList.remove("unhide");
});


eraser.addEventListener("click", function () {
    activeTool = "eraser";
    // tool.strokeStyle = "#333";
    if(lightMode.classList.contains('on')){
        selectedColor = "#fff";
    }else{
        selectedColor = "#333";
    }
    // selectedColor = "#333";
    tool.strokeStyle = selectedColor;
    eraserWidthBox.classList.add("unhide");
    colorPicker.classList.remove("unhide");
    widthBox.classList.remove("unhide");
    tool.lineWidth = eraserSlider.value;

});


eraserSlider.addEventListener("change", function () {
    tool.lineWidth = eraserSlider.value
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
    tool.beginPath();
    tool.moveTo(x, y);
    isMouseDown = true;
});
board.addEventListener("mousemove", function (e) {
    let x = e.clientX;
    let y = e.clientY;


    if (isMouseDown == true) {
        tool.lineTo(x, y);
        tool.stroke();
    }
});
board.addEventListener("mouseup", function (e) {
    let x = e.clientX;
    let y = e.clientY;
    tool.lineTo(x, y);
    tool.stroke();
    // tool.closePath();
    isMouseDown = false;
    if (e.type != "mouseout") {
        console.log("added");
        memory.push(tool.getImageData(0, 0, window.innerWidth, window.innerHeight));
        memoryIndex++;
        undoMemory.push(tool.getImageData(0, 0, window.innerWidth, window.innerHeight));
        undoIndex++;
    }
    console.log(memory);
    console.log(undoMemory);


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
    if(lightMode.classList.contains('on')){
        tool.fillStyle = "#fff";
    }
    else{
        tool.fillStyle = "#333";
    }
    tool.fillRect(0, 0, window.innerWidth, window.innerHeight);
    undoMemory = [];
    undoIndex = -1;
    memory = [];
    memoryIndex = -1;
}
//-------------------------------------------------------------//

// ==============================UNDOBTN STARTS=================//
undoBtn.addEventListener("click", function () {
    if (undoIndex < 0) {
        // undoIndex--;
        // redoMemory.push(undoMemory.pop());
        // redoIndex++;
        clearCanvas();
    }
    else if (undoIndex == 0) {
        // undoIndex--;
        redoMemory.push(undoMemory.pop());
        redoIndex++;
        clearCanvas();
    }
    else {
        console.log("deleted");
        memoryIndex--;
        memory.pop();
        undoIndex--;
        redoMemory.push(undoMemory.pop());
        redoIndex++;
        tool.putImageData(undoMemory[undoIndex], 0, 0);
    }
})
// ========================================================//

// ===============================redo btn start===========//
redoBtn.addEventListener("click", function () {
    if (redoIndex < 0) {
        draw();
        //    alert("cant redo further")
    }
    else {
        console.log("redo");
        tool.putImageData(redoMemory[redoIndex], 0, 0);
        redoIndex--;
        let val = redoMemory.pop()
        undoMemory.push(val);
        undoIndex++;
        memory.push(val);
        memoryIndex++
    }
});
// =====================================================//


// ======================ZOOMIN BTN===============================//
zoomInBtn.addEventListener("click", function () {
    if (zoomLevel < 2) {
        zoomLevel += 0.1;
        console.log("zoomed-in");
        // board.style.zIndex = "-1";
        tools.style.zIndex = "5";
        bars.style.zIndex = "5";
        board.style.transform = `scale(${zoomLevel})`;
    }
})
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
})
//===============================================================//


//***************************STICKY***********************//
clipBoard.addEventListener("click",function(){
    stickyContainer.classList.toggle("sticky-gone");
});
let remove = document.querySelector(".remove");
let sticky = document.querySelector(".sticky");
let minimize = document.querySelector(".minimize");
let stickyContainer = document.querySelector(".sticky-container");
// let bcg = document.querySelector(".bcg");
dragElement(stickyContainer);

remove.addEventListener("click", function () {
    stickyContainer.classList.toggle("sticky-gone");
})
minimize.addEventListener("click", function () {
    sticky.classList.toggle("sticky-hidden");
    stickyContainer.classList.toggle("sticky-container-hide");

})

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.querySelector(".sticky-header")) {
        /* if present, the header is where you move the DIV from:*/
        document.querySelector(".sticky-header").onmousedown = dragMouseDown;
    }
    //  else {
    //     /* otherwise, move the DIV from anywhere inside the DIV:*/
    //     elmnt.onmousedown = dragMouseDown;
    // }

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
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
//******************************************************//

//*************IMG UPLOAD***************//


let imgContainer = document.querySelector('.img-container');
function CreateImgContainer(){
    // let imgContainer = document.createElement('div');
    // imgContainer.classList.add('img-container');
    let imgHeader = document.createElement('div');
    imgHeader.classList.add('img-header');
    let removeImg = document.createElement('div');
    removeImg.classList.add('remove-img');
    let minimizeImg = document.createElement('div');
    minimizeImg.classList.add('minimize-img');
    imgHeader.appendChild(removeImg);
    imgHeader.appendChild(minimizeImg);
    let imageDivContainer = document.createElement('div');
    imageDivContainer.classList.add('image-div-container');
    let picture = document.createElement('img');
    picture.classList.add('picture');
    picture.setAttribute('alt','');
    imageDivContainer.appendChild(picture);
    imgContainer.appendChild(imgHeader);
    imgContainer.appendChild(imageDivContainer);
    console.log(imgContainer);
    document.body.appendChild(imgContainer);
}
let uplaodPic = document.querySelector('.pic');

uploadBtn.addEventListener('click',function(){
    uplaodPic.click();
    uplaodPic.addEventListener('change',function(){
        let file = uplaodPic.files[0];
        if(file){
            let reader = new FileReader();
            reader.onload = function(){
                let result = reader.result;
                console.log(result);
                picture.src = result;
            }
            reader.readAsDataURL(file);
        }
    });
    CreateImgContainer();
    
    imgContainer.classList.toggle('img-gone');

    let removeImg = document.querySelector('.remove-img');
    removeImg.addEventListener("click", function () {
        imgContainer.classList.toggle("img-gone");
        // console.log("gyaya")
    });

    let picture = document.querySelector(' .picture');
    // console.log(picture);
    let minimizeImg = document.querySelector('.minimize-img');
    // console.log(minimizeImg);

    minimizeImg.addEventListener("click", function () {
        picture.classList.toggle("img-hidden");
        imgContainer.classList.toggle("img-container-hide");

    });



    dragElement(imgContainer);

     function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
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
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
     }
});





//**************************************//
