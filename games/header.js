const rulesButton = document.getElementById("rules-button");
const menuButton = document.getElementById("menu-button");
const newGameButton = document.getElementById("new-game-button");

let rulesStatus = false;
let newGameStatus = false;
let menuStatus = false; 

const closeLightbox = (name) => {
    document.getElementById("board").style.filter = "blur(0)";
    document.getElementById(`${name}-lightbox`).style.visibility = "hidden";
    document.getElementById(`${name}-lightbox`).style.opacity = "0";

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

const openLightbox = (name) =>{
    document.getElementById("board").style.filter = "blur(1.5rem)";
    document.getElementById(`${name}-lightbox`).style.opacity = "1";
    document.getElementById(`${name}-lightbox`).style.visibility = "visible";

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

const rulesLightbox = rulesButton.addEventListener('click', (e) =>{

    rulesStatus ? closeLightbox("rules") : openLightbox("rules");

});


const newGameLightbox = newGameButton.addEventListener("click", (e) =>{
    
    newGameStatus ? closeLightbox("new-game") : openLightbox("new-game");

});


const menuLightbox = menuButton.addEventListener("click", (e) =>{

    menuStatus ? closeLightbox("menu") : openLightbox("menu");

});

export {closeLightbox, openLightbox};