
// Capture Function Unit Tests



let isInRange = (index1, index2) =>{
    // Row and Column positions of new move and other move
    let newMoveRow = Math.floor(newMove / 6);
    let newMoveCol = newMove % 6;
    let otherMoveRow = Math.floor(otherMove / 6);
    let otherMoveCol = otherMove % 6;

    /**
     * checks if board's row and col position is a wall 
     * @param {Number} row row position 
     * @param {Number} col column position 
     * @returns true if board's position is a wall 
     */
    let checkWall = (row, col) => {
        if(this._board[row][col] === "|") return true;
    }

    // If new move same row as other move, check left and right
    if(newMoveRow === otherMoveRow){
        // If new move left of other move
        if(otherMoveCol > newMoveCol){
            // Check squares left to right
            for(let i = newMoveCol + 1; i < otherMoveCol; i++){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(newMoveRow, i)) return false;
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }

        // If new move right of other move
        if(otherMoveCol < newMoveCol){
            // Check squares right to left
            for(let i = newMoveCol - 1; i > otherMoveCol; i--){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(newMoveRow, i)) return false;
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }
    }
    // If new move same column other move, check up and down
    else if(newMoveCol === otherMoveCol){
        // If new move above other move 
        if(otherMoveRow > newMoveRow){
            // Check squares top to bottom
            for(let i = newMoveRow + 1; i < otherMoveRow; i++){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(i, newMoveCol)) return false;
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }
        // If new move below other move 
        if(otherMoveRow < newMoveRow){
            // Check squares bottom to top 
            for(let i = newMoveRow - 1; i > otherMoveRow; i--){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(i, newMoveCol)) return false;
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }
    }
    // If new move same diagonal as other move, check all diagonals
    else if(Math.abs(newMoveCol - otherMoveCol) === Math.abs(newMoveRow - otherMoveRow)){
        // If new move top left of other move
        if(otherMoveCol > newMoveCol && otherMoveRow > newMoveRow){
            // Check each square top left to bottom right
            for(let i = 1; newMoveCol + i <= otherMoveCol; i++){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(newMoveRow + i, newMoveCol + i)) return false;
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }
        // If new move bottom right of other move
        if(otherMoveCol < newMoveCol && otherMoveRow < newMoveRow){
            // Check each square bottom right to top left
            for(let i = 1; newMoveCol - i >= otherMoveCol; i++){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(newMoveRow - i, newMoveCol - i)) return false;
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }
        // If new move bottom left of other move 
        if(otherMoveCol > newMoveCol && otherMoveRow < newMoveRow){
            // Check each square bottom left to top right
            for(let i = 1; i + newMoveCol <= otherMoveCol; i++){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(newMoveRow - i, newMoveCol + i)){
                    return false;
                }
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }
        // If new move top right of other move
        if(otherMoveCol < newMoveCol && otherMoveRow > newMoveRow){
            // Check each square top right to bottom left
            for(let i = 1; newMoveCol - i >= otherMoveCol; i++){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(newMoveRow + i, newMoveCol - i)){
                    return false;
                }
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }
    }

    // If code reaches here, new move not in range of other move, return false
    return false;
}

let isTrapped = (index) =>{
    // Row and column of move
    let row = Math.floor(index / 6);
    let col = index % 6;
    
    // Check squares all around
    if(row - 1 > -1 && this._board[row - 1][col] !== "|") return false;
    if(col - 1 > -1 && this._board[row][col - 1] !== "|") return false;
    if(row - 1 > -1 && col - 1 > -1 && this._board[row - 1][col - 1] !== "|") return false;
    if(row + 1 < 6 && this._board[row + 1][col] !== "|") return false;
    if(col + 1 < 6 && this._board[row][col + 1] !== "|") return false;
    if(row + 1 < 6 && col + 1 < 6 && this._board[row + 1][col + 1] !== "|") return false;
    if(row - 1 > -1 && col + 1 < 6 && this._board[row - 1][col + 1] !== "|") return false;
    if(row + 1 < 6 && col - 1 > -1 && this._board[row + 1][col - 1] !== "|") return false;

    // at this point, square is surrounded, return true
    return true;
}
