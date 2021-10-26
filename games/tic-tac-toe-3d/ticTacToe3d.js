import { initializeBoard } from "../board/initialize.js";
import { restartBoard } from "../board/restart.js";

document.getElementById("menu-tic-tac-toe").addEventListener('click', () =>{

    restartBoard(document.getElementById("board"));

    initializeBoard("tic-tac-toe-3d");

});