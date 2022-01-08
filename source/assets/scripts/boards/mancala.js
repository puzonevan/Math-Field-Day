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
        this._board = [];
        this.initializeBoard();
        this._flag = 0;
        console.log(this._board);
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
        this._board = boards;
    }

    start(){

        this.highlightZone();
        // Loop through each square
        [...document.getElementsByTagName("td")].forEach((square, index) =>{

            // Each square listens for a player move(click)
            square.addEventListener("click", () =>{

                // Do nothing if player clicks on either end zone
                if(square.className === "left-zone" || square.className == "right-zone"){
                    return;
                }

                // Do nothing if player clicks on empty zone 
                if(parseInt(square.innerHTML) === 0){
                    return;
                }
                
                // If player 1's turn and square is player's zone
                if(this._flag === 0 && square.className == "o-zone"){
                    this.moveBeads(index);
                }
                // If player 2's turn and square is player's zone
                else if(this._flag === 1 && square.className == "x-zone"){
                    this.moveBeads(index);
                }   
                
                console.log(this._board);
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
        let zone; 
        let position; 
        if(this._flag === 0){
            zone = 0;
            position = index;
        }
        else if(this._flag === 1){
            zone = 1;
            position = index - 8;
        }

        // Initialize square and number of beads
        let square = document.getElementById("mancala").children[zone].children[position];
        let numberOfBeads = parseInt(square.innerHTML);

        // Change the square to 0 
        removeBeads(square);
        zone == 0 ? this._board[zone][position - 1] = 0 : this._board[zone][position] = 0;
        // this.changeBeads(square, 0);
        square.innerHTML = "0";

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
            
            square.innerHTML = parseInt(square.innerHTML) + 1;

            // Remove a Bead
            numberOfBeads--;

            // Log remaining beads
            console.log(`Remaining Beads: ${numberOfBeads}`);

            // If beads are 0 
            if(numberOfBeads === 0){
                // If last bead was placed on an end zone, clear and don't change turns
                if((zone === 0 && position === 0) || (zone === 0 && position === 0)){
                    clearInterval(move);
                    this.checkWinner();
                }
                // If last bead was placed in the same zone as the player, grab beads and continue moving
                else if((this._flag === 0 && zone === 0 && parseInt(square.innerHTML) > 1) || 
                (this._flag === 1 && zone === 1 && parseInt(square.innerHTML) > 1)){
                    numberOfBeads = parseInt(square.innerHTML);
                    square.innerHTML = "0";
                    zone == 0 ? this._board[zone][position - 1] = 0 : this._board[zone][position] = 0;
                }
                else{
                    clearInterval(move);
                    this.checkWinner();
                    this.changeTurns();
                }
            }
            
        }, 500);

    }

    changeTurns(){
        this._flag === 1 ? this._flag = 0 : this._flag = 1;
        this.highlightZone();
    }

    dumpBeads(){

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
        this.start();
    }

    createBoard(){
        // Mancala Table
        const mancalaTable = createTable("mancala");

        // Insert First Row 
        const row1 = document.createElement('tr');
        // Insert First Col with row span 2 
        let col2 = document.createElement('td');
        col2.rowSpan = "2";
        col2.setAttribute("class", "left-zone");
        col2.innerHTML = "0";
        row1.appendChild(col2);

        // Loop through six cols 
        for(let i = 0; i < 6; i++){
            const nCol = document.createElement('td');
            nCol.setAttribute("class", "o-zone");
            nCol.innerHTML = "4";

            for(let j = 0; j < 4; j++){
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
                nCol.appendChild(nMarble);
            }
            row1.appendChild(nCol);
        }

        // Insert Second Col with row span 2 
        col2 = document.createElement('td');
        col2.rowSpan = "2";
        col2.setAttribute("class", "right-zone");
        col2.innerHTML = "0";
        row1.appendChild(col2);

        mancalaTable.appendChild(row1);

        // Create row 2
        const row2 = document.createElement('tr');
        for(let i = 0; i < 6; i++){
            const nCol = document.createElement('td');
            nCol.setAttribute("class", "x-zone");
            nCol.innerHTML = "4";

            for(let j = 0; j < 4; j++){
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
                nCol.appendChild(nMarble);
            }
            
            row2.appendChild(nCol);


        }
        mancalaTable.appendChild(row2);
        document.getElementById('board').appendChild(mancalaTable);
    
    }

    changeRules(){
        // Change game title in header
        document.getElementById("game-title-current").innerHTML = "Mancala";

        // Change game rules in rules lightbox
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
}
const removeBeads = (parent) =>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

export { Mancala };