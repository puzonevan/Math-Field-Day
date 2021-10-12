
const gameTitle = document.getElementById("game-title-current");

const player1 = document.getElementById("player-1-name");
const player2 = document.getElementById("player-2-name");

const rulesButton = document.getElementById("rules-button");
const menuButton = document.getElementById("menu-button");
const newGameButton = document.getElementById("new-game-button");

let rulesStatus = false;
let newGameStatus = false;
let menuStatus = false; 

rulesButton.addEventListener('click', (e) =>{

    if(rulesStatus){
        document.getElementById("board").style.filter = "blur(0)";
        document.getElementById("rules-lightbox").style.opacity = "0";
        rulesStatus = false;
    }
    else{
        document.getElementById("board").style.filter = "blur(1.5rem)";
        document.getElementById("rules-lightbox").style.opacity = "1";
        document.getElementById("new-game-lightbox").style.opacity = "0";
        document.getElementById("menu-lightbox").style.opacity = "0";
        rulesStatus = true;
        newGameStatus = false;
        menuStatus = false;
    }

});


newGameButton.addEventListener("click", (e) =>{
    
    if(newGameStatus){
        document.getElementById("board").style.filter = "blur(0)";
        document.getElementById("new-game-lightbox").style.opacity = "0";
        newGameStatus = false;
    }
    else{
        document.getElementById("board").style.filter = "blur(1.5rem)";
        document.getElementById("new-game-lightbox").style.opacity = "1";
        document.getElementById("rules-lightbox").style.opacity = "0";
        document.getElementById("menu-lightbox").style.opacity = "0";
        newGameStatus = true;
        rulesStatus = false;
        menuStatus = false;
    }

});


menuButton.addEventListener("click", (e) =>{
    if(menuStatus){
        document.getElementById("board").style.filter = "blur(0)";
        document.getElementById("menu-lightbox").style.opacity = "0";
        menuStatus = false;
    }
    else{
        document.getElementById("board").style.filter = "blur(1.5rem)";
        document.getElementById("menu-lightbox").style.opacity = "1";
        document.getElementById("rules-lightbox").style.opacity = "0";
        document.getElementById("new-game-lightbox").style.opacity = "0";
        menuStatus = true;
        newGameStatus = false;
        rulesStatus = false;
    }
});