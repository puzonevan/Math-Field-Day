import { initializeBoard } from "../board/initialize.js";
import { restartBoard } from "../board/restart.js";

document.getElementById("menu-five").addEventListener('click', () =>{

    restartBoard(document.getElementById("board"));

    initializeBoard("five-in-a-row");

});