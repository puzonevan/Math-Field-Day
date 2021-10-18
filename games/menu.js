// Import Header for rules
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

    // Change the game rules
    document.getElementById("game-name").innerHTML = "Five in a Row";
    document.getElementById("game-rules").innerHTML = "Five in a Row rules";

    // Open the Rules Lightbox
    rulesLightbox;
});

// Capture click 
captureButton.addEventListener('click', (e) =>{

    // Change the game name 
    document.getElementById("game-title-current").innerHTML = "Capture";
    
    // Change the game rules
    document.getElementById("game-name").innerHTML = "Capture";
    document.getElementById("game-rules").innerHTML = "Capture rules";
});

// 3D-tic-tac-toe click 
ticTacToeButton.addEventListener('click', (e) =>{

    // Change the game name 
    document.getElementById("game-title-current").innerHTML = "3D-Tic-Tac-Toe";

    // Change the game rules
    document.getElementById("game-name").innerHTML = "3D-Tic-Tac-Toe";
    document.getElementById("game-rules").innerHTML = "3D-Tic-Tac-Toe rules";
});

// Hex click 
hexButton.addEventListener('click', (e) =>{

    // Change the game name 
    document.getElementById("game-title-current").innerHTML = "Hex";

    // Change the game rules
    document.getElementById("game-name").innerHTML = "Hex";
    document.getElementById("game-rules").innerHTML = "Hex rules";
});

// Mancala click 
mancalaButton.addEventListener('click', (e) =>{

    // Change the game name 
    document.getElementById("game-title-current").innerHTML = "Mancala";

    // Change the game rules
    document.getElementById("game-name").innerHTML = "Mancala";
    document.getElementById("game-rules").innerHTML = "Mancala rules";
});