/************* IMPORTS *************/
import { Player } from "../header/player.js";
import { createTable, createRow, createCol } from "./board.js"

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class Capture{
    
    constructor(player1, player2){
        this._player1 = player1; 
        this._player2 = player2;
        this.currentMove = -1;
        this.lastMove = -1;
        this._board = [[]];
        this.initializeBoard();
        this._flag = 0;
    }

    /**
     * initialize the behind the scenes board 
     */
    initializeBoard(){
        let board = [];
        for (let row = 0; row < 6; row++){
            let row = [];
            for(let col = 0; col < 6; col++){
                row.push("");
            }
            board.push(row);
        }
        this._board = board;
    }

    /**
     * start the game 
     */
    start(){
        // Loop through each square
        [...document.getElementsByTagName("td")].forEach((square, index) =>{

            // Each square listens for a player move(click)
            square.addEventListener("click", () =>{

                // Do nothing if there is already an X or O
                if(square.className === "y-player" || square.className === "x-player"){
                    return;
                }

                // O Player's move 
                if(this._flag === 0){

                    // Display the Y player's icon
                    square.setAttribute("class", "y-player");

                    // Player's Move 
                    this.move("O", index);

                    // X player's turn
                    this._flag = 1;
                }
                else if(this._flag === 1){

                    // Display the X Player's icon 
                    square.setAttribute("class", "x-player");

                    // Player's Move 
                    this.move("X", index);

                    // Y Player's turn
                    this._flag = 0;
                }
            });
        });
    }

    move(move, index){

        // Change the moves
        this.lastMove = this.currentMove;
        this.currentMove = index;

        // Last move position
        let lastMoveRow;
        let lastMoveCol;

        // Last move position
        if(this.lastMove !== -1){
            lastMoveRow = Math.floor(this.lastMove / 6);
            lastMoveCol = this.lastMove % 6;
        }
        
        // Current move position 
        let currMoveRow = Math.floor(this.currentMove / 6);
        let currMoveCol = this.currentMove % 6;

        if(move === "O"){
            document.getElementById("capture").children[lastMoveRow].children[lastMoveCol].style.background = "#0000FF";
        }
        else if(move === "X"){
            document.getElementById("capture").children[lastMoveRow].children[lastMoveCol].style.background = "#FF0000";
        }
        console.log(`${lastMoveRow}${lastMoveCol}`);
        console.log(`${currMoveRow}${currMoveCol}`);

    }

    /**
     * Reset the game
     */
    reset(){
        this.initializeBoard();
        this._flag = 0;
        this.start();
    }

    static createBoard(){
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
}

export { Capture };