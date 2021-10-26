/************* IMPORTS *************/
import { closeLightbox, openLightbox } from './header.js';
import {rules} from './rules.js';

/////////////////////////////////////////////////////////////////////

/********** BUTTON VARIABLES **********/
const fiveInARowButton = document.getElementById("menu-five");
const captureButton = document.getElementById("menu-capture");
const ticTacToeButton = document.getElementById("menu-tic-tac-toe");
const hexButton = document.getElementById("menu-hex");
const mancalaButton = document.getElementById("menu-mancala");

/////////////////////////////////////////////////////////////////////

/********** FUNCTIONS **********/

// Menu Button when any game is clicked 
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

/////////////////////////////////////////////////////////////////////

/********** DOM EVENTS **********/

// Five in a Row click 
fiveInARowButton.addEventListener('click', (e) =>{
    // Call Menu function
    menuButton("Five in a Row"); 
});

// Capture click 
captureButton.addEventListener('click', (e) =>{
    // Call Menu function
    menuButton("Capture");
});

// 3D-tic-tac-toe click 
ticTacToeButton.addEventListener('click', (e) =>{
    // Call Menu function
    menuButton("3D Tic Tac Toe");
});

// Hex click 
hexButton.addEventListener('click', (e) =>{
    // Call Menu function 
    menuButton("Hex");
});

// Mancala click 
mancalaButton.addEventListener('click', (e) =>{
    // Call Mancala function
    menuButton("Mancala");
});