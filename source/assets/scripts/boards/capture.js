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

        let isInRange = false; 
        let isBlockedByWall = false;
        let isInEnemyRange = false;
        
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
        // -> is in range true because can move anywhere
        if(player.currentMove === -1 && player.lastMove === -1){
            isInRange = true;
        }

        // Check if new move is in range of Last Move
        let lastMove = player.currentMove;
        let newMoveRow = Math.floor(index / 6);
        let newMoveCol = index % 6;
        let lastMoveRow = Math.floor(lastMove / 6);
        let lastMoveCol = lastMove % 6;

        // Check Left and Right Ranges
        if(newMoveRow === lastMoveRow){

            // If the new move is on the right of the last move
            if(newMoveCol > lastMoveCol){
                // Check each square from last move to new move
                for(let i = lastMoveCol + 1; i < newMoveCol; i++){
                    // If there is a wall, return false 
                    if(this._board[lastMoveRow][i] === "|"){
                        isBlockedByWall = true;
                    }
                }
            }

            // If the new move is on the left of the last move
            if(newMoveCol < lastMoveCol){
                // Check each square from last move to new move
                for(let i = lastMoveCol - 1; i > newMoveCol; i--){
                    // If there is a wall, return false
                    if(this._board[lastMoveRow][i] === "|"){
                        isBlockedByWall = true;
                    }
                }
            }
            
            isInRange = true;
        }
        // Check Up and Down Ranges
        if(newMoveCol === lastMoveCol){ 
            
            // If the new move is below the last move 
            if(newMoveRow > lastMoveRow){
                // Check each square from last move to new move
                for(let i = lastMoveRow + 1; i < newMoveRow; i++){
                    // If there is a wall, return false
                    if(this._board[i][lastMoveCol] === "|"){
                        isBlockedByWall = true;
                    }
                }
            }

            // If the new move is above the last move
            if(newMoveRow < lastMoveRow){
                // Check each square from last move to new move
                for(let i = lastMoveRow - 1; i > newMoveRow; i--){
                    // If there is a wall, return false
                    if(this._board[i][lastMoveCol] === "|"){
                        isBlockedByWall = true;
                    }
                }
            }

            isInRange = true;
        }
        // Check Diagonal Ranges
        if(Math.abs(newMoveCol - lastMoveCol) === Math.abs(newMoveRow - lastMoveRow)){

            // If the new move is diagonal up right to the last move
            if(newMoveCol > lastMoveCol && newMoveRow < lastMoveRow){
                // Check each square from last move to new move
                for(let i = 1; i + lastMoveCol < newMoveCol; i++){
                    // If there is a wall, return false
                    if(this._board[lastMoveRow - i][lastMoveCol + i] === "|"){
                        isBlockedByWall = true;
                    }
                }
            }

            // If the new move is diagonal up left to the last move
            if(newMoveCol < lastMoveCol && newMoveRow < lastMoveRow){
                // Check each square from last move to new move
                for(let i = 1; lastMoveCol - i > newMoveCol; i++){
                    // If there is a wall, return false
                    if(this._board[lastMoveRow - i][lastMoveCol - i] === "|"){
                        isBlockedByWall = true;
                    }
                }
            }

            // If the new move is diagonal down right to the last move
            if(newMoveCol > lastMoveCol && newMoveRow > lastMoveRow){
                // Check each square from last move to new move
                for(let i = 1; i + lastMoveCol < newMoveCol; i++){
                    // If there is a wall, return false
                    if(this._board[lastMoveRow + i][lastMoveCol + i] === "|"){
                        isBlockedByWall = true;
                    }
                }
            }

            // If the new move is diagonal down left to the last move 
            if(newMoveCol < lastMoveCol && newMoveRow > lastMoveRow){
                // Check each square from last move to new move
                for(let i = 1; lastMoveCol - i > newMoveCol; i++){
                    // If there is a wall, return false
                    if(this._board[lastMoveRow + i][lastMoveCol - i] === "|"){
                        isBlockedByWall = true;
                    }
                }
            }

            
            isInRange = true;
        }

        // Check if the new move is in range of Enemy Move
        let enemyMove = enemy.currentMove;
        let opposite;
        this._flag === 1 ? opposite = "O" : opposite  = "X";
        let enemyMoveRow = Math.floor(enemyMove / 6);
        let enemyMoveCol = enemyMove % 6;

        // Check Left and Right Ranges 
        if(enemyMoveRow === newMoveRow){

            console.log("Enemy is in left or right");

            // If enemy is to the right of the new move
            if(enemyMoveCol > newMoveCol){

                console.log("Enemy is on the right");

                // Check each square from new move to enemy move 
                for(let i = newMoveCol + 1; i <= enemyMoveCol; i++){
                    // If the square is a wall -> in enemy range false
                    if(this._board[newMoveRow][i] === "|"){
                        console.log("Right wall block");
                        isInEnemyRange = false;
                        break;
                    }
                    // If the square is the enemy -> in enemy range true
                    else if(this._board[newMoveRow][i] === opposite){
                        console.log("Enemy found on the right");
                        isInEnemyRange = true;
                        break;
                    }
                }
            }
            // If enemy is to the left of the new move 
            if(enemyMoveCol < newMoveCol){

                console.log("enemy is on the left");

                // Check each square from new move to enemy move
                for(let i = 1; newMoveCol - i >= enemyMoveCol; i++){
                    // If the square is a wall -> in enemy range false
                    if(this._board[newMoveRow][newMoveCol - i] === "|"){
                        console.log("Left wall block");
                        isInEnemyRange = false;
                        break;
                    }
                    // If the square is the enemy -> in enemy range true
                    else if(this._board[newMoveRow][newMoveCol - i] === opposite){
                        console.log("Enemy found on the left");
                        isInEnemyRange = true;
                        break;
                    }
                }
            }
            
        }
        // Check Up and Down Ranges
        if(enemyMoveCol === newMoveCol){
            console.log("Enemy is up or down")
            // If enemy is above the new move 
            if(enemyMoveRow < newMoveRow){
                console.log("Enemy is above");
                // Check each square from new move to enemy move
                for(let i = 1; newMoveRow - i >= enemyMoveRow; i++){
                    // If the square is a wall -> in enemy range false
                    if(this._board[newMoveRow - i][newMoveCol] === "|"){
                        console.log("Above wall block");
                        isInEnemyRange = false;
                        break;
                    }
                    // If the square is the enemy -> in enemy range true
                    else if(this._board[newMoveRow - i][newMoveCol] === opposite){
                        console.log("Enemy found above");
                        isInEnemyRange = true;
                        break;
                    }
                }
            }

            // If enemy is below the new move
            if(enemyMoveRow > newMoveRow){
                console.log("Enemy is below");
                // Check each square from new move to enemy move 
                for(let i = newMoveRow + 1; i <= enemyMoveRow; i++){
                    // If the square is a wall -> in enemy range false
                    if(this._board[i][newMoveCol] === "|"){
                        console.log("Bottom wall block");
                        isInEnemyRange = false;
                        break;
                    }
                    // If the square is the enemy -> in enemy range true
                    else if(this._board[i][newMoveCol] === opposite){
                        console.log("Enemy found below");
                        isInEnemyRange = true;
                        break;
                    }
                }
            }
        }
        // Check Diagonal Ranges
        if(Math.abs(enemyMoveCol - newMoveCol) === Math.abs(enemyMoveRow - newMoveRow)){
            console.log("Enemy is in some diagonal");

            // If enemy is above and right of the new move 
            if(enemyMoveRow < newMoveRow && enemyMoveCol > newMoveCol){
                console.log("Enemy is above and on the right");
                // Check each square from new move to enemy move 
                for(let i = 1; i + newMoveCol <= enemyMoveCol; i++){
                    // If the square is a wall -> in enemy range false
                    if(this._board[newMoveRow - i][newMoveCol + i] === "|"){
                        console.log("Top Right wall block");
                        isInEnemyRange = false;
                        break;
                    }
                    // If the square is the enemy -> in enemy range true
                    else if(this._board[newMoveRow - i][newMoveCol + i] === opposite){
                        console.log("Enemy found top right");
                        isInEnemyRange = true;
                        break;
                    }
                }
            }

            // If enemy is above and left of the new move
            if(enemyMoveRow < newMoveRow && enemyMoveCol < newMoveCol){
                console.log("Enemy is above and on the left");
                // Check each square from new move to enemy move
                for(let i = 1; newMoveRow - i >= enemyMoveRow; i++){
                    // If the square is a wall -> in enemy range false
                    if(this._board[newMoveRow - i][newMoveCol - i] === "|"){
                        console.log("Top left block");
                        isInEnemyRange = false;
                        break;
                    }
                    // If the square is the enemy -> in enemy range true
                    else if(this._board[newMoveRow - i][newMoveCol - i] === opposite){
                        console.log("Enemy found top left");
                        isInEnemyRange = true;
                        break;
                    }
                }
            }
            
            // If enemy is below and right of the new move
            if(enemyMoveRow > newMoveRow && enemyMoveCol > newMoveCol){
                console.log("Enemy is below and on the right");
                // Check each square from new move to enemy move 
                for(let i = 1; i + newMoveCol <= enemyMoveCol; i++){
                    // If the square is a wall -> in enemy range false
                    if(this._board[newMoveRow + i][newMoveCol + i] === "|"){
                        console.log("Bottom Right wall block");
                        isInEnemyRange = false;
                        break;
                    }
                    // If the square is the enemy -> in enemy range true
                    else if(this._board[newMoveRow + i][newMoveCol + i] === opposite){
                        console.log("Enemy found bot right");
                        isInEnemyRange = true;
                        break;
                    }
                }
            }

            // If enemy is below and left of the new move 
            if(enemyMoveRow > newMoveRow && enemyMoveCol < newMoveCol){
                console.log("Enemy is below and on the left");
                // Check each square from new move to enemy move
                for(let i = 1; newMoveCol - i >= enemyMoveCol; i++){
                    // If the square is a wall -> in enemy range false
                    if(this._board[newMoveRow + i][newMoveCol - i] === "|"){
                        console.log("Bottom left block");
                        isInEnemyRange = false;
                        break;
                    }
                    // If the square is the enemy -> in enemy range true
                    else if(this._board[newMoveRow + i][newMoveCol - i] === opposite){
                        console.log("Enemy found bottom left");
                        isInEnemyRange = true;
                        break;
                    }
                }
            }
        }
        

    
        // Return if new move is in range 
        // and not blocked by wall and not in enemy range
        return isInRange && !isBlockedByWall && !isInEnemyRange;

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