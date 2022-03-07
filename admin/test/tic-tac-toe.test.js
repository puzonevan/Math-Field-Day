const { checkWinner } = require('./tic-tac-toe-units.js');

const flag = 1;
const board = [
    [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
]

const topRow = [
    ["X", "X", "X"], 
    ["", "", ""], 
    ["", "", ""]
]

const middleRow = [
    ["", "", ""], 
    ["X", "X", "X"], 
    ["", "", ""]
]

const bottomRow = [
    ["", "", ""], 
    ["", "", ""],
    ["X", "X", "X"]
]

const leftCol = [
    ["X", "", ""], 
    ["X", "", ""], 
    ["X", "", ""]
]

const middleCol = [
    ["", "X", ""], 
    ["", "X", ""], 
    ["", "X", ""]
]

const rightCol = [
    ["", "", "X"], 
    ["", "", "X"], 
    ["", "", "X"]
]

const diag1 = [
    ["X", "", ""], 
    ["", "X", ""], 
    ["", "", "X"]
]

const diag2 = [
    ["", "", "X"], 
    ["", "X", ""], 
    ["X", "", ""]
]

const resetBoard = () =>{
    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            for(let k = 0; k < 3; k++){
                board[i][j][k] = "";
            }
        }
    }
}

const initBoard = (boardNum, newBoard) => {
    board[boardNum] = newBoard;
}

const blockBoard = (x, y, z) => {
    board[x][y][z] = "O";
}

describe('.checkWinner()', () => {
    describe('all possible combinations on one board', () =>{
        let check;
        for(let i = 0; i < 3; i++){
            test(`board ${i}`, () =>{
                resetBoard();
                initBoard(i, topRow);
                check = checkWinner(i, board, flag);
                console.log(board);
                expect(check).toBeTruthy();
                board[i][0][1] = "O";
                check = checkWinner(i, board, flag);
                expect(check).toBeFalsy();

                resetBoard();
                initBoard(i, middleRow);
                check = checkWinner(i, board, flag);
                expect(check).toBeTruthy();
                board[i][1][1] = "O";
                check = checkWinner(i, board, flag);
                expect(check).toBeFalsy();

                resetBoard();
                initBoard(i, bottomRow);
                check = checkWinner(i, board, flag);
                expect(check).toBeTruthy();
                board[i][2][1] = "O";
                check = checkWinner(i, board, flag);
                expect(check).toBeFalsy();

                resetBoard();
                initBoard(i, leftCol);
                check = checkWinner(i, board, flag);
                expect(check).toBeTruthy();
                board[i][1][0] = "O";
                check = checkWinner(i, board, flag);
                expect(check).toBeFalsy();

                resetBoard();
                initBoard(i, middleCol);
                check = checkWinner(i, board, flag);
                expect(check).toBeTruthy();
                board[i][1][1] = "O";
                check = checkWinner(i, board, flag);
                expect(check).toBeFalsy();

                resetBoard();
                initBoard(i, rightCol);
                check = checkWinner(i, board, flag);
                expect(check).toBeTruthy();
                board[i][1][2] = "O";
                check = checkWinner(i, board, flag);
                expect(check).toBeFalsy();

                resetBoard();
                initBoard(i, diag1);
                check = checkWinner(i, board, flag);
                expect(check).toBeTruthy();
                board[i][1][1] = "O";
                check = checkWinner(i, board, flag);
                expect(check).toBeFalsy();

                resetBoard();
                initBoard(i, diag2);
                check = checkWinner(i, board, flag);
                expect(check).toBeTruthy();
                board[i][1][1] = "O";
                check = checkWinner(i, board, flag);
                expect(check).toBeFalsy();
            });
        }
    });

    describe('all possible combinations across boards', () =>{
        test('stacks', () => {

        });
        test('other', () =>{

        });
    });
});