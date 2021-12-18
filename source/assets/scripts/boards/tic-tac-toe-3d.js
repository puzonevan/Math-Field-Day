/************* IMPORTS *************/
import { createTable, createRow, createCol } from "./board.js"
import { winnerLightbox } from "../header/winner.js";

/////////////////////////////////////////////////////////////////////
const winningConditions2D = [
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 6, 8],
    [0, 4, 8],
    [2, 4, 6],
]


/************* CAPTURE CLASS *************/
class TicTacToe3D{
    
    /**
     * Class Constructor
     * @param {Object} player1 - first player
     * @param {Object} player2 - second player
     */
    constructor(player1, player2){
        this._player1 = player1;
        this._player2 = player2;
        this._board;
        this.initializeBoard();
        this._flag = 0;
    }

    /**
     * initialize board attribute
     */
    initializeBoard(){
        let boards = [[], [], []];
        boards.forEach((board) =>{
            for(let i = 0; i < 3; i++){
                let tictactoe = ["","",""];
                board.push(tictactoe);
            }
        });
        this._board = boards;
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

                // O player's move
                if(this._flag === 0){

                    // Display the Y player's icon
                    square.setAttribute("class", "y-player");

                    this.move(index);

                    // X player's turn
                    this._flag = 1;
                }
                else if(this._flag === 1){

                    // Display the X Player's icon 
                    square.setAttribute("class", "x-player");

                    // Check code
                    this.move(index);

                    // O Player's turn
                    this._flag = 0;
                }
                
            });
        });
    }

    /**
     * change the board according to the move
     * @param {Number} index - move number
     */
    move(index){
        let boardPosition = Math.floor(index / 9);
        let row = Math.floor(index / 3) - 3*(boardPosition);
        let col = index % 3;

        this._flag == 0 ? this._board[boardPosition][row][col] = "O" : this._board[boardPosition][row][col] = "X";

        // console.log(`board: ${boardPosition}`);
        // console.log(`row: ${row}`);
        // console.log(`col: ${col}`);

        // console.log(this._board);
        if(this.checkWinner(boardPosition)){
            this._flag == 0 ? this.declareWinner(this._player1) : this.declareWinner(this._player2);
        }
        
    }

    /**
     * check if the current move just made is a winning move
     * @param {Number} board - board number
     * @returns true if the winning move creates a 3 in a row, false otherwise
     */
    checkWinner(board){
        let win = false;
        let move;
        this._flag == 0 ? move = "O" : move = "X";

        winningConditions2D.forEach((condition) =>{
            // Check if 3 in a row in current board
            let a = this._board[board][Math.floor(condition[0] / 3)][condition[0] % 3];
            let b = this._board[board][Math.floor(condition[1] / 3)][condition[1] % 3];
            let c = this._board[board][Math.floor(condition[2] / 3)][condition[2] % 3];

            if(a === move && b === move && c === move){
                win = true;
            }

            let d = this._board[0][Math.floor(condition[0] / 3)][condition[0] % 3];
            let e = this._board[1][Math.floor(condition[1] / 3)][condition[1] % 3];
            let f = this._board[2][Math.floor(condition[2] / 3)][condition[2] % 3];

            if(d === move && e === move && f === move){
                win = true;
            }

            d = this._board[0][Math.floor(condition[2] / 3)][condition[2] % 3];
            f = this._board[2][Math.floor(condition[0] / 3)][condition[0] % 3];
            if(d === move && e === move && f === move){
                win = true;
            }
        });

        // Check if 3 in a row stacked in any 9 spots
        for(let i = 0; i < 9; i++){
            let a = this._board[0][Math.floor(i / 3)][i % 3];
            let b = this._board[1][Math.floor(i / 3)][i % 3];
            let c = this._board[2][Math.floor(i / 3)][i % 3];

            if(a === move && b === move && c === move){
                win = true;
            }
        }

        return win;
    }

    /**
     * create the winner lightbox and display
     * @param {Object} player - player to be the winner
     */
    declareWinner(player){
        // Display the winner lightbox
        document.getElementById("board").style.filter = "blur(10px)";
        winnerLightbox.style.display = "flex";

        // Change the name to Player 2's name
        if(typeof player.name !== "string"){
            if(player === this._player2){
                document.getElementById("winner-name").innerHTML = `Player 2 wins!`;
            }
            else if(player === this._player1){
                document.getElementById("winner-name").innerHTML = `Player 1 wins!`;
            }
        }
        else{
            document.getElementById("winner-name").innerHTML = `${player.name} wins!`; 
        }
    }

    /**
     * Reset the game and players
     */
    reset(){
        this.initializeBoard();
        this._flag = 0;
        this._player1.reset();
        this._player2.reset();
        this.start();
    }

    /**
     * create the dom board 
     */
    createBoard(){
        // Create tables for 3 tables
        const tables = document.createElement('div');
        tables.style.display = "flex";

        // Create 3 tables 
        const table1 = createTable("tic-tac-toe-3d");
        const table2 = createTable("tic-tac-toe-3d");
        const table3 = createTable("tic-tac-toe-3d");

        for(let row = 0; row < 3; row++){
            // New Row 
            const nRow1 = createRow("tic-tac-toe-3d", row);
            const nRow2 = createRow("tic-tac-toe-3d", row);
            const nRow3 = createRow("tic-tac-toe-3d", row);
            
            for(let col = 0; col < 3; col++){
                const nCol1 = createCol("tic-tac-toe-3d", col);
                const nCol2 = createCol("tic-tac-toe-3d", col);
                const nCol3 = createCol("tic-tac-toe-3d", col);
                nRow1.appendChild(nCol1);
                nRow2.appendChild(nCol2);
                nRow3.appendChild(nCol3);
            }
            table1.appendChild(nRow1);
            table2.appendChild(nRow2);
            table3.appendChild(nRow3);
        }
        tables.appendChild(table1);
        tables.appendChild(table2);
        tables.appendChild(table3);

        document.getElementById('board').appendChild(tables);
    }

    /**
     * change the title and rules according to game
     */
    changeRules(){
        // Change game title in header
        document.getElementById("game-title-current").innerHTML = "3D Tic Tac Toe";

        // Change game rules in rules lightbox
        document.getElementById("game-name").innerHTML = "3D Tic Tac Toe";
        document.getElementById("game-rules").innerHTML = "Players take turns placing their marks(X or O). There are 3 grids that \
        are each 3x3. The game works similarly to tic tac toe where the winner \
        is decided by getting 3 marks in a row horizontally, vertically, or \
        diagonally. However, the winner can also win by getting three in a row \
        in the same spot of the 3 boards.";

    }

}

export { TicTacToe3D };