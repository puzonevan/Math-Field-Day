/************* IMPORTS *************/
import { Player } from "../header/player.js";
import { createTable, createRow, createCol } from "./board.js"

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class Capture{
    
    constructor(player1, player2){
        this._player1 = player1; 
        this._player2 = player2;
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

        let currMoveRow;
        let currMoveCol;

        if(move === "O"){
            this._player1.lastMove = this._player1.currentMove;
            this._player1.currentMove = index;


            this.changeLastmove(this._player1.lastMove, "#0000FF");

            this.updateBoard(this._player1.currentMove, this._player1.lastMove, "O");

            console.log(this._board);


        }
        else if(move === "X"){
            this._player2.lastMove = this._player2.currentMove;
            this._player2.currentMove = index;

            this.changeLastmove(this._player2.lastMove, "#FF0000");

            this.updateBoard(this._player2.currentMove, this._player2.lastMove, "X");

            console.log(this._board);

        }
        // // Change the moves

        // this.lastMove = this.currentMove;
        // this.currentMove = index;

        // // Last move position
        // let lastMoveRow;
        // let lastMoveCol;

        // // Last move position
        // if(this.lastMove !== -1){
        //     lastMoveRow = Math.floor(this.lastMove / 6);
        //     lastMoveCol = this.lastMove % 6;
        // }
        
        // // Current move position 
        // let currMoveRow = Math.floor(this.currentMove / 6);
        // let currMoveCol = this.currentMove % 6;

        // if(move === "O"){
        //     document.getElementById("capture").children[lastMoveRow].children[lastMoveCol].style.background = "#0000FF";
        // }
        // else if(move === "X"){
        //     document.getElementById("capture").children[lastMoveRow].children[lastMoveCol].style.background = "#FF0000";
        // }
        // console.log(`${lastMoveRow}${lastMoveCol}`);
        // console.log(`${currMoveRow}${currMoveCol}`);

    }

    changeLastmove(lastMove, color){
        if(lastMove !== -1){
            let lastMoveRow = Math.floor(lastMove / 6);
            let lastMoveCol = lastMove % 6;
            document.getElementById("capture").children[lastMoveRow].children[lastMoveCol].style.background = `${color}`;
        }
    }

    updateBoard(currentMove, lastMove, move){
        if(lastMove !== -1){
            let lastMoveRow = Math.floor(lastMove / 6);
            let lastMoveCol = lastMove % 6;
            this._board[lastMoveRow][lastMoveCol] = "|";
        }
        let currMoveRow = Math.floor(currentMove / 6);
        let currMoveCol = currentMove % 6;

        this._board[currMoveRow][currMoveCol] = move;
        
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