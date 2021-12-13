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
                    // if(this.isValidMove(index)){
                        // Display the Y player's icon
                        square.setAttribute("class", "y-player");

                        // Player's Move 
                        this.move("O", index);

                        // X player's turn
                        this._flag = 1;
                    // }
                    // else{
                        // alert("Invalid move");
                    // }
                }
                else if(this._flag === 1){
                    if(this.isValidMove(index)){
                        // Display the X Player's icon 
                        square.setAttribute("class", "x-player");
                        // Player's Move 
                        this.move("X", index);
                        // Y Player's turn
                        this._flag = 0;
                    }
                    else{
                        alert("Invalid Move");
                    }
                }
            });
        });
    }

    checkDirection(direction, check, row, col){
        let offset = 1;
        let condition
        let rowCondition;
        let colCondition;
        switch(direction){
            case "up":
                condition = row - offset > -1;
                rowCondition = row - offset;
                colCondition = col;
                break;
        }

        while(condition){
            if(this._board[rowCondition][colCondition] === check){
                return true;
            }
            else if(this._board[rowCondition][colCondition] === "|"){
                return false;
            }
            else{
                offset++;
                switch(direction){
                    case "up":
                        condition = row - offset > -1;
                        rowCondition = row - offset;
                        colCondition = col;
                        break;
                }
            }
        }
        return false;
    }

    

    isValidMove(index){

        let move;
        this._flag === 1 ? move = "X" : move = "O";
        let enemy;
        this._flag === 1 ? enemy = "O" : enemy = "X";
        let player; 
        this._flag === 1 ? player = this._player2 : player = this._player1;

        // Check if new move is in range of Last Move
        console.log(`${move}${enemy}|${player.currentMove}|${player.lastMove}`);
        if(player.currentMove === -1 && player.lastMove === -1){
            return true;
        }

        let lastMove = player.currentMove;
        let newMoveRow = Math.floor(index / 6);
        let newMoveCol = index % 6;
        let lastMoveRow = Math.floor(lastMove / 6);
        let lastMoveCol = lastMove % 6;

        // Check Left and Right 
        if(newMoveRow === lastMoveRow){
            return true;
        }
        // Check Up and Down
        if(newMoveCol === lastMoveCol){
            return true;
        }
        // Check Diagonals
        if(Math.abs(newMoveCol - lastMoveCol) === Math.abs(newMoveRow - lastMoveRow)){
            return true;
        }
        
        return false;
        

        // // Check if new move is in range of enemy's current move 
        // let row = Math.floor(index / 6);
        // let col = index % 6;
       

        // // Check Up Direction
        // let offset = 1;
        // while(row - offset > -1){
        //     if(this._board[row - offset][col] === move){
        //         return false;
        //     }
        //     else if(this._board[row - offset][col] === "|"){
        //         break;
        //     }else{
        //         offset++;
        //     }
        // }
        
        // // Check Down Direction
        // offset = 1;
        // while(row + offset < 6){
        //     if(this._board[row + offset][col] === move){
        //         return false;
        //     }
        //     else if(this._board[row + offset][col] === "|"){
        //         break;
        //     }else{
        //         offset++;
        //     }
        // }

        // // Check Left Direction
        // offset = 1;
        // while(col - offset > -1){
        //     if(this._board[row][col - offset] === move){
        //         return false;
        //     }
        //     else if(this._board[row][col - offset] === "|"){
        //         break;
        //     }else{
        //         offset++;
        //     }
        // }

        // // Check Right Direction
        // offset = 1;
        // while(col + offset < 6){
        //     if(this._board[row][col + offset] === move){
        //         return false;
        //     }
        //     else if(this._board[row][col + offset] === "|"){
        //         break;
        //     }else{
        //         offset++;
        //     }
        // }

        
        // return true;

    }

    move(move, index){
        if(move === "O"){
            this._player1.lastMove = this._player1.currentMove;
            this._player1.currentMove = index;

            this.changeLastmove(this._player1.lastMove, "#0000FF");
            this.updateBoard(this._player1.currentMove, this._player1.lastMove, "O");
        }
        else if(move === "X"){
            this._player2.lastMove = this._player2.currentMove;
            this._player2.currentMove = index;

            this.changeLastmove(this._player2.lastMove, "#FF0000");
            this.updateBoard(this._player2.currentMove, this._player2.lastMove, "X");
        }
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
                nCol.style.height = "40px";
                nCol.style.width = "40px";
                nRow.appendChild(nCol);
            }
            captureTable.appendChild(nRow);
        }

        document.getElementById('board').appendChild(captureTable);
    }
}

export { Capture };