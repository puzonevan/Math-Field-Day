// Capture Function Unit Tests

let isInRange = (board, index1, index2) =>{
    // Row and Column positions of new move and other move
    let index1Row = Math.floor(index1 / 6);
    let index1Col = index1 % 6;
    let index2Row = Math.floor(index2 / 6);
    let index2Col = index2 % 6;

    /**
     * checks if board's row and col position is a wall 
     * @param {Number} row row position 
     * @param {Number} col column position 
     * @returns true if board's position is a wall 
     */
    let checkWall = (row, col) => {
        if(board[row][col] === "|") return true;
    }

    // If new move same row as other move, check left and right
    if(index1Row === index2Row){
        // If new move left of other move
        if(index2Col > index1Col){
            // Check squares left to right
            for(let i = index1Col + 1; i < index2Col; i++){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(index1Row, i)) return false;
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }

        // If new move right of other move
        if(index2Col < index1Col){
            // Check squares right to left
            for(let i = index1Col - 1; i > index2Col; i--){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(index1Row, i)) return false;
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }
    }
    // If new move same column other move, check up and down
    else if(index1Col === index2Col){
        // If new move above other move 
        if(index2Row > index1Row){
            // Check squares top to bottom
            for(let i = index1Row + 1; i < index2Row; i++){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(i, index1Col)) return false;
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }
        // If new move below other move 
        if(index2Row < index1Row){
            // Check squares bottom to top 
            for(let i = index1Row - 1; i > index2Row; i--){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(i, index1Col)) return false;
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }
    }
    // If new move same diagonal as other move, check all diagonals
    else if(Math.abs(index1Col - index2Col) === Math.abs(index1Row - index2Row)){
        // If new move top left of other move
        if(index2Col > index1Col && index2Row > index1Row){
            // Check each square top left to bottom right
            for(let i = 1; index1Col + i <= index2Col; i++){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(index1Row + i, index1Col + i)) return false;
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }
        // If new move bottom right of other move
        if(index2Col < index1Col && index2Row < index1Row){
            // Check each square bottom right to top left
            for(let i = 1; index1Col - i >= index2Col; i++){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(index1Row - i, index1Col - i)) return false;
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }
        // If new move bottom left of other move 
        if(index2Col > index1Col && index2Row < index1Row){
            // Check each square bottom left to top right
            for(let i = 1; i + index1Col <= index2Col; i++){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(index1Row - i, index1Col + i)){
                    return false;
                }
            }
            // If it reaches here, then new move reaches the other move, return true
            return true;
        }
        // If new move top right of other move
        if(index2Col < index1Col && index2Row > index1Row){
            // Check each square top right to bottom left
            for(let i = 1; index1Col - i >= index2Col; i++){
                // If there is a wall, new move not in range of other move, return false
                if(checkWall(index1Row + i, index1Col - i)){
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

let isTrapped = (board, index) =>{
    // Row and column of move
    let row = Math.floor(index / 6);
    let col = index % 6;
    
    // Check squares all around
    if(row - 1 > -1 && board[row - 1][col] !== "|") return false;
    if(col - 1 > -1 && board[row][col - 1] !== "|") return false;
    if(row - 1 > -1 && col - 1 > -1 && board[row - 1][col - 1] !== "|") return false;
    if(row + 1 < 6 && board[row + 1][col] !== "|") return false;
    if(col + 1 < 6 && board[row][col + 1] !== "|") return false;
    if(row + 1 < 6 && col + 1 < 6 && board[row + 1][col + 1] !== "|") return false;
    if(row - 1 > -1 && col + 1 < 6 && board[row - 1][col + 1] !== "|") return false;
    if(row + 1 < 6 && col - 1 > -1 && board[row + 1][col - 1] !== "|") return false;

    // at this point, square is surrounded, return true
    return true;
}

exports.isInRange = isInRange;
exports.isTrapped = isTrapped;