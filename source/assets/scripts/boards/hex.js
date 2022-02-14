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
        // console.log(`row: ${row} | col: ${col}`);

        // Update board
        this._flag == 0 ? this._board[row][col] = "O" : this._board[row][col] = "X";
        
        if(this.checkWinner()) this.declareWinner();
    }

    checkWinner(){

        const stack = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        
        stack.forEach(value =>{
            if(this._flag == 0){
                if(this.dfs({ row: value, col: 0 })) return true;
            }
            else{
                if(this.dfs({ row: 0, col: value })) return true;
            }
        });

        return false;

    }

    dfs(start){
        
        if(this._flag == 0 && this._board[start.row][start.col] != "O") return false;
        if(this._flag == 1 && this._board[start.row][start.col] != "X") return false;

        const visited = [`${start.row}, ${start.col}`];
        const move = this._flag == 0 ? "O" : "X";
        const stack = [];
        stack.push(start);

        while(stack.length > 0){
            
            const current = stack.pop();
            console.log(current);
            console.log(visited);

            // Add 6 possible neighbors
            // Top left (row - 1)(col)
            // Top right (row - 1)(col + 1)
            // left (row)(col - 1)
            // right (row)(col + 1)
            // Bot left (row + 1)(col - 1)
            // Bot right (row + 1)(col)
            if(current.col - 1 > 0 && this._board[current.row][current.col - 1] == move){
                if(!visited.includes(`${current.row}, ${current.col - 1}`)){
                    visited.push(`${current.row}, ${current.col - 1}`);
                    stack.push({ row: current.row, col: current.col - 1 });
                }
            }
            if(current.col + 1 < 12 && this._board[current.row][current.col + 1] == move){
                if(!visited.includes(`${current.row}, ${current.col + 1}`)){
                    visited.push(`${current.row}, ${current.col + 1}`);
                    stack.push({ row: current.row, col: current.col + 1});
                }
            }
            if(current.row - 1 > 0){
                if(this._board[current.row - 1][current.col] == move && !visited.includes(`${current.row - 1}, ${current.col}`)){
                    visited.push(`${current.row - 1}, ${current.col}`);
                    stack.push({ row: current.row - 1, col: current.col});
                }
                if(this._board[current.row - 1][current.col + 1] == move && current.col + 1 < 12){
                    if(!visited.includes(`${current.row - 1}, ${current.col + 1}`)){
                        visited.push(`${current.row - 1}, ${current.col + 1}`);
                        stack.push({ row: current.row - 1, col: current.col + 1});
                    }
                }
            }
            if(current.row + 1 < 12){
                if(this._board[current.row + 1][current.col] == move && !visited.includes(`${current.row + 1}, ${current.col}`)){
                    visited.push(`${current.row + 1}, ${current.col}`);
                    stack.push({ row: current.row + 1, col: current.col});
                }
                if(current.col - 1 > 0){
                    if(this._board[current.row + 1][current.col - 1] == move && !visited.includes(`${current.row + 1}, ${current.col - 1}`)){
                        visited.push(`${current.row + 1}, ${current.col - 1}`);
                        stack.push({ row: current.row + 1, col: current.col - 1});
                    }
                }
            }
            
            
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