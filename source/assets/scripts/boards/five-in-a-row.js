/************* IMPORTS *************/
import { createTable, createRow, createCol} from "./board.js"

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class FiveInARow{
    
    constructor(player1, player2){
        this._player1 = player1; 
        this._player2 = player2;
        this._board = this.initializeBoard();
        this._flag = 0;
    }

    initializeBoard(){
        let board = [];
        for (let row = 0; row < 25; row++){
            let row = [];
            for(let col = 0; col < 50; col++){
                row.push("");
            }
            board.push(row);
        }
        return board;
    }

    
    
    start(){
        // Loop through each square 
        [...document.getElementsByTagName("td")].forEach((square, index) =>{
            square.addEventListener("click", () =>{

                // Do nothing if there is already an X or O
                if(square.className === "y-player" || square.className === "x-player"){
                    return;
                }

                if(this._flag === 0){
                    square.setAttribute("class", "y-player");
                    this.move("O", index);
                    if(this._player1.winner){
                        console.log("Player 1 wins");
                    }
                    this._flag = 1;
                }
                else if(this._flag === 1){
                    square.setAttribute("class", "x-player");
                    this.move("X",index);
                    if(this._player2.winner){
                        console.log("Player 2 wins");
                    }
                    this._flag = 0;
                }
            })
        })
    }

    move(move, index){
        let row = Math.floor(index / 50);
        let col = index % 50;
        move === "O" ? this._board[row][col] = "O" : this._board[row][col] = "X"; 
        this.checkWinner(move, row, col);
    }
    
    checkWinner(move, row, col){
        let pointer1;
        row - 1 > -1 ? pointer1 = this._board[row - 1][col] : pointer1 = "";
        let pointer2; 
        row + 1 < 25 ? pointer2 = this._board[row + 1][col] : pointer2 = "";
        let pointer1Count = 1;
        let pointer2Count = 1;
        let counter = 1;

        while(pointer1 === move || pointer2 === move){
            if(pointer1 === move){
                console.log("up");
                counter++;
                pointer1Count++;
                row - pointer1Count > -1 ? pointer1 = this._board[row - pointer1Count][col] : pointer1 = "";
            }
            if(pointer2 === move){
                console.log("down");
                counter++;
                pointer2Count++;
                row + pointer2Count < 25 ? pointer2 = this._board[row + pointer2Count][col] : pointer2 = ""; 
            }
        }
        
        console.log(counter);
        if(counter === 5){
            move === "O" ? this._player1.winner = true : this._player2.winner = true;
        }
        return;
    }

    clearInput(){
        [...document.getElementsByTagName("td")].forEach((square, index) =>{
            square.addEventListener("click", () =>{});
        });
    }

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