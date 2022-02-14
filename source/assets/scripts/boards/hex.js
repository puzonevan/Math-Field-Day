/************* IMPORTS *************/
import { createTable, createRow, createCol } from "./board.js";
import { winnerLightbox } from "../header/winner.js";

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class Hex{
    
    constructor(player1, player2){
        this._player1 = player1;
        this._player2 = player2;
        this._board = this.initializeBoard();
        this._flag = 0;
    }

    initializeBoard(){
        let board = [];
        for(let i = 0; i < 12; i++){
            let row = [];
            for(let j = 0; j < 12; j++){
                row.push("");
            }
            board.push(row);
        }
        return board;
    }
    

    start(){
        // Loop through each square
        [...document.getElementsByTagName("td")].forEach((square, index) =>{

            // Listen for click events
            square.addEventListener("click", () =>{

                // Do nothing if there is already an X or O
                if(square.innerHTML == "O" || square.innerHTML == "X") return;

                // Player 1's move 
                if(this._flag === 0){
                        // Display the O 
                        square.innerHTML = "O";
                        square.style.color = "#276FBF";

                        // Player's Move 
                        this.move(index);

                        // Change turns
                        this._flag = 1;
                }
                // Player 2's move
                else if(this._flag === 1){
                        // Display the X 
                        square.innerHTML = "X";
                        square.style.color = "#F03A47";

                        // Player's Move 
                        this.move(index);

                        // Change Turns
                        this._flag = 0;
                    
                }
            });
        });
    }

    move(index){

        // Find row and column
        let row = Math.floor(index / 12);
        let col = index % 12;
        console.log(`row: ${row} | col: ${col}`);

        // Update board
        this._flag == 0 ? this._board[row][col] = "O" : this._board[row][col] = "X";
        
        if(this.checkWinner()) this.declareWinner();
    }

    checkWinner(){

        const stack = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        
        stack.forEach(value =>{
            if(this._flag == 0){
                if(this._board[value][0] != "O") continue;
                // DFS
                if(this.dfs({ row: value, col: 0 })) return true;
            }
            else{
                if(this._board[0][value] != "X") continue;
                if(this.dfs({ row: 0, col: value })) return true;
            }
        });

        return false;

    }

    dfs(start){
        let visited = [start];
        let stack = [];
        stack.push(start);

        while(!stack.length){
            
        }
    }

    /**
     * create the winner lightbox and display
     */
     declareWinner(){
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