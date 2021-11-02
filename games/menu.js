/************* IMPORTS *************/
// Import Header functions
import { closeLightbox, openLightbox } from './header.js';
// Import Board functions
import { initializeBoard } from "./board/initialize.js";
import { restartBoard } from "./board/restart.js";
// Import Rules
import { rules } from './rules.js';
// Import Game Loop functions 
import { startGame } from './board/gameLoop.js';

/////////////////////////////////////////////////////////////////////

/********** GAME BUTTON VARIABLES **********/
const fiveInARowButton = document.getElementById("menu-five");
const captureButton = document.getElementById("menu-capture");
const ticTacToeButton = document.getElementById("menu-tic-tac-toe");
const hexButton = document.getElementById("menu-hex");
const mancalaButton = document.getElementById("menu-mancala");

/////////////////////////////////////////////////////////////////////

/********** HELPER FUNCTIONS **********/

/**
 * menuButton - change header according to game and open rules
 * @param {""} game name of the game
 */
const menuButton = (game) =>{
    
    // Change game title in header
    document.getElementById("game-title-current").innerHTML = game;

    // Change game rules in rules lightbox
    document.getElementById("game-name").innerHTML = game;
    document.getElementById("game-rules").innerHTML = rules[game];

    // Close the menu and open the rules lightbox
    closeLightbox("menu");
    openLightbox("rules");
}

/////////////////////////////////////////////////////////////////////

/********** DOM EVENTS **********/

// Five in a Row click 
fiveInARowButton.addEventListener('click', (e) =>{
    // Call Menu function
    menuButton("Five in a Row"); 

    // Restart and Initialize the Board
    restartBoard(document.getElementById("board"));
    initializeBoard("five-in-a-row");

    // Start the Game 
    startGame("five-in-a-row");
});

// Capture click 
captureButton.addEventListener('click', (e) =>{
    // Call Menu function
    menuButton("Capture");

    // Restart and Initialize the Board
    restartBoard(document.getElementById("board"));
    initializeBoard("capture");

    // Start the Game 
    startGame("capture");
});

// 3D-tic-tac-toe click 
ticTacToeButton.addEventListener('click', (e) =>{
    // Call Menu function
    menuButton("3D Tic Tac Toe");

    // Restart and Initialize the Board
    restartBoard(document.getElementById("board"));
    initializeBoard("tic-tac-toe-3d");

    // Start the Game 
    startGame("tic-tac-toe-3d");
});

// Hex click 
hexButton.addEventListener('click', (e) =>{
    // Call Menu function 
    menuButton("Hex");

    // Restart and Initialize the Board
    restartBoard(document.getElementById("board"));
    initializeBoard("hex");

    // Start the Game 
    startGame("hex");
});

// Mancala click 
mancalaButton.addEventListener('click', (e) =>{
    // Call Mancala function
    menuButton("Mancala");

    // Restart and Initialize the Board
    restartBoard(document.getElementById("board"));
    initializeBoard("mancala");

    // Start the Game 
    startGame("mancala");
});