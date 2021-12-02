/************* IMPORTS *************/
import { createTable, createRow, createCol } from "./board.js"

/////////////////////////////////////////////////////////////////////

/************* CAPTURE CLASS *************/
class TicTacToe3D{
    
    constructor(){

    }

    static createBoard(){
        // Create div for table
        const div = document.createElement('div');

        // 3D Tic Tac Toe Table
        const table = createTable("tic-tac-toe-3d");
        
        for(let row = 0; row < 3; row++){
            const nRow = createRow("tic-tac-toe-3d", row);
            for(let col = 0; col < 3; col++){
                const nCol = createCol("tic-tac-toe-3d", col);
                nRow.appendChild(nCol);
            }
            table.appendChild(nRow);
        }
        div.appendChild(table);
        document.getElementById('board').appendChild(div);
    
    }
}

export { TicTacToe3D };