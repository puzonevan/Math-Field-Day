import { initializeBoard } from "../board/initialize.js";
import { restartBoard } from "../board/restart.js";

document.getElementById("menu-hex").addEventListener('click', () =>{

    restartBoard(document.getElementById("board"));

    initializeBoard("hex");

});