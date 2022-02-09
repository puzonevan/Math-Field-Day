/************* IMPORTS *************/
import { createTable, createRow, createCol } from "./board.js"

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class Hex{
    
    constructor(player1, player2){
        this._player1 = player1;
        this._player2 = player2;
        this._board;
        this.initializeBoard();
        this._flag = 0;
    }

    initializeBoard(){

    }

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

                        // Player's Move 
                        this.move("O", index);

                        // X player's turn
                        this._flag = 1;
                    
                }
                else if(this._flag === 1){
                    
                        // Display the X Player's icon 
                        square.setAttribute("class", "x-player");

                        // Player's Move 
                        this.move("X", index);

                        // Y Player's turn
                        this._flag = 0;
                    
                }
            });
        });
    }

    move(move, index){

    }

    reset(){
        this.initializeBoard();
        this._flag = 0;
        this._player1.reset();
        this._player2.reset();
        this.start();
    }


    createBoard(){
        
        // Hex Table
        const hexTable = createTable("hex");

        // Remove table border
        hexTable.style.border = "none";

        // Hex loop: 12x12
        for (let row = 0; row < 12; row++){
            const nRow = createRow("hex", row);
            nRow.style.position = "relative";
            
            nRow.style.width = "auto";
            nRow.style.height = "35px";
            nRow.style.left = `${row * 20}px`;
        
            // Loop through rest of columns
            for(let col = 0; col < 12; col++){
                const nCol = createCol("hex", col);
                nCol.setAttribute("class", "cell");
                nCol.style.position = "absolute";
                nCol.style.left = `${col * 41}px`;
                nCol.style.top = "0px";
                nRow.appendChild(nCol);
            }
            hexTable.appendChild(nRow);
        }

        document.getElementById('board').appendChild(hexTable);

    }

    changeRules(){
        // Change game title in header
        document.getElementById("game-title-current").innerHTML = "Hex";

        // Change game rules in rules lightbox
        document.getElementById("game-name").innerHTML = "Hex";
        document.getElementById("game-rules").innerHTML = "Players take turns placing their marks (X or O) in the hexagons \
        of their choosing. The winner must form a continous path from their \
        starting side to the opposite side by connecting the hexagons on their edges. \
        The four corners of the hexagon can be considered to be part of either of the \
        sides that they face.";
    }
}

export { Hex };