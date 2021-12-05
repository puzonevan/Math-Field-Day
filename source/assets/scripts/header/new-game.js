/************* IMPORTS *************/
import { rulesLightbox } from "./rules.js";
import { menuLightbox } from "./menu.js";

/////////////////////////////////////////////////////////////////////

/************* BUTTON *************/

const newGameButton = document.getElementById("new-game-button");
const newGameLightbox = document.getElementById("new-game-lightbox");
newGameLightbox.style.display = "none";

// Button click DOM
newGameButton.addEventListener('click', () =>{

    // Close
    if(newGameLightbox.style.display == "flex"){
        document.getElementById("board").style.filter = "blur(0px)";
        newGameLightbox.style.display = "none";
    }
    // Open
    else if(newGameLightbox.style.display == "none"){
        document.getElementById("board").style.filter = "blur(10px)";
        newGameLightbox.style.display = "flex";
        rulesLightbox.style.display = "none";
        menuLightbox.style.display = "none";
    }
});

// Cancel Button click DOM 
document.getElementById("cancel").addEventListener("click", () =>{
    if(newGameLightbox.style.display == "flex"){
        document.getElementById("board").style.filter = "blur(0px)";
        newGameLightbox.style.display = "none";
    }
});

/////////////////////////////////////////////////////////////////////

/************* HELPERS *************/

const removeBoard = (parent) =>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

/////////////////////////////////////////////////////////////////////

export { newGameButton, newGameLightbox }