/********** TO DO **********/
// [] Create Two Players
// [] Create Board objects 
// [] Experiment with game loops

/************* IMPORTS *************/
// Import Player Class 
import { Player } from "./player.js";
// Import Game Classes
import { Capture } from "../capture/capture.js";
import { FiveInARow } from "../five-in-a-row/fiveInARow.js";
import { Hex } from "../hex/hex.js";
import { Mancala } from "../mancala/mancala.js";
import { TicTacToe3D } from "../tic-tac-toe-3d/ticTacToe3d.js";


/////////////////////////////////////////////////////////////////////

/************* PLAYER VARIABLES *************/
let player1;
let player2;
/************* GAME VARIABLES *************/
let game;

/////////////////////////////////////////////////////////////////////

/************* HELPER FUNCTIONS *************/

/////////////////////////////////////////////////////////////////////

/************* EXPORT FUNCTIONS *************/
const startGame = (game) =>{

    // Initialize Players 
    player1 = new Player();
    player2 = new Player();

    // Initialize Game
}

export { startGame };