let localStorage = window.localStorage;
let boardMemory = [];
let boardObj = {
    undoMemory:[],
    undoIndex : -1,
    memory : [],  
    memoryIndex : -1,
    redoMemory : [],
    redoIndex : -1,
};
boardMemory.push(boardObj);
console.log(boardMemory);

