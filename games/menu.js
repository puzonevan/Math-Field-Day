// Import Header for rules
import { closeLightbox, openLightbox } from './header.js';
// Import Rules for Each Game 
import {rules} from './rules.js';


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
    document.getElementById("game-rules").innerHTML = rules['five-in-a-row'];

    // Close the menu and open the rules 
    closeLightbox("menu");
    openLightbox("rules");
});

// Capture click 
captureButton.addEventListener('click', (e) =>{

    // Change the game name 
    document.getElementById("game-title-current").innerHTML = "Capture";
    
    // Change the game rules
    document.getElementById("game-name").innerHTML = "Capture";
    document.getElementById("game-rules").innerHTML = rules.capture;

    // Close the menu and open the rules 
    closeLightbox("menu");
    openLightbox("rules");
});

// 3D-tic-tac-toe click 
ticTacToeButton.addEventListener('click', (e) =>{

    // Change the game name 
    document.getElementById("game-title-current").innerHTML = "3D-Tic-Tac-Toe";

    // Change the game rules
    document.getElementById("game-name").innerHTML = "3D-Tic-Tac-Toe";
    document.getElementById("game-rules").innerHTML = rules['tic-tac-toe-3d'];

    // Close the menu and open the rules 
    closeLightbox("menu");
    openLightbox("rules");
});

// Hex click 
hexButton.addEventListener('click', (e) =>{

    // Change the game name 
    document.getElementById("game-title-current").innerHTML = "Hex";

    // Change the game rules
    document.getElementById("game-name").innerHTML = "Hex";
    document.getElementById("game-rules").innerHTML = rules.hex;

    // Close the menu and open the rules 
    closeLightbox("menu");
    openLightbox("rules");
});

// Mancala click 
mancalaButton.addEventListener('click', (e) =>{

    // Change the game name 
    document.getElementById("game-title-current").innerHTML = "Mancala";

    // Change the game rules
    document.getElementById("game-name").innerHTML = "Mancala";
    document.getElementById("game-rules").innerHTML = rules.mancala;

    // Close the menu and open the rules 
    closeLightbox("menu");
    openLightbox("rules");
});