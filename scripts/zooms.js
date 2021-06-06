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