/********** TO DO **********/
// [X] Initialize Each Board 
// [ ] Class and Id's by Board
// [X] Export Function
// [ ] 

/////////////////////////////////////////////////////////////////////

/********** HELPER FUNCTIONS **********/

/**
 * createTable - creates table object and set appropriate classes and id's
 * @param {""} game name of the game
 * @returns table DOM
 */
const createTable = (game) =>{

    // Create Table and set attributes
    const table = document.createElement("table");
    table.setAttribute("class", game);
    table.setAttribute("id", game);

    return table;
}

/**
 * createRow - creates Row object and set appropriate classes and id's
 * @param {""} game name of the game
 * @param {#} row table's row number
 * @returns row DOM
 */
const createRow = (game, row) =>{

    // Create Row and set attributes
    const newRow = document.createElement("tr");
    newRow.setAttribute("id", `row-${row}`);
    
    return newRow;
}

/**
 * createCol - creates Col object and set appropriate classes and id's
 * @param {""} game name of the game 
 * @param {#} col table's col number
 * @returns col DOM
 */
const createCol = (game, col) =>{

    // Create Col and set attributes 
    const newCol = document.createElement("td");
    newCol.setAttribute("id", `col-${col}`);

    return newCol;
}



/////////////////////////////////////////////////////////////////////

/********** BOARD FUNCTIONS **********/

/**
 * captureBoard - creates and adds Capture Board
 */
const captureBoard = () =>{

    // Capture Table
    const captureTable = createTable("capture");
    
    // Capture Grid: 6x6 
    for (let row = 0; row < 6; row++){

        // New Row
        const nRow = createRow("capture", row);
        
        for(let col = 0; col < 6; col++){
            const nCol = createCol("capture", col);
            nRow.appendChild(nCol);
        }
        captureTable.appendChild(nRow);
    }

    document.getElementById('board').appendChild(captureTable);

}

const fiveInARowBoard = () =>{

    // Five in a Row Table
    const fiveInARowTable = createTable("five-in-a-row");

    // Five in a Row Grid: 30x30
    for (let row = 0; row < 25; row++){

        // Create new row 
        const nRow = createRow("five-in-a-row", row);
        for(let col = 0; col < 50; col++){

            // Create new col
            const nCol = createCol("five-in-a-row", col);
            nRow.appendChild(nCol);

        }

        // Append Row to table
        fiveInARowTable.appendChild(nRow);
    }

    // Append table to board div
    document.getElementById('board').appendChild(fiveInARowTable);

}

const hexBoard = () =>{

    // Hex Table
    const hexTable = createTable("hex");

    // Hex loop: 12x12
    for (let row = 0; row < 12; row++){
        const nRow = createRow("hex", row);
        for(let col = 0; col < 12; col++){
            const nCol = createCol("hex", col);
            nRow.appendChild(nCol);
        }
        hexTable.appendChild(nRow);
    }

    document.getElementById('board').appendChild(hexTable);

}

const mancalaBoard = () =>{

    // Mancala Table
    const mancalaTable = createTable("mancala");

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
    
    // Create div for table
    const div = document.createElement('div');

    // 3D Tic Tac Toe Table
    const table = createTable("tic-tac-toe-3d");
    
    for(let row = 0; row < 3; row++){
        const nRow = createRow("tic-tac-toe-3d", row);
        for(let col = 0; col < 3; col++){
            const nCol = createCol("tic-tac-toe-3d", col);
            nRow.appendChild(nCol);
        }
        table.appendChild(nRow);
    }
    div.appendChild(table);
    document.getElementById('board').appendChild(div);
    
}

/////////////////////////////////////////////////////////////////////

/********** EXPORT FUNCTIONS **********/

/**
 * initializeBoard - hub function used in other files to create appropriate board
 * @param {*} game name of the game
 */
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