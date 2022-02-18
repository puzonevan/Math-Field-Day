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
                ["","","","","",""],
                ["|","","|","","","|"],
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


test('corner top side - not blocked', () =>{
    const topSide = capture.isInRange(boardCorners, 0, 5);
    expect(topSide).toBeTruthy();
});

test('corner bottom side - not blocked', () =>{
    const bottomSide = capture.isInRange(boardCorners, 30, 35);
    expect(bottomSide).toBeTruthy();
});

test('corner left side - not blocked', () =>{
    const leftSide = capture.isInRange(boardCorners, 0, 30);
    expect(leftSide).toBeTruthy();
});

test('corner right side - not blocked', () =>{
    const rightSide = capture.isInRange(boardCorners, 5, 35);
    expect(rightSide).toBeTruthy();
});