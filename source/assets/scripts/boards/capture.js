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
                    if(this.isValidMove(index)){
                        // Display the Y player's icon
                        square.setAttribute("class", "y-player");

                        // Player's Move 
                        this.move("O", index);

                        // X player's turn
                        this._flag = 1;
                    }
                    else{
                        alert("Invalid move");
                    }
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
    

    isValidMove(index){
        
        let player;
        let enemy; 
        this._flag === 1 ? player = this._player2 : player = this._player1;
        this._flag === 1 ? enemy = this._player1 : enemy = this._player2;

        // If first player's first turn 
        // -> any move is valid, return true
        if(player.currentMove === -1 && player.lastMove === -1 && enemy.currentMove === -1 && enemy.lastMove === -1){
            return true;
        }

        // If second player's first turn
        // -> only check if in range of enemy, should be false
        if(player.currentMove === -1 && player.lastMove === -1){
            return !this.isInRangeOf(index, enemy.currentMove);
        }

        // when player is moving, we need to check two things
        // 1. Their new move is in range of the last move 
        // 2. Their new move is not in range of the current enemy move
        let inRangeLastMove = this.isInRangeOf(index, player.currentMove);
        let inRangeEnemy = this.isInRangeOf(index, enemy.currentMove);
        
        // Debugging 
        // console.log(`Is in range of last move: ${inRangeLastMove}`);
        // console.log(`Is in range of enemy move: ${inRangeEnemy}`);

        return inRangeLastMove && !inRangeEnemy;

    }

    isInRangeOf(newMove, otherMove){
        let newMoveRow = Math.floor(newMove / 6);
        let newMoveCol = newMove % 6;
        let otherMoveRow = Math.floor(otherMove / 6);
        let otherMoveCol = otherMove % 6;

        let checkWall = (row, col) => {
            if(this._board[row][col] === "|"){
                return true;
            }
        }

        if(newMoveRow === otherMoveRow){
            // Check Left
            if(otherMoveCol > newMoveCol){
                // Check each square from new move to other move 
                for(let i = newMoveCol + 1; i < otherMoveCol; i++){
                    if(checkWall(newMoveRow, i)){
                        return false;
                    }
                }
                return true;
            }
            // Check Right
            if(otherMoveCol < newMoveCol){
                for(let i = newMoveCol - 1; i > otherMoveCol; i--){
                    if(checkWall(newMoveRow, i)){
                        return false;
                    }
                }
                return true;
            }
        }
        else if(newMoveCol === otherMoveCol){
            // Check Below
            if(otherMoveRow > newMoveRow){
                // Check each square from new move to enemy move 
                for(let i = newMoveRow + 1; i < otherMoveRow; i++){
                    if(checkWall(i, newMoveCol)){
                        return false;
                    }
                }
                return true;
            }
            // Check Above
            if(otherMoveRow < newMoveRow){
                for(let i = newMoveRow - 1; i > otherMoveRow; i--){
                    if(checkWall(i, newMoveCol)){
                        return false;
                    }
                }
                return true;
            }
        }
        else if(Math.abs(newMoveCol - otherMoveCol) === Math.abs(newMoveRow - otherMoveRow)){
            // Other move is on the bot right
            if(otherMoveCol > newMoveCol && otherMoveRow > newMoveRow){
                for(let i = 1; newMoveCol + i <= otherMoveCol; i++){
                    if(checkWall(newMoveRow + i, newMoveCol + i)){
                        return false;
                    }
                }
                return true;
            }
            // Other move is on the top left
            if(otherMoveCol < newMoveCol && otherMoveRow < newMoveRow){
                for(let i = 1; newMoveCol - i >= otherMoveCol; i++){
                    if(checkWall(newMoveRow - i, newMoveCol - i)){
                        return false;
                    }
                }
                return true;
            }
            // Other move is top right 
            if(otherMoveCol > newMoveCol && otherMoveRow < newMoveRow){
                for(let i = 1; i + newMoveCol <= otherMoveCol; i++){
                    if(checkWall(newMoveRow - i, newMoveCol + i)){
                        return false;
                    }
                }
                return true;
            }
            // Other move is bot left
            if(otherMoveCol < newMoveCol && otherMoveRow > newMoveRow){
                for(let i = 1; newMoveCol - i >= otherMoveCol; i++){
                    if(checkWall(newMoveRow + i, newMoveCol - i)){
                        return false;
                    }
                }
                return true;
            }
        }

        return false;
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