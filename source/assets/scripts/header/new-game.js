/************* IMPORTS *************/
import { rulesLightbox } from "./rules.js";
import { menuLightbox } from "./menu.js";

/////////////////////////////////////////////////////////////////////

const newGameButton = document.getElementById("new-game-button");
const newGameLightbox = document.getElementById("new-game-lightbox");
newGameLightbox.style.display = "none";

newGameButton.addEventListener('click', () =>{

    // Close
    if(newGameLightbox.style.display == "flex"){
        newGameLightbox.style.display = "none";
        document.getElementById("board").style.filter = "blur(10px)";
    }
    // Open
    else if(newGameLightbox.style.display == "none"){
        document.getElementById("board").style.filter = "blur(0px)";
        newGameLightbox.style.display = "flex";
        rulesLightbox.style.display = "none";
        menuLightbox.style.display = "none";
    }
});

/////////////////////////////////////////////////////////////////////

export { newGameButton, newGameLightbox }