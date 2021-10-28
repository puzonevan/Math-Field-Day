import { initializeBoard } from "../board/initialize.js";
import { restartBoard } from "../board/restart.js";

document.getElementById("menu-mancala").addEventListener('click', () =>{

    restartBoard(document.getElementById("board"));

    initializeBoard("mancala");

});