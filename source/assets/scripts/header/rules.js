/************* IMPORTS *************/
import { newGameLightbox } from "./new-game.js";
import { menuLightbox } from "./menu.js";

/////////////////////////////////////////////////////////////////////

const rulesButton = document.getElementById("rules-button");
const rulesLightbox = document.getElementById("rules-lightbox");
rulesLightbox.style.display = "none";

rulesButton.addEventListener('click', () =>{

    // Close
    if(rulesLightbox.style.display == "flex"){
        rulesLightbox.style.display = "none";
        document.getElementById("board").style.filter = "blur(10px)";
    }
    // Open
    else if(rulesLightbox.style.display == "none"){
        document.getElementById("board").style.filter = "blur(0px)";
        rulesLightbox.style.display = "flex";
        newGameLightbox.style.display = "none";
        menuLightbox.style.display = "none";
    }

});

/////////////////////////////////////////////////////////////////////

export { rulesButton, rulesLightbox }