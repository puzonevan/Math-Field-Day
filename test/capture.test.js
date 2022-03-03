// Capture test
const capture = require('./capture-units');

// Capture boards
const boardCorners = [["X","","","","","X"],
                ["","","","","",""],
                ["","","","","",""],
                ["","","","","",""],
                ["","","","","",""],
                ["X","","","","","X"]];

const boardCornersBlock = [["X","","|","","","X"],
                ["","","","","",""],
                ["","","|","|","",""],
                ["|","","","","","|"],
                ["","","","","",""],
                ["X","","","|","","X"]];

const boardCorner3 = [["","","","","",""],
                ["","","","","",""],
                ["","","","","",""],
                ["","","","","",""],
                ["","","","","",""],
                ["","","","","",""]];

const boardCorner4 = [["","","","","",""],
                ["","","","","",""],
                ["","","","","",""],
                ["","","","","",""],
                ["","","","","",""],
                ["","","","","",""]];

describe('.isInRange()', () =>{
    // Test 4 sides not blocked
    test('corner all sides - not blocked', () =>{
        const topSide = capture.isInRange(boardCorners, 0, 5);
        expect(topSide).toBeTruthy();
        const bottomSide = capture.isInRange(boardCorners, 30, 35);
        expect(bottomSide).toBeTruthy();
        const leftSide = capture.isInRange(boardCorners, 0, 30);
        expect(leftSide).toBeTruthy();
        const rightSide = capture.isInRange(boardCorners, 5, 35);
        expect(rightSide).toBeTruthy();
    });

    // Test 4 sides blocked
    test('corner all sides - blocked', () =>{
        const topSide = capture.isInRange(boardCornersBlock, 0, 5);
        expect(topSide).toBeFalsy();
        const bottomSide = capture.isInRange(boardCornersBlock, 30, 35);
        expect(bottomSide).toBeFalsy();
        const leftSide = capture.isInRange(boardCornersBlock, 0, 30);
        expect(leftSide).toBeFalsy();
        const rightSide = capture.isInRange(boardCornersBlock, 5, 35);
        expect(rightSide).toBeFalsy();
    });

    // Test diagonals not blocked
    test('corner diagonals - not blocked', () =>{
        let diagonal = capture.isInRange(boardCorners, 0, 35);
        expect(diagonal).toBeTruthy();
        diagonal = capture.isInRange(boardCorners, 35, 0);
        expect(diagonal).toBeTruthy();
        diagonal = capture.isInRange(boardCorners, 5, 30);
        expect(diagonal).toBeTruthy();
        diagonal = capture.isInRange(boardCorners, 30, 5);
        expect(diagonal).toBeTruthy();
    });

    // Test diagonals blocked
    test('corner diagonals - blocked', () =>{
        let diagonal = capture.isInRange(boardCornersBlock, 0, 35);
        expect(diagonal).toBeFalsy();
        diagonal = capture.isInRange(boardCornersBlock, 35, 0);
        expect(diagonal).toBeFalsy();
        diagonal = capture.isInRange(boardCornersBlock, 5, 30);
        expect(diagonal).toBeFalsy();
        diagonal = capture.isInRange(boardCornersBlock, 30, 5);
        expect(diagonal).toBeFalsy();
    });

    // Test generic non blocks
    
});





