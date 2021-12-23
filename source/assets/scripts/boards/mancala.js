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

                if(this._flag === 0 && square.className == "o-zone"){
                    console.log("x move");
                    this.moveBeads(index);
                    this._flag = 1;
                }
                else if(this._flag === 1 && square.className == "x-zone"){
                    console.log("o move");
                    this.moveBeads(index);
                    this._flag = 0;
                }   

                this.highlightZone();

                
            });
        });
    }

    highlightZone(){
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

        let square = document.getElementById("mancala").children[zone].children[position];
        let numberOfBeads = parseInt(square.innerHTML);
        square.innerHTML = "0";
        zone == 0 ? this._board[zone][position - 1] = 0 : this._board[zone][position] = 0;
        console.log(position);


        var move = setInterval(() =>{
            
            if(zone === 0){
                if(position === 1){
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
                if(position === 5){
                    zone = 0; 
                    position = 7;
                }
                else if(position === 7){
                    zone = 0;
                    position = 6;
                }
                else{
                    position++;
                }
            }
            
            zone == 0 ? this._board[zone][position - 1]++ : this._board[zone][position]++;
            square = document.getElementById("mancala").children[zone].children[position];
            square.innerHTML = parseInt(square.innerHTML) + 1;
            numberOfBeads--;
            console.log(numberOfBeads);

            if(numberOfBeads === 0){
                clearInterval(move);
            }
        }, 1000);
        // while(numberOfBeads > 0){
        //     // If moving beads on top zone
        //     if(zone === 0){
        //         if(position - 1 > 0){
        //             position--;
        //         }
        //         else if(this._flag === 0){
        //             square = document.getElementById("mancala").children[0].children[0];
        //             square.innerHTML = parseInt(square.innerHTML) + 1;
        //             this._leftZone++;
        //             zone = 1;
        //             position = 0;
        //             numberOfBeads--;
        //         }
        //         else{
        //             zone = 1;
        //             position = 0;
        //         }
        //     }
        //     // If moving bead on the bottom zone
        //     else if(zone === 1){

        //         if(position + 1 < 6){
        //             position++;
        //         }
        //         else if(this._flag === 1){
        //             square = document.getElementById("mancala").children[0].children[7];
        //             square.innerHTML = parseInt(square.innerHTML) + 1;
        //             zone = 0;
        //             position = 6;
        //             numberOfBeads--;
        //             this._rightZone++;
        //         }
        //         else{
        //             zone = 0;
        //             position = 6;
        //         }
        //     }


        //     if(numberOfBeads === 1 && zone === 1 && this._board[zone][position] !== 0){
        //         numberOfBeads += this._board[zone][position];
        //         this._board[zone][position] = 0;
        //         square = document.getElementById("mancala").children[zone].children[position];
        //         square.innerHTML = "0";
        //     }
        //     else if(numberOfBeads === 1 && zone === 0 && this._board[zone][position - 1] !== 0){
        //         numberOfBeads += this._board[zone][position - 1];
        //         this._board[zone][position] = 0;
        //         square = document.getElementById("mancala").children[zone].children[position];
        //         square.innerHTML = "0";
        //     }
        //     else{
        //         zone == 0 ? this._board[zone][position - 1]++ : this._board[zone][position]++;
        //         square = document.getElementById("mancala").children[zone].children[position];
        //         square.innerHTML = parseInt(square.innerHTML) + 1;
        //         numberOfBeads--;
        //     }

            
            
        // }
        console.log(this._board);

    }

    landOnZone(){

    }

    dumpBeads(){

    }

    checkWinner(){
        let sum = this._board[this._flag ]
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