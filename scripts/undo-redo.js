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