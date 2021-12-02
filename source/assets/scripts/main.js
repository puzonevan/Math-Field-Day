/************* IMPORTS *************/

// Boards
import { Capture } from "./boards/capture.js";
import { FiveInARow } from "./boards/five-in-a-row.js";
import { Hex } from "./boards/hex.js";
import { Mancala } from "./boards/mancala.js";
import { TicTacToe3D } from "./boards/tic-tac-toe-3d.js";

// Header
import { menuLightbox } from "./header/menu.js";
import { rulesLightbox } from "./header/rules.js";
import { newGameLightbox } from "./header/new-game.js";
import { Player } from "./header/player.js";

/////////////////////////////////////////////////////////////////////

/************* MAIN PROGRAM *************/

// Players 
const player1 = new Player(document.getElementById("player-1-name"));
const player2 = new Player(document.getElementById("player-2-name"));

// Boards
const capture = new Capture();
const fiveInARow = new FiveInARow();
const mancala = new Mancala();
const tictactoe = new TicTacToe3D();
const hex = new Hex();

/////////////////////////////////////////////////////////////////////

/************* HELPERS *************/
