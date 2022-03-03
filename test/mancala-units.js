// Mancala functions to unit test
const getRow = (index)=>{
    return(index < 8 ? 0 : 1);
}

const getCol = (index)=>{
    return(index < 8 ? index : index - 8);
}

const getOpp = (index)=>{
    return(index < 8 ? index + 7 : index - 7);
}

const updateBoard = (row, col, value, board) =>{
    if(row === 0 && (col === 0 || col === 7)) return;
    if(row === 0){
        board[row][col - 1] = value;
    }
    else{
        board[row][col] = value;
    }
}

const checkWinner = (flag, board)=>{
    let sum = board[flag].reduce((acc, curr) =>{
        return acc + curr;
    });

    if(sum === 0){
        if(flag === 0){
            return 1;
        }
        else if(flag === 1){
            return 2;
        }
    }

    return -1;
}

exports.getRow = getRow;
exports.getCol = getCol;
exports.getOpp = getOpp;
exports.updateBoard = updateBoard;
exports.checkWinner = checkWinner;