
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
    for (let row = 0; row < 25; row++){
        const nRow = document.createElement('tr');
        for(let col = 0; col < 50; col++){
            const nCol = document.createElement('td');
            nRow.appendChild(nCol);
        }
        fiveInARowTable.appendChild(nRow);
    }

    document.getElementById('board').appendChild(fiveInARowTable);

}

const hexBoard = () =>{

}

const mancalaBoard = () =>{

    // Single Table
    const mancalaTable = document.createElement('table');

    // Insert First Row 
    const row1 = document.createElement('tr');
    // Insert First Col with row span 2 
    let col2 = document.createElement('td');
    col2.rowSpan = "2";
    row1.appendChild(col2);

    // Loop through six cols 
    for(let i = 0; i < 6; i++){
        const nCol = document.createElement('td');
        row1.appendChild(nCol);
    }

    // Insert Second Col with row span 2 
    col2 = document.createElement('td');
    col2.rowSpan = "2";
    row1.appendChild(col2);

    mancalaTable.appendChild(row1);

    // Create row 2
    const row2 = document.createElement('tr');
    for(let i = 0; i < 6; i++){
        const nCol = document.createElement('td');
        row2.appendChild(nCol);
    }
    mancalaTable.appendChild(row2);
    document.getElementById('board').appendChild(mancalaTable);
    
}

const ticTacToe3DBoard = () =>{
    
    // Create 3 Seperate divs for tables
    const div = document.createElement('div');
    
    // Create 3 Seperate Tables
    const table = document.createElement('table');

    for(let row = 0; row < 3; row++){
        const nRow = document.createElement('tr');
        for(let col = 0; col < 3; col++){
            const nCol = document.createElement('td');
            nRow.appendChild(nCol);
        }
        table.appendChild(nRow);
    }
    div.appendChild(table);
    document.getElementById('board').appendChild(div);
    
}


const initializeBoard = (game) =>{
    switch(game){
        case "capture": 
            captureBoard();
            break;
        case "five-in-a-row": 
            fiveInARowBoard();
            break;
        case "hex": 
            hexBoard();
            break;
        case "mancala":
            mancalaBoard(); 
            break;
        case "tic-tac-toe-3d":
            ticTacToe3DBoard(); 
            ticTacToe3DBoard();
            ticTacToe3DBoard();
            break;
    }
}

export { initializeBoard };