

const player1 = document.getElementById("player-1-name");
const player2 = document.getElementById("player-2-name");

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
};

const openLightbox = (name) =>{
    document.getElementById("board").style.filter = "blur(1.5rem)";
    document.getElementById(`${name}-lightbox`).style.opacity = "1";
    document.getElementById(`${name}-lightbox`).style.visibility = "visible";
};

const rulesLightbox = rulesButton.addEventListener('click', (e) =>{

    if(rulesStatus){
        closeLightbox("rules");
        rulesStatus = false;
    }
    else{
        openLightbox("rules");
        document.getElementById("new-game-lightbox").style.visibility = "hidden";
        document.getElementById("menu-lightbox").style.visibility = "hidden";
        rulesStatus = true;
        newGameStatus = false;
        menuStatus = false;
    }

});


const newGameLightbox = newGameButton.addEventListener("click", (e) =>{
    
    if(newGameStatus){
        closeLightbox("new-game");
        newGameStatus = false;
    }
    else{
        openLightbox("new-game");
        document.getElementById("rules-lightbox").style.visibility = "hidden";
        document.getElementById("menu-lightbox").style.visibility = "hidden";
        newGameStatus = true;
        rulesStatus = false;
        menuStatus = false;
    }

});


const menuLightbox = menuButton.addEventListener("click", (e) =>{
    if(menuStatus){
        closeLightbox("menu");
        menuStatus = false;
    }
    else{
        openLightbox("menu");
        document.getElementById("new-game-lightbox").style.visibility = "hidden";
        document.getElementById("rules-lightbox").style.visibility = "hidden";
        menuStatus = true;
        newGameStatus = false;
        rulesStatus = false;
    }
});

