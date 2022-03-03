// Hex functions to unit test
const dfs = (start, flag, board) => {
    if(flag == 0 && board[start.row][start.col] != "O") return false;
    if(flag == 1 && board[start.row][start.col] != "X") return false;

    const visited = [`${start.row}, ${start.col}`];
    const move = flag == 0 ? "O" : "X";
    const stack = [];
    stack.push(start);

    while(stack.length > 0){
        
        const current = stack.pop();
        if(flag == 0){
            if(current.col == 11) return true;
        }
        else if(flag == 1){
            if(current.row == 11) return true;
        }
        console.log(current);
        console.log(visited);

        // Add 6 possible neighbors
        // Top left (row - 1)(col)
        // Top right (row - 1)(col + 1)
        // left (row)(col - 1)
        // right (row)(col + 1)
        // Bot left (row + 1)(col - 1)
        // Bot right (row + 1)(col)
        if(current.col - 1 > 0 && board[current.row][current.col - 1] == move){
            if(!visited.includes(`${current.row}, ${current.col - 1}`)){
                visited.push(`${current.row}, ${current.col - 1}`);
                stack.push({ row: current.row, col: current.col - 1 });
            }
        }
        if(current.col + 1 < 12 && board[current.row][current.col + 1] == move){
            if(!visited.includes(`${current.row}, ${current.col + 1}`)){
                visited.push(`${current.row}, ${current.col + 1}`);
                stack.push({ row: current.row, col: current.col + 1});
            }
        }
        if(current.row - 1 > 0){
            if(board[current.row - 1][current.col] == move && !visited.includes(`${current.row - 1}, ${current.col}`)){
                visited.push(`${current.row - 1}, ${current.col}`);
                stack.push({ row: current.row - 1, col: current.col});
            }
            if(board[current.row - 1][current.col + 1] == move && current.col + 1 < 12){
                if(!visited.includes(`${current.row - 1}, ${current.col + 1}`)){
                    visited.push(`${current.row - 1}, ${current.col + 1}`);
                    stack.push({ row: current.row - 1, col: current.col + 1});
                }
            }
        }
        if(current.row + 1 < 12){
            if(board[current.row + 1][current.col] == move && !visited.includes(`${current.row + 1}, ${current.col}`)){
                visited.push(`${current.row + 1}, ${current.col}`);
                stack.push({ row: current.row + 1, col: current.col});
            }
            if(current.col - 1 > 0){
                if(board[current.row + 1][current.col - 1] == move && !visited.includes(`${current.row + 1}, ${current.col - 1}`)){
                    visited.push(`${current.row + 1}, ${current.col - 1}`);
                    stack.push({ row: current.row + 1, col: current.col - 1});
                }
            }
        }
        
    }
}

exports.dfs = dfs;