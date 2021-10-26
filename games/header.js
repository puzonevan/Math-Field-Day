
/********** BUTTON VARIABLES **********/
const rulesButton = document.getElementById("rules-button");
const menuButton = document.getElementById("menu-button");
const newGameButton = document.getElementById("new-game-button");

/////////////////////////////////////////////////////////////////////

/********** OTHER VARIABLES **********/
let rulesStatus = false;
let newGameStatus = false;
let menuStatus = false; 

/////////////////////////////////////////////////////////////////////

/********** FUNCTIONS **********/

// Closing the current lightbox
const closeLightbox = (name) => {
    
    // Unblur the board
    document.getElementById("board").style.filter = "blur(0)";

    // Close the Lightbox 
    document.getElementById(`${name}-lightbox`).style.visibility = "hidden";
    document.getElementById(`${name}-lightbox`).style.opacity = "0";

    // Change the statuses
    switch(name){
        case "rules": 
            rulesStatus = false;
            break;
        case "new-game":
            newGameStatus = false;
            break;
        case "menu": 
            menuStatus = false;
            break;
    }

};

// Open the selected lightbox
const openLightbox = (name) =>{
    
    // Blur the board
    document.getElementById("board").style.filter = "blur(1.5rem)";

    // Open the Lightbox
    document.getElementById(`${name}-lightbox`).style.opacity = "1";
    document.getElementById(`${name}-lightbox`).style.visibility = "visible";
    

    // Change the statuses and close other lightboxes
    switch(name) {
        case "rules": 
            rulesStatus = true;
            newGameStatus = false;
            menuStatus = false;
            document.getElementById("new-game-lightbox").style.visibility = "hidden";
            document.getElementById("menu-lightbox").style.visibility = "hidden";
            break;
        case "new-game":
            rulesStatus = false;
            newGameStatus = true;
            menuStatus = false;
            document.getElementById("rules-lightbox").style.visibility = "hidden";
            document.getElementById("menu-lightbox").style.visibility = "hidden";
            break;
        case "menu": 
            rulesStatus = false;
            newGameStatus = false;
            menuStatus = true;
            document.getElementById("new-game-lightbox").style.visibility = "hidden";
            document.getElementById("rules-lightbox").style.visibility = "hidden";
            break;
    }

};

/////////////////////////////////////////////////////////////////////

/********** DOM EVENTS **********/

const rulesLightbox = rulesButton.addEventListener('click', (e) =>{

    // If status is true, lightbox is open and should be closed 
    rulesStatus ? closeLightbox("rules") : openLightbox("rules");

});


const newGameLightbox = newGameButton.addEventListener("click", (e) =>{
    
    // If status is true, lightbox is open and should be closed 
    newGameStatus ? closeLightbox("new-game") : openLightbox("new-game");

});


const menuLightbox = menuButton.addEventListener("click", (e) =>{

    // If status is true, lightbox is open and should be closed 
    menuStatus ? closeLightbox("menu") : openLightbox("menu");

});

/////////////////////////////////////////////////////////////////////

/********** EXPORTS **********/

export {closeLightbox, openLightbox};