/************* IMPORTS *************/
import { createTable, createRow, createCol, hoverNone, hoverX} from "./board.js"

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class FiveInARow{
    
    constructor(player1, player2){
        this._player1 = player1; 
        this._player2 = player2;
        this._board = this.initializeBoard();
    }

    initializeBoard(){
        let board = [];
        for (let row = 0; row < 25; row++){
            let row = [];
            for(let col = 0; col < 50; col++){
                row.push("");
            }
            board.push(row);
        }
        return board;
    }

    
    
    start(){
        
        [...document.getElementsByTagName("td")].forEach((td) =>{
            td.addEventListener("mouseover", hoverX(td));
            td.addEventListener("mouseout", hoverNone(td));
            td.addEventListener("click", () =>{
                // td.removeEventListener("mouseover", this.hoverO(td));
                // td.removeEventListener("mouseout", this.hoverNone(td));
                td.style.background = "center no-repeat url('source/assets/images/icons/o-icon.png')";
            });
        });
        
    }

    

    turn(player){

    }

    static createBoard(){
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
}

export { FiveInARow };