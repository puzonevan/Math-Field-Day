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


const menuButton = (game) =>{
    
    // Change game name 
    document.getElementById("game-title-current").innerHTML = game;

    // Change game rules 
    document.getElementById("game-name").innerHTML = game;
    document.getElementById("game-rules").innerHTML = rules[game];

    // Close the menu and open the rules 
    closeLightbox("menu");
    openLightbox("rules");

}

// Five in a Row click 
fiveInARowButton.addEventListener('click', (e) =>{

    menuButton("Five in a Row");

});

// Capture click 
captureButton.addEventListener('click', (e) =>{

    menuButton("Capture");

});

// 3D-tic-tac-toe click 
ticTacToeButton.addEventListener('click', (e) =>{

    menuButton("3D Tic Tac Toe");

});

// Hex click 
hexButton.addEventListener('click', (e) =>{

    menuButton("Hex");

});

// Mancala click 
mancalaButton.addEventListener('click', (e) =>{

    menuButton("Mancala");

});