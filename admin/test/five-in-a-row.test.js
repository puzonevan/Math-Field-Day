const { checkWinner } = require('./five-in-a-row-units');

const board = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
];

const numRows = 7;
const numCols = 7;

const resetBoard = () => {
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            board[i][j] = "";
        }
    }
}

describe('7x7 board .checkWinner()', () => {
    describe('corner cases', () => {
        // EACH CORNER ONLY HAS 3 DIRECTIONS TO CHECK
        test('top left - all direction', () => {
            // left to right 
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[0][i] = "X";
            }
            let check = checkWinner("X", 0, 0, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[0][2] = "O";
            check = checkWinner("X", 0, 0, board, numRows, numCols);
            expect(check).toBeFalsy();

            // top to down
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[i][0] = "X";
            }
            check = checkWinner("X", 0, 0, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[2][0] = "O";
            check = checkWinner("X", 0, 0, board, numRows, numCols);
            expect(check).toBeFalsy();

            // diagonal
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[i][i] = "X";
            }
            check = checkWinner("X", 0, 0, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[2][2] = "O";
            check = checkWinner("X", 0, 0, board, numRows, numCols);
            expect(check).toBeFalsy();
        });

        test('bot left - all direction', () => {
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[numRows - 1][i] = "X";
            }
            let check = checkWinner("X", numRows - 1, 0, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[numRows - 1][2] = "O";
            check = checkWinner("X", numRows - 1, 0, board, numRows, numCols);
            expect(check).toBeFalsy();

            resetBoard();
            for(let i = 0; i < 5; i++){
                board[numRows - i - 1][0] = "X";
            }
            check = checkWinner("X", numRows - 1, 0, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[numRows - 3][0] = "O";
            check = checkWinner("X", numRows - 1, 0, board, numRows, numCols);
            expect(check).toBeFalsy();

            resetBoard();
            for(let i = 0; i < 5; i++){
                board[numRows - i - 1][i] = "X";
            }
            check = checkWinner("X", numRows - 1, 0, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[numRows - 2][1] = "O";
            check = checkWinner("X", numRows - 1, 0, board, numRows, numCols);
            expect(check).toBeFalsy();
        });

        test('top right - all direction', () => {
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[0][numCols - i - 1] = "X";
            }
            let check = checkWinner("X", 0, numCols - 1, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[0][numCols - 2] = "O";
            check = checkWinner("X", 0, numCols - 1, board, numRows, numCols);
            expect(check).toBeFalsy();

            resetBoard();
            for(let i = 0; i < 5; i++){
                board[i][numCols - 1] = "X";
            }
            check = checkWinner("X", 0, numCols - 1, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[1][numCols - 1] = "O";
            check = checkWinner("X", 0, numCols - 1, board, numRows, numCols);
            expect(check).toBeFalsy();

            resetBoard();
            for(let i = 0; i < 5; i++){
                board[i][numCols - i - 1] = "X";
            }
            check = checkWinner("X", 0, numCols - 1, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[1][numCols - 2] = "O";
            check = checkWinner("X", 0, numCols - 1, board, numRows, numCols);
            expect(check).toBeFalsy();
        });
        
        test('bot right - all direction', () => {
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[numRows - 1][numCols - i - 1] = "X";
            }
            let check = checkWinner("X", numRows - 1, numCols - 1, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[numRows - 1][numCols - 2] = "O";
            check = checkWinner("X", numRows - 1, numCols - 1, board, numRows, numCols);
            expect(check).toBeFalsy();

            resetBoard();
            for(let i = 0; i < 5; i++){
                board[numRows - i - 1][numCols - 1] = "X";
            }
            check = checkWinner("X", numRows - 1, numCols - 1, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[numRows - 2][numCols - 1] = "O";
            check = checkWinner("X", numRows - 1, numCols - 1, board, numRows, numCols);
            expect(check).toBeFalsy();

            resetBoard();
            for(let i = 0; i < 5; i++){
                board[numRows - i - 1][numCols - i - 1] = "X";
            }
            check = checkWinner("X", numRows - 1, numCols - 1, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[numRows - 2][numCols - 2] = "O";
            check = checkWinner("X", numRows - 1, numCols - 1, board, numRows, numCols);
            expect(check).toBeFalsy();
        });
    });

    describe('general all direction cases', () => {
        test('left to right', () => {
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[3][i + 2] = "X";
            }
            let check = checkWinner("X", 3, 2, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[3][4] = "O";
            check = checkWinner("X", 3, 2, board, numRows, numCols);
            expect(check).toBeFalsy();
        });
        test('up to down', () => {
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[i + 2][3] = "X";
            }
            let check = checkWinner("X", 2, 3, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[3][3] = "O";
            check = checkWinner("X", 2, 3, board, numRows, numCols);
            expect(check).toBeFalsy();
        });
        test('diagonal 1', () => {
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[i + 1][i + 1] = "X";
            }
            let check = checkWinner("X", 1, 1, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[2][2] = "O";
            check = checkWinner("X", 1, 1, board, numRows, numCols);
            expect(check).toBeFalsy();
        });
        test('diagonal 2', () => {
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[6 - i][i] = "X";
            }
            let check = checkWinner("X", 6, 0, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[5][1] = "O";
            check = checkWinner("X", 6, 0, board, numRows, numCols);
            expect(check).toBeFalsy();
        });
    });

    describe('more than 5 in a row', () => {
        test('left to right', () => {
            resetBoard();
            for(let i = 0; i < 6; i++){
                board[3][i + 2] = "X";
            }
            let check = checkWinner("X", 3, 2, board, numRows, numCols);
            expect(check).toBeTruthy();
        });
        test('up to down', () => {
            resetBoard();
            for(let i = 0; i < 6; i++){
                board[i + 1][3] = "X";
            }
            let check = checkWinner("X", 1, 3, board, numRows, numCols);
            expect(check).toBeTruthy();
        });
        test('diagonal 1', () => {
            resetBoard();
            for(let i = 0; i < 6; i++){
                board[i + 1][i + 1] = "X";
            }
            let check = checkWinner("X", 1, 1, board, numRows, numCols);
            expect(check).toBeTruthy();
        });
        test('diagonal 2', () => {
            resetBoard();
            for(let i = 0; i < 6; i++){
                board[6 - i][i] = "X";
            }
            let check = checkWinner("X", 6, 0, board, numRows, numCols);
            expect(check).toBeTruthy();
        });
    });

    describe('check each letter', () => {
        // if you have X X X X X, check each one
        // because player could have placed the 
        // last x in any of those spots
        test('left to right', () => {
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[3][i + 2] = "X";
            }
            let check = checkWinner("X", 3, 2, board, numRows, numCols);
            for(let i = 0; i < 5; i++){
                check = checkWinner("X", 3, i + 2, board, numRows, numCols);
                expect(check).toBeTruthy();
            }
        });
        test('up to down', () => {
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[i + 2][3] = "X";
            }
            let check = checkWinner("X", 2, 3, board, numRows, numCols);
            for(let i = 0; i < 5; i++){
                check = checkWinner("X", i + 2, 3, board, numRows, numCols);
                expect(check).toBeTruthy();
            }
        });
        test('diagonal 1', () => {
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[i + 1][i + 1] = "X";
            }
            let check = checkWinner("X", 1, 1, board, numRows, numCols);
            for(let i = 0; i < 5; i++){
                check = checkWinner("X", i + 1, i + 1, board, numRows, numCols);
                expect(check).toBeTruthy();
            }
        });
        test('diagonal 2', () => {
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[6 - i][i] = "X";
            }
            let check = checkWinner("X", 6, 0, board, numRows, numCols);
            for(let i = 0; i < 5; i++){
                check = checkWinner("X", 6 - i, i, board, numRows, numCols);
                expect(check).toBeTruthy();
            }
        });
    });

});
