/************* IMPORTS *************/
import { createTable, createRow, createCol } from "./board.js"

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class Hex{
    
    constructor(player1, player2){
        this._player1 = player1;
        this._player2 = player2;
        this._board;
        this.initializeBoard();
        this._flag = 0;
    }

    initializeBoard(){

    }

    start(){

    }

    reset(){
        this.initializeBoard();
        this._flag = 0;
        this._player1.reset();
        this._player2.reset();
        this.start();
    }


    createBoard(){
        
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
            firstCol.style.marginLeft = `${row*31}px `;

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

    changeRules(){
        // Change game title in header
        document.getElementById("game-title-current").innerHTML = "Hex";

        // Change game rules in rules lightbox
        document.getElementById("game-name").innerHTML = "Hex";
        document.getElementById("game-rules").innerHTML = "Players take turns placing their marks (X or O) in the hexagons \
        of their choosing. The winner must form a continous path from their \
        starting side to the opposite side by connecting the hexagons on their edges. \
        The four corners of the hexagon can be considered to be part of either of the \
        sides that they face.";
    }
}

export { Hex };