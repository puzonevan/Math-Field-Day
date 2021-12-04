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
        let move = () =>{
            if(this._flag === 0){
                td.setAttribute("class", "y-player");
                this.xMove(index);
                this._flag = 1;
            }
            else if(this._flag === 1){
                td.setAttribute("class", "x-player");
                this.xMove(index);
                this._flag = 0;
            }
        }

        [...document.getElementsByTagName("td")].forEach((td, index) =>{
            td.addEventListener("click", () =>{

                // Do nothing if there is already an X or O
                if(td.className === "y-player" || td.className === "x-player"){
                    return;
                }

                if(this._flag === 0){
                    td.setAttribute("class", "y-player");
                    this.xMove(index);
                    this._flag = 1;
                }
                else if(this._flag === 1){
                    td.setAttribute("class", "x-player");
                    this.xMove(index);
                    this._flag = 0;
                }
            })
        })
    }

    xMove(index){
        let row = Math.floor(index / 50);
        let col = index % 50;
        this._board[row][col] = "X";
        console.log(this._board);
    }
    yMove(index){

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