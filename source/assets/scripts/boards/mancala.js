/************* IMPORTS *************/
import { createTable, createRow, createCol } from "./board.js"

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class Mancala{
    
    constructor(player1, player2){
        this._player1 = player1; 
        this._player2 = player2;
        this._leftZone = 0;
        this._rightZone = 0;
        this._greenZone = false;
        this._board = this.initializeBoard();
        this._flag = 0;
        this._moving = false;
    }

    initializeBoard(){
        let boards = [];
        for(let i = 0; i < 2; i++){
            let zone = [];
            for(let j = 0; j < 6; j++){
                zone.push(4);
            }
            boards.push(zone);
        }
        return boards;
    }

    start(){

        // Highlight Player 1 Zone
        this.highlightZone();

        // Loop through each square 
        // Event listeners to each square
        [...document.getElementsByTagName("td")].forEach((square, index) =>{

            // Square 'click' listen: move beads
            square.addEventListener("click", () =>{

                // Do nothing 
                // If player clicked on the left or right zone
                if(square.className === "left-zone" || square.className == "right-zone"){
                    return;
                }

                // Do nothing 
                // if player clicks on empty zone 
                if(parseInt(square.innerHTML) === 0){
                    return;
                }
                
                // Check for green zone 
                if(this._greenZone && square.className.includes("green-zone")){
                    console.log("Player clicks on green zone");
                    square.removeEventListener("dblclick", this.test);
                }
                else if(this._greenZone && !square.className.includes("green-zone")){
                    return;
                }
                
                // If player 1's turn and square is player's zone
                if(this._flag === 0 && square.className == "o-zone" && !this._moving){
                    this._moving = true;
                    this.moveBeads(index);
                }
                // If player 2's turn and square is player's zone
                else if(this._flag === 1 && square.className == "x-zone" && !this._moving){
                    this._moving = true;
                    this.moveBeads(index);
                }   

                 
                
                console.log(this._board);
            });

            // Square 'dblclick' listen: change turns 
            // Only if green zone is true
            square.addEventListener('dblclick', () =>{
                if(this._greenZone){
                    square.classList.remove("green-zone");
                    this.changeTurns();
                    this._moving = false;
                    this._greenZone = false;
                }
            });
            // Square 'dragstart' listen: dump beads
            // Only if green zone is true 
            square.addEventListener('dragstart', () =>{
                if(this._greenZone){
                    square.classList.remove("green-zone");
                    this.dumpBeads(index);
                    this._moving = false;
                    this._greenZone = false;
                }
            });
        });
    }


    highlightZone(){
        // If player 1's turn
        // highlight their zone blue 
        // highlight other zone clear
        if(this._flag === 0){
            [...document.getElementById("mancala").children[0].children].forEach((square) =>{
                if(square.className == "o-zone"){
                    square.style.backgroundColor = "rgba(0, 0, 255, .2)";
                }
            });
            [...document.getElementById("mancala").children[1].children].forEach((square) =>{
                if(square.className == "x-zone"){
                    square.style.backgroundColor = "rgba(0, 0, 0, 0)";
                }
            });
        }
        // Player 2's turn 
        // highlight their zone red 
        // highlight other zone clear
        else if(this._flag === 1){
            [...document.getElementById("mancala").children[0].children].forEach((square) =>{
                if(square.className == "o-zone"){
                    square.style.backgroundColor = "rgba(0, 0, 0, 0)";
                }
            });
            [...document.getElementById("mancala").children[1].children].forEach((square) =>{
                if(square.className == "x-zone"){
                    square.style.backgroundColor = "rgba(255, 0, 0, .2)";
                }
            });
        }
    }

    moveBeads(index){

        // Initialize zone and position
        let zone = this.getRow();
        let position = this.getCol(index);

        // Initialize square and number of beads
        let square = document.getElementById("mancala").children[zone].children[position];
        let value = square.children[0].innerHTML;
        let numberOfBeads = parseInt(value);

        // Change the square to 0 
        removeBeads(square);
        zone == 0 ? this._board[zone][position - 1] = 0 : this._board[zone][position] = 0;
        square.appendChild(createBeadValue(0));

        // Every .5 seconds, keep moving beads until no more to move
        var move = setInterval(() =>{

            // Update zone and position 
            if(zone === 0){
                if(position === 1 && this._flag === 0){
                    zone = 0; 
                    position = 0;
                }
                else if(position === 0){
                    zone = 1; 
                    position = 0;
                }
                else{
                    position--;
                }
            }
            else if(zone === 1){
                
                if(position === 5 && this._flag === 1){
                    zone = 0; 
                    position = 7;
                }
                else if(position === 5){
                    zone = 0;
                    position = 6;
                }
                else{
                    position++;
                }
            }

            // Update Board
            if(zone === 0 && position > 0 && position < 7){
                this._board[zone][position - 1]++;
            }
            else if(zone === 1 && position >= 0 && position <= 5){
                this._board[zone][position]++;
            }
            
            // Update Board DOM
            square = document.getElementById("mancala").children[zone].children[position];
            this.changeBeads(square,  parseInt(square.children[0].innerHTML) + 1);

            
            // Remove a Bead
            numberOfBeads--;

            // Log remaining beads
            console.log(`Remaining Beads: ${numberOfBeads}`);

            // If beads are 0 
            if(numberOfBeads === 0){
                // If last bead was placed on an end zone, clear and don't change turns
                if((zone === 0 && position === 0) || (zone === 0 && position === 7)){
                    this._moving = false;
                    clearInterval(move);
                    this.checkWinner();
                }
                // If last bead was placed in the same zone as the player, grab beads and continue moving
                else if((this._flag === 0 && zone === 0 && parseInt(square.children[0].innerHTML) > 1) || 
                (this._flag === 1 && zone === 1 && parseInt(square.children[0].innerHTML) > 1)){
                    numberOfBeads = parseInt(square.children[0].innerHTML);
                    removeBeads(square);
                    square.appendChild(createBeadValue(0));
                    zone == 0 ? this._board[zone][position - 1] = 0 : this._board[zone][position] = 0;
                }
                // If last bead was placed in other players zone, choose to dump, move, or nothing
                else if((this._flag === 0 && zone === 1 && parseInt(square.children[0].innerHTML) === 1) || 
                (this._flag === 1 && zone === 0 && parseInt(square.children[0].innerHTML) === 1)){
                    clearInterval(move);
                    this.checkWinner();
                    square.style.backgroundColor = "rgba(0, 255, 0, .2)";
                    square.setAttribute("class", `${square.className} green-zone`);
                    console.log('Landed on empty other player zone');
                    this._greenZone = true;
                }
                else{
                    this._moving = false;
                    clearInterval(move);
                    this.checkWinner();
                    this.changeTurns();
                }
            }
            
        }, 500);

    }

    getRow(){
        return(this._flag === 0 ? 0 : 1);
    }

    getCol(index){
        return(this._flag === 0 ? index : index - 8);
    }

    changeBeads(square, number){
        square.children[0].innerHTML = number;
        square.appendChild(createMarble()); 
    }

    changeTurns(){
        this._flag === 1 ? this._flag = 0 : this._flag = 1;
        this.highlightZone();
    }

    dumpBeads(index){
        // Find opposite square of the green
        let rowOpp = this._flag === 1 ? 1 : 0;
        let colOpp = this._flag === 1 ? index - 1 : index - 7;
        let squareOpp = document.getElementById("mancala").children[rowOpp].children[colOpp];
        // Find green square 
        
        // Get value at green square and add it to opposite square

        // Update the beads

        console.log(rowOpp);
        console.log(colOpp);
        console.log(squareOpp);
        this.changeTurns();
        if(this._greenZone){
            this._greenZone = 0;
        }
    }

    checkWinner(){
        let sum = this._board[this._flag].reduce((acc, curr) =>{
            return acc + curr;
        });
        console.log(sum);
    }

    reset(){
        this.initializeBoard();
        this._flag = 0;
        this._player1.reset();
        this._player2.reset();
        this._greenZone = false;
        this.start();
    }

    createBoard(){

        /***** HELPER FUNCTIONS *****/
        // Create large zone for bead collecting
        const createZone = () =>{
            let zone = document.createElement("td");
            zone.rowSpan = "2";
            zone.setAttribute("class", "left-zone");
            zone.appendChild(createBeadValue(0));
            return zone;
        }

        // Create 6 squares for the player
        const createSix = (row) =>{
            for(let i = 0; i < 6; i++){
                const nCol = document.createElement('td');
                nCol.setAttribute("class", "o-zone");
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
        // Left Zone
        row1.appendChild(createZone());
        // 6 Squares
        createSix(row1);
        // Right Zone 
        row1.appendChild(createZone());
        // Add to Table
        mancalaTable.appendChild(row1);

        // Second Row
        const row2 = document.createElement('tr');
        // 6 Squares
        createSix(row2);
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