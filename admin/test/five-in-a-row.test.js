const { checkWinner } = require('./five-in-a-row-units');

const moveX = "X";
const moveO = "O";

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
        test('top left - all direction', () => {
            resetBoard();
            for(let i = 0; i < 5; i++){
                board[0][i] = "X";
            }
            let check = checkWinner("X", 0, 0, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[0][2] = "O";
            check = checkWinner("X", 0, 0, board, numRows, numCols);
            expect(check).toBeFalsy();

            resetBoard();
            for(let i = 0; i < 5; i++){
                board[i][0] = "X";
            }
            check = checkWinner("X", 0, 0, board, numRows, numCols);
            expect(check).toBeTruthy();
            board[2][0] = "O";
            check = checkWinner("X", 0, 0, board, numRows, numCols);
            expect(check).toBeFalsy();

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
});
// Basic Five in a Row Jest Test
