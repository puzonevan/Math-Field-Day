/************* IMPORTS *************/
import { createTable, createRow, createCol} from "./board.js";
import { winnerLightbox } from "../header/winner.js";


/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class FiveInARow{
    
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
        for (let row = 0; row < 25; row++){
            let row = [];
            for(let col = 0; col < 50; col++){
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

                    // Player's move
                    this.move("O", index);

                    // After player moves, check if they won
                    if(this._player1.winner){

                        // Display the winner lightbox
                        document.getElementById("board").style.filter = "blur(10px)";
                        winnerLightbox.style.display = "flex";   

                        // Change the name to player 1's name
                        if(typeof this._player1.name !== "string"){
                            document.getElementById("winner-name").innerHTML = `Player 1 wins!`;
                        }
                        else{
                            document.getElementById("winner-name").innerHTML = `${this._player1.name} wins!`; 
                        }
                    }

                    // X player's turn
                    this._flag = 1;
                }
                // X Player's move 
                else if(this._flag === 1){

                    // Display the X Player's icon 
                    square.setAttribute("class", "x-player");

                    // Player X move
                    this.move("X",index);

                    // After Player moves, check if they won
                    if(this._player2.winner){
                        
                        // Display the winner lightbox
                        document.getElementById("board").style.filter = "blur(10px)";
                        winnerLightbox.style.display = "flex";

                        // Change the name to Player 2's name
                        if(typeof this._player1.name !== "string"){
                            document.getElementById("winner-name").innerHTML = `Player 2 wins!`;
                        }
                        else{
                            document.getElementById("winner-name").innerHTML = `${this._player2.name} wins!`; 
                        }
                    }

                    // Y Player's turn
                    this._flag = 0;
                }
            })
        })
    }

    /**
     * player move updates board and checks if winner 
     * @param {String} move - either O or X depending on whos move
     * @param {Number} index - players move based on square number
     */
    move(move, index){

        // Row is position divide 50 since each row is 50 squares long
        let row = Math.floor(index / 50);
        // Col is position remainder 50 since this value should only be 0-49
        let col = index % 50;

        // Add O or X to the board
        move === "O" ? this._board[row][col] = "O" : this._board[row][col] = "X"; 

        // Check if the move made was a winning move
        this.checkWinner(move, row, col);
    }
    
    /**
     * checks the winner using 8 pointers exploring 8 different directions
     * @param {String} move - either O or X depending on the whos move
     * @param {Number} row - players move row
     * @param {Number} col - players move column
     * @returns 
     */
    checkWinner(move, row, col){

        // Pointers for up and down 
        let pointerup;
        row - 1 > -1 ? pointerup = this._board[row - 1][col] : pointerup = "";
        let pointerdown; 
        row + 1 < 25 ? pointerdown = this._board[row + 1][col] : pointerdown = "";
        let pointerupOffset = 1;
        let pointerdownOffset = 1;

        // Pointers for left and right
        let pointerleft;
        col - 1 > -1 ? pointerleft = this._board[row][col - 1] : pointerleft = "";
        let pointerright;
        col + 1 < 50 ? pointerright = this._board[row][col + 1] : pointerright = "";
        let pointerleftOffset = 1;
        let pointerrightOffset = 1;

        // Pointers for Diagonal Right
        let pointertopright;
        col + 1 < 50 && row - 1 > -1 ? pointertopright = this._board[row - 1][col + 1] : pointertopright = "";
        let pointerbotleft;
        col - 1 > -1 && row + 1 < 25 ? pointerbotleft = this._board[row + 1][col - 1] : pointerbotleft = "";
        let pointertoprightOffset = 1;
        let pointerbotleftOffset = 1;

        // Pointers for Diagonal Left
        let pointertopleft;
        col - 1 > -1 && row - 1 > -1 ? pointertopleft = this._board[row - 1][col - 1] : pointertopleft = "";
        let pointerbotright;
        col + 1 < 50 && row + 1 < 25 ? pointerbotright = this._board[row + 1][col + 1] : pointerbotright = "";
        let pointertopleftOffset = 1;
        let pointerbotrightOffset = 1;

        // Counters for each direction
        let counterHorizontal = 1;
        let counterDiagonalRight = 1;
        let counterDiagonalLeft = 1;
        let counterVertical = 1;

        // while any pointer still contains an X or O
        // -> move the pointer in the direction 
        // -> update the counter
        while(pointerup === move || pointerdown === move || pointerleft === move || pointerright === move
            || pointertopright === move || pointerbotleft === move || pointertopleft === move || pointerbotright === move){

            // Premature check if any counters have reached 5 already
            if(counterVertical === 5 || counterHorizontal === 5 || counterDiagonalLeft === 5 || counterDiagonalRight === 5){
                move === "O" ? this._player1.winner = true : this._player2.winner = true;
                break;
            }

            // if up is an X or O
            // -> update counter, offset, and pointer
            if(pointerup === move){
                // console.log("up");
                counterVertical++;
                pointerupOffset++;
                row - pointerupOffset > -1 ? pointerup = this._board[row - pointerupOffset][col] : pointerup = "";
            }

            // if bottom is an X or O
            // -> update counter, offset, and pointer
            if(pointerdown === move){
                // console.log("down");
                counterVertical++;
                pointerdownOffset++;
                row + pointerdownOffset < 25 ? pointerdown = this._board[row + pointerdownOffset][col] : pointerdown = ""; 
            }

            // if left is an X or O
            // -> update counter, offset, and pointer
            if(pointerleft === move){
                // console.log("left");
                counterHorizontal++;
                pointerleftOffset++;
                col - pointerleftOffset > -1 ? pointerleft = this._board[row][col - pointerleftOffset] : pointerleft = "";
            }

            // if right is an X or O
            // -> update counter, offset, and pointer
            if(pointerright === move){
                // console.log("right");
                counterHorizontal++;
                pointerrightOffset++;
                col + pointerrightOffset < 50 ? pointerright = this._board[row][col + pointerrightOffset] : pointerright = "";
            }

            // if top right is an X or O
            // -> update counter, offset, and pointer
            if(pointertopright === move){
                // console.log("top right");
                counterDiagonalRight++;
                pointertoprightOffset++;
                col + pointertoprightOffset < 50 && row - pointertoprightOffset > -1 ? pointertopright = this._board[row - pointertoprightOffset][col + pointertoprightOffset] : pointertopright = "";
            }

            // if bottom left is an X or O
            // -> update counter, offset, and pointer
            if(pointerbotleft === move){
                // console.log("bot left");
                counterDiagonalRight++;
                pointerbotleftOffset++;
                col - pointerbotleftOffset > -1 && row + pointerbotleftOffset < 25 ? pointerbotleft = this._board[row + pointerbotleftOffset][col - pointerbotleftOffset] : pointerbotleft = "";
            }
            
            // if top left is an X or O
            // -> update counter, offset, and pointer
            if(pointertopleft === move){
                // console.log("top left");
                counterDiagonalLeft++;
                pointertopleftOffset++;
                col - pointertopleftOffset > -1 && row - pointertopleftOffset > -1 ? pointertopleft = this._board[row - pointertopleftOffset][col - pointertopleftOffset] : pointertopleft = "";
            }

            // if bottom right is an X or O
            // -> update counter, offset, and pointer
            if(pointerbotright === move){
                // console.log("bot right");
                counterDiagonalLeft++;
                pointerbotrightOffset++;
                col + pointerbotrightOffset < 50 && row + pointerbotrightOffset < 25 ? pointerbotright = this._board[row + pointerbotrightOffset][col + pointerbotrightOffset] : pointerbotright = "";
            }
            
        }

        // if any counters are greater than or equal to 5
        // -> declare the winner
        if(counterVertical >= 5 || counterHorizontal >= 5 || counterDiagonalLeft >= 5 || counterDiagonalRight >= 5){
            move === "O" ? this._player1.winner = true : this._player2.winner = true;
        }
        // console.log(`Up and down ${counterVertical}`);
        // console.log(`left and right ${counterHorizontal}`);
        // console.log(`Diagonal Right ${counterDiagonalRight}`);
        // console.log(`Diagonal Left ${counterDiagonalLeft}`);
        
        return;
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

    /**
     * Create the board in the DOM 
     */
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