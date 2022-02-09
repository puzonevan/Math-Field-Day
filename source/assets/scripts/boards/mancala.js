/************* IMPORTS *************/
import { createTable, createRow, createCol } from "./board.js"
import { winnerLightbox } from "../header/winner.js";

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class Mancala{
    
    constructor(player1, player2){
        this._player1 = player1; 
        this._player2 = player2;
        this._left = 0;
        this._right = 0;
        this._green = false;
        this._moving = false;
        this._board = [[4, 4, 4, 4, 4, 4],
                        [4, 4, 4, 4, 4, 4]]
        this._flag = 0;
    }

    start(){

        // Highlight Player 1 rowDOM
        this.highlightZone();

        // Loop through each square 
        // Event listeners to each square
        [...document.getElementsByTagName("td")].forEach((square, index) =>{

            // Square 'click' listen: move beads
            square.addEventListener("click", () =>{

                // Do nothing 
                // If player clicks on empty rowDOM 
                if(parseInt(square.children[0].innerHTML) === 0)return;
                // If beads are already moving
                if(this._moving) return;

                // If there is a green square 
                if(this._green){
                    // If square is either end zone, end turn 
                    if(square.className === "left-zone" || square.className === "right-zone"){
                        this._moving = false;
                        this._green = false;
                        this.changeTurns();
                    }
                    // If square is green, move the opposite beads
                    else if(square.classList.contains("green-zone")){
                        this._moving = true;
                        this._green = false; 
                        let opposite = this.getOpp(index);
                        this.moveBeads(opposite);
                    }
                    return;
                }
                
                // If player 1 or 2 turn's and square clicked is appropriate square
                // move beads
                if((this._flag === 0 && square.className.includes("o-zone")) || 
                    (this._flag === 1 && square.className.includes("x-zone"))){
                    this._moving = true;
                    this.moveBeads(index);
                }  

                
                console.log(this._board);
                
            });

            // Square 'dragstart' listen: dump beads
            // Only if green rowDOM is true 
            square.addEventListener('dragstart', () =>{
                if(this._green && square.className.includes("green-zone")){
                    this._moving = false;
                    this._green = false;
                    this.dumpBeads(index);
                }
            });

            
        });
    }

    moveBeads(index){

        // Initialize rowDOM and colDOM
        let rowDOM = this.getRow(index);
        let colDOM = this.getCol(index);

        // Initialize square and number of beads
        let square = document.getElementById("mancala").children[rowDOM].children[colDOM];
        let value = square.children[0].innerHTML;
        let numberOfBeads = parseInt(value);

        if(numberOfBeads === 0){
            this.changeTurns();
            this._moving = false;
            return;
        }
        // Change the square to 0 
        removeBeads(square);
        square.appendChild(createBeadValue(0));
        this.updateBoard(rowDOM, colDOM, 0);
        
        // Every .5 seconds, keep moving beads until no more to move
        var move = setInterval(() =>{

            // Update rowDOM and colDOM 
            if(rowDOM === 0){
                if(colDOM > 1){
                    colDOM--;
                }
                else if(colDOM === 0){
                    rowDOM = 1;
                }
                else if(this._flag === 0){
                    rowDOM = 0; 
                    colDOM = 0;
                }
                else if(this._flag === 1){
                    rowDOM = 1; 
                    colDOM = 0;
                }
            }
            else if(rowDOM === 1){
                if(colDOM < 5){
                    colDOM++;
                }
                else if(colDOM === 7){
                    rowDOM = 0;
                }
                else if(this._flag === 1){
                    rowDOM = 0; 
                    colDOM = 7;
                }
                else if(this._flag === 0){
                    rowDOM = 0; 
                    colDOM = 6;
                }
            }
            
            // Update Board and DOM
            square = document.getElementById("mancala").children[rowDOM].children[colDOM];
            this.updateBoard(rowDOM, colDOM, parseInt(square.children[0].innerHTML)+ 1);
            this.addBeads(square, parseInt(square.children[0].innerHTML)+ 1);
            value = square.children[0].innerHTML;

            // Remove a Bead
            numberOfBeads--;

            // Log remaining beads
            console.log(`Remaining Beads: ${numberOfBeads}`);

            // If beads are 0 
            if(numberOfBeads === 0){
                // If last bead was placed on an end row, clear and don't change turns
                if((rowDOM === 0 && colDOM === 0) || (rowDOM === 0 && colDOM === 7)){
                    this._moving = false;
                    this.checkWinner();
                    clearInterval(move);
                }
                // If last bead was placed in the same row as the player, grab beads and continue moving
                else if((this._flag === 0 && rowDOM === 0 && parseInt(value) > 1) || 
                (this._flag === 1 && rowDOM === 1 && parseInt(value) > 1)){
                    numberOfBeads = parseInt(value);
                    removeBeads(square);
                    square.appendChild(createBeadValue(0));
                    this.updateBoard(rowDOM, colDOM, 0);
                }
                // If last bead was placed in other players rowDOM, choose to dump, move, or nothing
                else if((this._flag === 0 && rowDOM === 1 && parseInt(value) === 1) || 
                (this._flag === 1 && rowDOM === 0 && parseInt(value) === 1)){
                    this._moving = false;
                    this.checkWinner();
                    square.style.backgroundColor = "rgba(0, 255, 0, .2)";
                    square.setAttribute("class", `${square.className} green-zone`);
                    this._green = true;
                    clearInterval(move);
                }
                else{
                    this._moving = false;
                    this.checkWinner();
                    this.changeTurns();
                    clearInterval(move);
                }
            }
            
        }, 500);

    }

    /**
     * update the board given row, column, and value
     * @param {Number} row - row for the board
     * @param {Number} col - column for the board
     * @param {Number} value - value to be set
     * @returns 
     */
    updateBoard(row, col, value){
        if(row === 0 && (col === 0 || col === 7)) return;
        if(row === 0){
            this._board[row][col - 1] = value;
        }
        else{
            this._board[row][col] = value;
        }
    }

    addBeads(square, value){
        while(parseInt(square.children[0].innerHTML) < value){
            square.appendChild(createMarble());
            square.children[0].innerHTML = parseInt(square.children[0].innerHTML) + 1;
        }
    }

    dumpBeads(index){

        // Find opposite square of the green
        let opp = this.getOpp(index);
        let oppRow = this.getRow(opp);
        let oppCol = this.getCol(opp);
        let oppSquare = document.getElementById("mancala").children[oppRow].children[oppCol];

        // Find green square 
        let row = this.getRow(index);
        let col = this.getCol(index);
        let currentSquare = document.getElementById("mancala").children[row].children[col];
        
        // Get value at green square and add it to opposite square
        let oppSquareValue = parseInt(oppSquare.children[0].innerHTML);
        let currentSquareValue = parseInt(currentSquare.children[0].innerHTML);

        // Update the beads
        removeBeads(oppSquare);
        oppSquare.appendChild(createBeadValue(0));
        this.addBeads(currentSquare, oppSquareValue + currentSquareValue);

        // Update the Board
        this.updateBoard(oppRow, oppCol, 0);
        this.updateBoard(row, col, oppSquareValue + currentSquareValue);

        this.changeTurns();
    }

    changeTurns(){
        this._flag === 1 ? this._flag = 0 : this._flag = 1;
        this.highlightZone();
        this.checkWinner();
    } 

    highlightZone(){
        // If player 1's turn
        // highlight their rowDOM blue 
        // highlight other rowDOM clear
        if(this._flag === 0){
            [...document.getElementById("mancala").children[0].children].forEach((square) =>{
                if(square.classList.contains("green-zone")){
                    square.classList.remove("green-zone");
                }
                if(square.className == "o-zone"){
                    square.style.backgroundColor = "rgba(0, 0, 255, .2)";
                }
            });
            [...document.getElementById("mancala").children[1].children].forEach((square) =>{
                if(square.classList.contains("green-zone")){
                    square.classList.remove("green-zone");
                }
                if(square.className == "x-zone"){
                    square.style.backgroundColor = "rgba(0, 0, 0, 0)";
                }
            });
        }
        // Player 2's turn 
        // highlight their rowDOM red 
        // highlight other rowDOM clear
        else if(this._flag === 1){
            [...document.getElementById("mancala").children[0].children].forEach((square) =>{
                if(square.classList.contains("green-zone")){
                    square.classList.remove("green-zone");
                }
                if(square.className == "o-zone"){
                    square.style.backgroundColor = "rgba(0, 0, 0, 0)";
                }
            });
            [...document.getElementById("mancala").children[1].children].forEach((square) =>{
                if(square.classList.contains("green-zone")){
                    square.classList.remove("green-zone");
                }
                if(square.className == "x-zone"){
                    square.style.backgroundColor = "rgba(255, 0, 0, .2)";
                }
            });
        }
    }

    getRow(index){
        if(index < 8){
            return 0;
        }
        else{
            return 1;
        }
    }

    getCol(index){
        if(index < 8){
            return index;
        }
        else{
            return index - 8;
        }
    }

    getOpp(index){
        return(index < 8 ? index + 7 : index - 7);
    }

    checkWinner(){
        let sum = this._board[this._flag].reduce((acc, curr) =>{
            return acc + curr;
        });

        if(sum === 0){
            console.log("sum 0")
            if(this._flag === 0){
                console.log("winner 1")
                this.declareWinner(this._player1);
            }
            else if(this._flag === 1){
                console.log("winner 2");
                this.declareWinner(this._player2);
            }
        }

        console.log(`${this._flag}: ${sum}`);

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

    reset(){
        this.initializeBoard();
        this._flag = 0;
        this._player1.reset();
        this._player2.reset();
        this._green = false;
        this.start();
    }

    createBoard(){

        /***** HELPER FUNCTIONS *****/
        // Create large rowDOM for bead collecting
        const createZone = (name) =>{
            let zone = document.createElement("td");
            zone.rowSpan = "2";
            zone.setAttribute("class", `${name}-zone`);
            zone.appendChild(createBeadValue(0));
            return zone;
        }

        // Create 6 squares for the player
        const createSix = (row, col) =>{
            for(let i = 0; i < 6; i++){
                const nCol = document.createElement('td');
                nCol.setAttribute("class", `${col}-zone`);
                nCol.appendChild(createBeadValue(4));

                for(let j = 0; j < 4; j++){
                    const nMarble = createMarble();
                    nCol.appendChild(nMarble);
                }
                row.appendChild(nCol);
            }
        }

        /***** Mancala Table *****/
        // Mancala Table
        const mancalaTable = createTable("mancala");

        // First Row 
        const row1 = document.createElement('tr');
        // Left rowDOM
        row1.appendChild(createZone('left'));
        // 6 Squares
        createSix(row1, 'o');
        // Right rowDOM 
        row1.appendChild(createZone('right'));
        // Add to Table
        mancalaTable.appendChild(row1);

        // Second Row
        const row2 = document.createElement('tr');
        // 6 Squares
        createSix(row2, 'x');
        // Add to Table
        mancalaTable.appendChild(row2);

        // Add table to DOM 
        document.getElementById('board').appendChild(mancalaTable);
    
    }

    changeRules(){
        // Change Header Title
        document.getElementById("game-title-current").innerHTML = "Mancala";

        // Change rules in lightbox
        document.getElementById("game-name").innerHTML = "Mancala";
        document.getElementById("game-rules").innerHTML = "Choose which player starts. The player can choose any hole with beads on \
        their side, scoops up the beads, and distributes them one bead to a hole \
        moving to the right including the end holes. The winner of the game is the \
        first person that gets rid of all the beads on their side. \
        If a player's last bead lands in the end hole, they must go again. \
        If a player's last bead lands in an empty hole on the opponent's side, \
        the player can scoop and move the beads on the opposite hole(on his side) \
        or scoop and place all the beads from the opposite hole to the landed hole. \
        The player can also not move at all when this happens. \
        Whenever a player lands in an empty hole on their side, their turn is over.";
    }

    
}

/***** HELPER FUNCTIONS *****/
// Create Marble DOM element
const createMarble = () =>{
    const nMarble = document.createElement("img");
    nMarble.setAttribute("class", "marble-img");
    let marble = Math.random(); 
    // Chance for blue or red marble 
    if(marble <= .5){
        nMarble.src = "source/assets/images/icons/bluemarble.png";
        nMarble.alt = "blue marble";
    }
    else{
        nMarble.src = "source/assets/images/icons/redmarble.png";
        nMarble.alt = "red marble";
    }
    marble = Math.random();
    nMarble.style.top = `${marble * 40}px`;
    marble = Math.random();
    nMarble.style.left = `${marble * 20}px`;
    nMarble.style.zIndex = `${Math.floor(marble * 4)}`;
    return nMarble;
}

// Remove Marbles from DOM 
const removeBeads = (parent) =>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

// Create p containing value of beads
const createBeadValue = (value) =>{
    const pValue = document.createElement("p");
    pValue.innerHTML = value;
    return pValue;
}

export { Mancala };