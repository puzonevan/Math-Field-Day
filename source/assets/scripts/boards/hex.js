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
            for(let col = 0; col < 12; col++){
                const nCol = createCol("hex", col);
                nRow.appendChild(nCol);
            }
            hexTable.appendChild(nRow);
        }

        document.getElementById('board').appendChild(hexTable);

    }
}

export { Hex };