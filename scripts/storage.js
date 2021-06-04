let count = 0;
let boardMemory = [];

for(let i = 0; i < 1000; i++){
    let boardObj = {
        undoMemory:[],
        undoIndex : -1,
        memory : [],  
        memoryIndex : -1,
        redoMemory : [],
        redoIndex : -1,
    };
    boardMemory.push(boardObj);
}


