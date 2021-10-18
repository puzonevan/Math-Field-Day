// Import Rules for Each Game 

// Get each game button from the menu 
const fiveInARowButton = document.getElementById("menu-five");
const captureButton = document.getElementById("menu-capture");
const ticTacToeButton = document.getElementById("menu-tic-tac-toe");
const hexButton = document.getElementById("menu-hex");
const mancalaButton = document.getElementById("menu-mancala");

// Five in a Row click 
fiveInARowButton.addEventListener('click', (e) =>{
    // Change the game name 
    document.getElementById("game-title-current").innerHTML = "Five in A Row";
});

// Capture click 
captureButton.addEventListener('click', (e) =>{
    // Change the game name 
    document.getElementById("game-title-current").innerHTML = "Capture";
});

// 3D-tic-tac-toe click 
ticTacToeButton.addEventListener('click', (e) =>{
    // Change the game name 
    document.getElementById("game-title-current").innerHTML = "3D-Tic-Tac-Toe";
});

// Hex click 
hexButton.addEventListener('click', (e) =>{
    // Change the game name 
    document.getElementById("game-title-current").innerHTML = "Hex";
});

// Mancala click 
mancalaButton.addEventListener('click', (e) =>{
    // Change the game name 
    document.getElementById("game-title-current").innerHTML = "Mancala";
});