/************* IMPORTS *************/
import { newGameLightbox } from "./new-game.js";
import { rulesLightbox } from "./rules.js";

/////////////////////////////////////////////////////////////////////

const menuButton = document.getElementById("menu-button");
const menuLightbox = document.getElementById("menu-lightbox");
menuLightbox.style.display = "none";

menuButton.addEventListener("click", () =>{
    
    // Close
    if(menuLightbox.style.display == "flex"){
        menuLightbox.style.display = "none";
        document.getElementById("board").style.filter = "blur(10px)";
    }
    // Open
    else if(menuLightbox.style.display == "none"){
        document.getElementById("board").style.filter = "blur(0px)";
        menuLightbox.style.display = "flex";
        newGameLightbox.style.display = "none";
        rulesLightbox.style.display = "none";
    }
    
});

/////////////////////////////////////////////////////////////////////

export { menuButton, menuLightbox }