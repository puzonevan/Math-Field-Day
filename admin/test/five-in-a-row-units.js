
// Five in a Row Functions to Unit Test

const checkWinner = (move, row, col, board, numRows, numCols) => {
    // Pointers for up and down 
    let pointerup;
    row - 1 > -1 ? pointerup = board[row - 1][col] : pointerup = "";
    let pointerdown; 
    row + 1 < numRows ? pointerdown = board[row + 1][col] : pointerdown = "";
    let pointerupOffset = 1;
    let pointerdownOffset = 1;

    // Pointers for left and right
    let pointerleft;
    col - 1 > -1 ? pointerleft = board[row][col - 1] : pointerleft = "";
    let pointerright;
    col + 1 < numCols ? pointerright = board[row][col + 1] : pointerright = "";
    let pointerleftOffset = 1;
    let pointerrightOffset = 1;

    // Pointers for Diagonal Right
    let pointertopright;
    col + 1 < numCols && row - 1 > -1 ? pointertopright = board[row - 1][col + 1] : pointertopright = "";
    let pointerbotleft;
    col - 1 > -1 && row + 1 < numRows ? pointerbotleft = board[row + 1][col - 1] : pointerbotleft = "";
    let pointertoprightOffset = 1;
    let pointerbotleftOffset = 1;

    // Pointers for Diagonal Left
    let pointertopleft;
    col - 1 > -1 && row - 1 > -1 ? pointertopleft = board[row - 1][col - 1] : pointertopleft = "";
    let pointerbotright;
    col + 1 < numCols && row + 1 < numRows ? pointerbotright = board[row + 1][col + 1] : pointerbotright = "";
    let pointertopleftOffset = 1;
    let pointerbotrightOffset = 1;

    // Counters for each direction
    let counterHorizontal = 1;
    let counterDiagonalRight = 1;
    let counterDiagonalLeft = 1;
    let counterVertical = 1;

    // while any pointer still contains an X or O
    // -> move the pointer in the direction 
    // -> update the counter
    while(pointerup === move || pointerdown === move || pointerleft === move || pointerright === move
        || pointertopright === move || pointerbotleft === move || pointertopleft === move || pointerbotright === move){

        // Premature check if any counters have reached 5 already
        if(counterVertical === 5 || counterHorizontal === 5 || counterDiagonalLeft === 5 || counterDiagonalRight === 5){
            return true;
        }

        // if up is an X or O
        // -> update counter, offset, and pointer
        if(pointerup === move){
            // console.log("up");
            counterVertical++;
            pointerupOffset++;
            row - pointerupOffset > -1 ? pointerup = board[row - pointerupOffset][col] : pointerup = "";
        }

        // if bottom is an X or O
        // -> update counter, offset, and pointer
        if(pointerdown === move){
            // console.log("down");
            counterVertical++;
            pointerdownOffset++;
            row + pointerdownOffset < numRows ? pointerdown = board[row + pointerdownOffset][col] : pointerdown = ""; 
        }

        // if left is an X or O
        // -> update counter, offset, and pointer
        if(pointerleft === move){
            // console.log("left");
            counterHorizontal++;
            pointerleftOffset++;
            col - pointerleftOffset > -1 ? pointerleft = board[row][col - pointerleftOffset] : pointerleft = "";
        }

        // if right is an X or O
        // -> update counter, offset, and pointer
        if(pointerright === move){
            // console.log("right");
            counterHorizontal++;
            pointerrightOffset++;
            col + pointerrightOffset < numCols ? pointerright = board[row][col + pointerrightOffset] : pointerright = "";
        }

        // if top right is an X or O
        // -> update counter, offset, and pointer
        if(pointertopright === move){
            // console.log("top right");
            counterDiagonalRight++;
            pointertoprightOffset++;
            col + pointertoprightOffset < numCols && row - pointertoprightOffset > -1 ? pointertopright = board[row - pointertoprightOffset][col + pointertoprightOffset] : pointertopright = "";
        }

        // if bottom left is an X or O
        // -> update counter, offset, and pointer
        if(pointerbotleft === move){
            // console.log("bot left");
            counterDiagonalRight++;
            pointerbotleftOffset++;
            col - pointerbotleftOffset > -1 && row + pointerbotleftOffset < numRows ? pointerbotleft = board[row + pointerbotleftOffset][col - pointerbotleftOffset] : pointerbotleft = "";
        }
        
        // if top left is an X or O
        // -> update counter, offset, and pointer
        if(pointertopleft === move){
            // console.log("top left");
            counterDiagonalLeft++;
            pointertopleftOffset++;
            col - pointertopleftOffset > -1 && row - pointertopleftOffset > -1 ? pointertopleft = board[row - pointertopleftOffset][col - pointertopleftOffset] : pointertopleft = "";
        }

        // if bottom right is an X or O
        // -> update counter, offset, and pointer
        if(pointerbotright === move){
            // console.log("bot right");
            counterDiagonalLeft++;
            pointerbotrightOffset++;
            col + pointerbotrightOffset < numCols && row + pointerbotrightOffset < numRows ? pointerbotright = board[row + pointerbotrightOffset][col + pointerbotrightOffset] : pointerbotright = "";
        }
        
    }

    // if any counters are greater than or equal to 5
    // -> declare the winner
    if(counterVertical >= 5 || counterHorizontal >= 5 || counterDiagonalLeft >= 5 || counterDiagonalRight >= 5){
        return true;
    }
    // console.log(`Up and down ${counterVertical}`);
    // console.log(`left and right ${counterHorizontal}`);
    // console.log(`Diagonal Right ${counterDiagonalRight}`);
    // console.log(`Diagonal Left ${counterDiagonalLeft}`);
    
    return false;
}

exports.checkWinner = checkWinner;