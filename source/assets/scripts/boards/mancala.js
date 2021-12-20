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

                // 
                if(this._flag === 0 && square.className == "o-zone"){
                    console.log("x move");
                    this._flag = 1;
                }
                else if(this._flag === 1 && square.className == "x-zone"){
                    console.log("o move");
                    this._flag = 0;
                }   

                
            });
        });
    }

    highlightZone(){
        if(this._flag === 0){
            [...document.getElementById("mancala").children[0].children].forEach((square) =>{
                if(square.className == "o-zone"){
                    square.style.background = "red";
                }
            });

            console.log(document.getElementById("mancala").children[0].children);
        }
    }

    moveBeads(){

    }

    dumpBeads(){

    }

    checkWinner(){

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
        row1.appendChild(col2);

        // Loop through six cols 
        for(let i = 0; i < 6; i++){
            const nCol = document.createElement('td');
            nCol.setAttribute("class", "o-zone");
            row1.appendChild(nCol);
        }

        // Insert Second Col with row span 2 
        col2 = document.createElement('td');
        col2.rowSpan = "2";
        col2.setAttribute("class", "right-zone");
        row1.appendChild(col2);

        mancalaTable.appendChild(row1);

        // Create row 2
        const row2 = document.createElement('tr');
        for(let i = 0; i < 6; i++){
            const nCol = document.createElement('td');
            nCol.setAttribute("class", "x-zone");
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

export { Mancala };