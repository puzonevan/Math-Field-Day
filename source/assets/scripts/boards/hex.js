/************* IMPORTS *************/
import { createTable, createRow, createCol } from "./board.js"

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class Hex{
    
    constructor(){

    }

    static createBoard(){
        
        // Hex Table
        const hexTable = createTable("hex");

        // Remove table border
        hexTable.style.border = "none";

        // Hex loop: 12x12
        for (let row = 0; row < 12; row++){
            const nRow = createRow("hex", row);
            
            // Create the first column in order to offset 
            const firstCol = createCol("hex", 0);

            // Offset amount
            firstCol.style.marginLeft = `${row*19}px `;

            // Inner Div
            const firstDiv = document.createElement("div");
            firstCol.appendChild(firstDiv);

            // Append to nRow
            nRow.appendChild(firstCol);

            // Loop through rest of columns
            for(let col = 1; col < 11; col++){
                const nCol = createCol("hex", col);
                const firstDiv = document.createElement("div");
                nCol.appendChild(firstDiv);
                nRow.appendChild(nCol);
            }
            hexTable.appendChild(nRow);
        }

        document.getElementById('board').appendChild(hexTable);

    }
}

export { Hex };