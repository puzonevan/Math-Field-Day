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

        // Hex loop: 12x12
        for (let row = 0; row < 12; row++){
            const nRow = createRow("hex", row);
            const firstCol = createCol("hex", 0);
            firstCol.style.marginLeft = `${row*19}px `;
            const firstDiv = document.createElement("div");
            firstCol.appendChild(firstDiv);
            nRow.appendChild(firstCol);
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