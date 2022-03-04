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

});
// Basic Five in a Row Jest Test
