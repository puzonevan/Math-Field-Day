/********** TO DO **********/
// [] Create Two Players
// [] Create Board objects 
// [] Experiment with game loops

/************* IMPORTS *************/
// Import Player Class 
import { Player } from "./player.js";
// Import Game Classes


/////////////////////////////////////////////////////////////////////

/************* PLAYER VARIABLES *************/
const player1 = new Player();
const player2 = new Player();


/////////////////////////////////////////////////////////////////////

/************* EXPORT FUNCTIONS *************/
const startGame = (game) =>{
    console.log(game);
}

export {startGame};