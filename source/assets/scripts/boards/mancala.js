/************* IMPORTS *************/
import { createTable, createRow, createCol } from "./board.js"

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class Mancala{
    
    constructor(){

    }

    static createBoard(){
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
}

export { Mancala };