/************* IMPORTS *************/
import { createTable, createRow, createCol } from "./board.js"

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class TicTacToe3D{
    
    constructor(player1, player2){
        this._player1 = player1;
        this._player2 = player2;
        this._board;
        this.initializeBoard();
        this._flag = 0;
    }

    initializeBoard(){
        let boards = [[], [], []];
        boards.forEach((board) =>{
            let tictactoe = ["","",""];
            board.push(tictactoe);
            board.push(tictactoe);
            board.push(tictactoe);
        });
        this._board = boards;
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
        // Create tables for 3 tables
        const tables = document.createElement('div');

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