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

            resetBoard();
            for(let i = 0; i < 5; i++){
                board[i][0] = "X";
            }
            check = checkWinner("X", 0, 0, board, numRows, numCols);
            expect(check).toBeTruthy();
            

            resetBoard();
            for(let i = 0; i < 5; i++){
                board[i][i] = "X";
            }
            check = checkWinner("X", 0, 0, board, numRows, numCols);
            expect(check).toBeTruthy();
        });
        // test('bot left - all direction', () => {

        // });
        // test('bot right - all direction', () => {

        // });
        // test('top right - all direction', () => {

        // });
    });
});
// Basic Five in a Row Jest Test
