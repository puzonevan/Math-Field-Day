
const captureBoard = () =>{

    // Single Table
    const captureTable = document.createElement('table');

    // Capture Board: 6x6 Grid
    for (let row = 0; row < 6; row++){
        const nRow = document.createElement('tr');
        for(let col = 0; col < 6; col++){
            const nCol = document.createElement('td');
            nRow.appendChild(nCol);
        }
        captureTable.appendChild(nRow);
    }

    document.getElementById('board').appendChild(captureTable);

}

const fiveInARowBoard = () =>{

    // Single Table 
    const fiveInARowTable = document.createElement('table');

    // Five in a Row For loop: 30x30
    for (let row = 0; row < 6; row++){
        const nRow = document.createElement('tr');
        for(let col = 0; col < 6; col++){
            const nCol = document.createElement('td');
            nRow.appendChild(nCol);
        }
        captureTable.appendChild(nRow);
    }

    document.getElementById('board').appendChild(fiveInARowTable);
    
}

const hexBoard = () =>{

}

const mancalaBoard = () =>{

}

const ticTacToe3DBoard = () =>{

}


const initializeBoard = (game) =>{
    switch(game){
        case "capture": 
            captureBoard();
            break;
        case "five-in-a-row": 
            break;
        case "hex": 
            break;
        case "mancala": 
            break;
        case "tic-tac-toe-3d": 
            break;
    }
}

export { initializeBoard };