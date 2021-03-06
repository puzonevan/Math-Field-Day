/************* IMPORTS *************/
import { createTable, createRow, createCol } from "./board.js";
import { winnerLightbox } from "../header/winner.js";

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class Capture{
    
    /**
     * Capture constructor
     * @param {Object} player1 - first player
     * @param {Object} player2 - second player
     */
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
                }
            });
        });
    }
    
    /**
     * check if player's move is valid
     * @param {Number} index - player's desired move
     * @returns true if valid move, false otherwise
     */
    isValidMove(index){
        
        let player = this._flag === 1 ? this._player2 : this._player1;
        let enemy = this._flag === 1 ? this._player1 : this._player2;

        // If first turn of game -> any move valid so return true
        if(player.currentMove === -1 && player.lastMove === -1 && enemy.currentMove === -1 && enemy.lastMove === -1) return true;

        // If second turn of game -> only check if in range of enemy
        // -> only check if in range of enemy, should be false
        if(player.currentMove === -1 && player.lastMove === -1) return !this.isInRangeOf(index, enemy.currentMove);

        // At this point, any move needs 2 checks: 
        // 1. The new move is in range of the last move 
        // 2. The new move is not in range of the current enemy move
        let inRangeLastMove = this.isInRangeOf(index, player.currentMove);
        let inRangeEnemy = this.isInRangeOf(index, enemy.currentMove);

        // If you moved in enemy range, declare enemy winner
        if(inRangeEnemy) this.declareWinner(enemy);

        // Return in Range of last move and not in range of enemy
        return inRangeLastMove && !inRangeEnemy;

    }

    /**
     * check if a move is in range of another move
     * @param {Number} newMove - player's new move 
     * @param {Number} otherMove - another move to be compared with
     * @returns 
     */
    isInRangeOf(newMove, otherMove){

        // Row and Column positions of new move and other move
        let newMoveRow = Math.floor(newMove / 6);
        let newMoveCol = newMove % 6;
        let otherMoveRow = Math.floor(otherMove / 6);
        let otherMoveCol = otherMove % 6;

        /**
         * checks if board's row and col position is a wall 
         * @param {Number} row row position 
         * @param {Number} col column position 
         * @returns true if board's position is a wall 
         */
        let checkWall = (row, col) => {
            if(this._board[row][col] === "|") return true;
        }

        // If new move same row as other move, check left and right
        if(newMoveRow === otherMoveRow){
            // If new move left of other move
            if(otherMoveCol > newMoveCol){
                // Check squares left to right
                for(let i = newMoveCol + 1; i < otherMoveCol; i++){
                    // If there is a wall, new move not in range of other move, return false
                    if(checkWall(newMoveRow, i)) return false;
                }
                // If it reaches here, then new move reaches the other move, return true
                return true;
            }

            // If new move right of other move
            if(otherMoveCol < newMoveCol){
                // Check squares right to left
                for(let i = newMoveCol - 1; i > otherMoveCol; i--){
                    // If there is a wall, new move not in range of other move, return false
                    if(checkWall(newMoveRow, i)) return false;
                }
                // If it reaches here, then new move reaches the other move, return true
                return true;
            }
        }
        // If new move same column other move, check up and down
        else if(newMoveCol === otherMoveCol){
            // If new move above other move 
            if(otherMoveRow > newMoveRow){
                // Check squares top to bottom
                for(let i = newMoveRow + 1; i < otherMoveRow; i++){
                    // If there is a wall, new move not in range of other move, return false
                    if(checkWall(i, newMoveCol)) return false;
                }
                // If it reaches here, then new move reaches the other move, return true
                return true;
            }
            // If new move below other move 
            if(otherMoveRow < newMoveRow){
                // Check squares bottom to top 
                for(let i = newMoveRow - 1; i > otherMoveRow; i--){
                    // If there is a wall, new move not in range of other move, return false
                    if(checkWall(i, newMoveCol)) return false;
                }
                // If it reaches here, then new move reaches the other move, return true
                return true;
            }
        }
        // If new move same diagonal as other move, check all diagonals
        else if(Math.abs(newMoveCol - otherMoveCol) === Math.abs(newMoveRow - otherMoveRow)){
            // If new move top left of other move
            if(otherMoveCol > newMoveCol && otherMoveRow > newMoveRow){
                // Check each square top left to bottom right
                for(let i = 1; newMoveCol + i <= otherMoveCol; i++){
                    // If there is a wall, new move not in range of other move, return false
                    if(checkWall(newMoveRow + i, newMoveCol + i)) return false;
                }
                // If it reaches here, then new move reaches the other move, return true
                return true;
            }
            // If new move bottom right of other move
            if(otherMoveCol < newMoveCol && otherMoveRow < newMoveRow){
                // Check each square bottom right to top left
                for(let i = 1; newMoveCol - i >= otherMoveCol; i++){
                    // If there is a wall, new move not in range of other move, return false
                    if(checkWall(newMoveRow - i, newMoveCol - i)) return false;
                }
                // If it reaches here, then new move reaches the other move, return true
                return true;
            }
            // If new move bottom left of other move 
            if(otherMoveCol > newMoveCol && otherMoveRow < newMoveRow){
                // Check each square bottom left to top right
                for(let i = 1; i + newMoveCol <= otherMoveCol; i++){
                    // If there is a wall, new move not in range of other move, return false
                    if(checkWall(newMoveRow - i, newMoveCol + i)){
                        return false;
                    }
                }
                // If it reaches here, then new move reaches the other move, return true
                return true;
            }
            // If new move top right of other move
            if(otherMoveCol < newMoveCol && otherMoveRow > newMoveRow){
                // Check each square top right to bottom left
                for(let i = 1; newMoveCol - i >= otherMoveCol; i++){
                    // If there is a wall, new move not in range of other move, return false
                    if(checkWall(newMoveRow + i, newMoveCol - i)){
                        return false;
                    }
                }
                // If it reaches here, then new move reaches the other move, return true
                return true;
            }
        }

        // If code reaches here, new move not in range of other move, return false
        return false;
    }

    /**
     * check if player's move is surrounded by walls(trapped)
     * @param {Number} index - position 
     * @returns true if all surrounding is walls, false otherwise
     */
    isTrapped(index){
        // Row and column of move
        let row = Math.floor(index / 6);
        let col = index % 6;
        
        // Check squares all around
        if(row - 1 > -1 && this._board[row - 1][col] !== "|") return false;
        if(col - 1 > -1 && this._board[row][col - 1] !== "|") return false;
        if(row - 1 > -1 && col - 1 > -1 && this._board[row - 1][col - 1] !== "|") return false;
        if(row + 1 < 6 && this._board[row + 1][col] !== "|") return false;
        if(col + 1 < 6 && this._board[row][col + 1] !== "|") return false;
        if(row + 1 < 6 && col + 1 < 6 && this._board[row + 1][col + 1] !== "|") return false;
        if(row - 1 > -1 && col + 1 < 6 && this._board[row - 1][col + 1] !== "|") return false;
        if(row + 1 < 6 && col - 1 > -1 && this._board[row + 1][col - 1] !== "|") return false;

        // at this point, square is surrounded, return true
        return true;
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
     * player's move
     * @param {String} move - X or O depending on flag
     * @param {Number} index - player's move 
     */
    move(move, index){
        if(move === "O"){
            this._player1.lastMove = this._player1.currentMove;
            this._player1.currentMove = index;

            this.changeLastmove(this._player1.lastMove, "#0000FF");
            this.updateBoard(this._player1.currentMove, this._player1.lastMove, "O");
            if(this.isTrapped(this._player1.currentMove)){
                this.declareWinner(this._player2);
            }
        }
        else if(move === "X"){
            this._player2.lastMove = this._player2.currentMove;
            this._player2.currentMove = index;

            this.changeLastmove(this._player2.lastMove, "#FF0000");
            this.updateBoard(this._player2.currentMove, this._player2.lastMove, "X");
            if(this.isTrapped(this._player1.currentMove)){
                this.declareWinner(this._player2);
            }
        }
    }

    /**
     * change last move of the player to a wall
     * @param {Number} lastMove - player's last move
     * @param {Hexadecimal} color - color to be changed as a wall 
     */
    changeLastmove(lastMove, color){
        if(lastMove !== -1){
            let lastMoveRow = Math.floor(lastMove / 6);
            let lastMoveCol = lastMove % 6;
            document.getElementById("capture").children[lastMoveRow].children[lastMoveCol].style.background = `${color}`;
        }
    }

    /**
     * update board attribute accordingly
     * @param {Number} currentMove - player's current move 
     * @param {Number} lastMove - player's last move 
     * @param {String} move - X or O depending on flag
     */
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
        this._player1.reset();
        this._player2.reset();
        this.start();
    }

    createBoard(){
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

    /**
     * 
     */
    changeRules(){
        // Change game title in header
        document.getElementById("game-title-current").innerHTML = "Capture";

        // Change game rules in rules lightbox
        document.getElementById("game-name").innerHTML = "Capture";
        document.getElementById("game-rules").innerHTML = "Choose which player starts. This game is played on a 6x6 grid. \
        The main objectuve of the game is to avoid placing your symbol(X or O) \
        in a straight or diagonal course from the opponents. \
        The starting player marks his symbol anywhere on the grid. The next player \
        then add their symbol avoiding a hit described above. The first player can \
        move their symbol anywhere diagonally, horizontally, or vertically to an unused \
        space and shades in their previous mark. The opponent moves similarly. \
        The players continue until there is a winner. The winner is determined \
        either by forcing the opponent to no longer have any more usable spots to move \
        or \" CAPTURES \" the opponent by moving in the straight or diagonal line of \
        the opponent's occupied space.";
        
    }
}

export { Capture };
