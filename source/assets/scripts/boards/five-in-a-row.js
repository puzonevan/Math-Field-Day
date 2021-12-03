/************* IMPORTS *************/
import { createTable, createRow, createCol} from "./board.js"

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class FiveInARow{
    
    constructor(player1, player2){
        this._player1 = player1; 
        this._player2 = player2;
        this._board = this.initializeBoard();
        this._flag = 0;
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
            td.addEventListener("click", () =>{
                if(this._flag === 0){
                    td.setAttribute("class", "y-player");
                    this._flag = 1;
                }
                else if(this._flag === 1){
                    td.setAttribute("class", "x-player");
                    this._flag = 0;
                }
            })
        })
    }

    

    turn(player){
        if(player === "x"){
            [...document.getElementsByTagName("td")].forEach((td) =>{
                td.setAttribute("class", "x-move");
                td.addEventListener("click", () =>{
                    return;
                });
            });
        }
        else if(player === "o"){
            [...document.getElementsByTagName("td")].forEach((td) =>{
                td.setAttribute("class", "y-move");
                td.addEventListener("click", () =>{
                    return;
                });
            });
        }
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