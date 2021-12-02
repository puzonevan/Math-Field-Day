/************* IMPORTS *************/
import { newGameLightbox } from "./new-game.js";
import { rulesLightbox } from "./rules.js";

/////////////////////////////////////////////////////////////////////

/************* BUTTON *************/

const menuButton = document.getElementById("menu-button");
const menuLightbox = document.getElementById("menu-lightbox");
menuLightbox.style.display = "none";

// Button click DOM
menuButton.addEventListener("click", () =>{
    
    // Close
    if(menuLightbox.style.display == "flex"){        
        document.getElementById("board").style.filter = "blur(0px)";
        menuLightbox.style.display = "none";
    }
    // Open
    else if(menuLightbox.style.display == "none"){
        document.getElementById("board").style.filter = "blur(10px)";
        menuLightbox.style.display = "flex";
        newGameLightbox.style.display = "none";
        rulesLightbox.style.display = "none";
    }
    
});

/////////////////////////////////////////////////////////////////////

/************* GAME BUTTONS *************/

const fiveInARowButton = document.getElementById("menu-five");
const captureButton = document.getElementById("menu-capture");
const ticTacToeButton = document.getElementById("menu-tic-tac-toe");
const hexButton = document.getElementById("menu-hex");
const mancalaButton = document.getElementById("menu-mancala");

/////////////////////////////////////////////////////////////////////

export { menuButton, menuLightbox, fiveInARowButton, captureButton, ticTacToeButton, hexButton, mancalaButton }