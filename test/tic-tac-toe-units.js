// 3-D Tic Tac Toe functions to unit test
const checkWinner = (board, board3D, flag)=>{

    let win = false;
    let move;
    flag == 0 ? move = "O" : move = "X";

    // Go through each winning condition
    winningConditions2D.forEach((condition) =>{

        // Check if 3 in a row in current board
        let a = board3D[board][Math.floor(condition[0] / 3)][condition[0] % 3];
        let b = board3D[board][Math.floor(condition[1] / 3)][condition[1] % 3];
        let c = board3D[board][Math.floor(condition[2] / 3)][condition[2] % 3];

        if(a === move && b === move && c === move){
            win = true;
        }

        // Check three in a row, 1 per board 
        let d = board3D[0][Math.floor(condition[0] / 3)][condition[0] % 3];
        let e = board3D[1][Math.floor(condition[1] / 3)][condition[1] % 3];
        let f = board3D[2][Math.floor(condition[2] / 3)][condition[2] % 3];

        if(d === move && e === move && f === move){
            win = true;
        }

        // Check three in a row, other direction
        d = board3D[0][Math.floor(condition[2] / 3)][condition[2] % 3];
        f = board3D[2][Math.floor(condition[0] / 3)][condition[0] % 3];
        if(d === move && e === move && f === move){
            win = true;
        }
    });

    // Check if 3 in a row stacked in any 9 spots
    for(let i = 0; i < 9; i++){
        let a = board3D[0][Math.floor(i / 3)][i % 3];
        let b = board3D[1][Math.floor(i / 3)][i % 3];
        let c = board3D[2][Math.floor(i / 3)][i % 3];

        if(a === move && b === move && c === move){
            win = true;
        }
    }

    return win;
}

exports.checkWinner = checkWinner;
