/********** TO DO **********/
// [X] Initialize Each Board 
// [ ] Class and Id's by Board
// [X] Export Function
// [ ] 


/////////////////////////////////////////////////////////////////////

/********** BOARD FUNCTIONS **********/
const captureBoard = () =>{

    // Single Table
    const captureTable = document.createElement('table');
    captureTable.setAttribute("class", "capture");
    captureTable.setAttribute("id", "capture");
    
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
    fiveInARowTable.setAttribute("class", "five-in-a-row");
    fiveInARowTbale.setAttribute("id", "five-in-a-row");

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

    // Single Table 
    const hexTable = document.createElement('table');
    hexTable.setAttribute("class", "hex");
    hexTable.setAttribute("id", "hex");

    // Five in a Row For loop: 30x30
    for (let row = 0; row < 12; row++){
        const nRow = document.createElement('tr');
        for(let col = 0; col < 12; col++){
            const nCol = document.createElement('td');
            nRow.appendChild(nCol);
        }
        hexTable.appendChild(nRow);
    }

    document.getElementById('board').appendChild(hexTable);

}

const mancalaBoard = () =>{

    // Single Table
    const mancalaTable = document.createElement('table');
    mancalaTable.setAttribute("class", "mancala");
    mancalaTable.setAttribute("id", "mancala");

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
    table.setAttribute("class", "tic-tac-toe-3d");
    table.setAttribute("id", "tic-tac-toe-3d");
    
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

/////////////////////////////////////////////////////////////////////

/********** EXPORT FUNCTIONS **********/
const initializeBoard = (game) =>{

    // Create the appropriate board 
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
            // 3D Tic Tac Toe requires three boards
            ticTacToe3DBoard(); 
            ticTacToe3DBoard();
            ticTacToe3DBoard();
            break;
    }
}

/////////////////////////////////////////////////////////////////////

/********** EXPORTS **********/
export { initializeBoard };