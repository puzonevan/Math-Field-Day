/************* IMPORTS *************/

// Boards
import { Capture } from "./boards/capture.js";
import { FiveInARow } from "./boards/five-in-a-row.js";
import { Hex } from "./boards/hex.js";
import { Mancala } from "./boards/mancala.js";
import { TicTacToe3D } from "./boards/tic-tac-toe-3d.js";

// Header
import { menuLightbox, fiveInARowButton, captureButton, ticTacToeButton, hexButton, mancalaButton } from "./header/menu.js";
import { rulesLightbox } from "./header/rules.js";
import { newGameLightbox } from "./header/new-game.js";
import { winnerLightbox } from "./header/winner.js";
import { Player } from "./header/player.js";

/////////////////////////////////////////////////////////////////////

/************* GLOBALS *************/

/////////////////////////////////////////////////////////////////////

/************* MAIN PROGRAM *************/


function main(){

    // Players 
    const player1 = new Player(document.getElementById("player-1-name"));
    const player2 = new Player(document.getElementById("player-2-name"));

    // Change player names on input
    document.getElementById("player-1-name").addEventListener("input", () =>{
        player1.name = document.getElementById("player-1-name").value;
    });
    document.getElementById("player-2-name").addEventListener("input", () =>{
        player2.name = document.getElementById("player-2-name").value;
    });

    // Boards
    const fiveInARow = new FiveInARow(player1, player2);
    const capture = new Capture(player1, player2);
    const tictactoe = new TicTacToe3D(player1, player2);
    const hex = new Hex(player1, player2);
    const mancala = new Mancala(player1, player2);

    let currentGame;
    let gameToChange;

    // New Game Restart Button click DOM
    document.getElementById("restart").addEventListener("click", ()=>{
        removeBoard(document.getElementById("board"));
        closeLightbox(newGameLightbox);
        gameToChange.changeRules();
        gameToChange.createBoard();
        gameToChange.reset();
        currentGame = gameToChange;
    });

    // New Game Winner Button click DOM 
    document.getElementById("winner-new-game").addEventListener("click", () =>{
        removeBoard(document.getElementById("board"));
        closeLightbox(winnerLightbox);
        currentGame.changeRules();
        currentGame.createBoard();
        currentGame.reset();
    });
    
    // Menu Winner button click DOM
    document.getElementById("winner-menu").addEventListener("click", () =>{
        removeBoard(document.getElementById("board"));
        closeLightbox(winnerLightbox);
        openLightbox(menuLightbox);
    })

    fiveInARowButton.addEventListener("click", () =>{
        closeLightbox(menuLightbox);
        if(document.getElementById("board").firstElementChild){
            gameToChange = fiveInARow;
            openLightbox(newGameLightbox);
        }
        else{      
            fiveInARow.createBoard();
            fiveInARow.changeRules();
            fiveInARow.start();
            currentGame = fiveInARow;
            gameToChange = fiveInARow;
        }
    });

    captureButton.addEventListener("click", () =>{
        closeLightbox(menuLightbox);
        if(document.getElementById("board").firstElementChild){
            gameToChange = capture;
            openLightbox(newGameLightbox);
        }
        else{
            capture.changeRules();
            capture.createBoard();
            capture.start();
            currentGame = capture;
            gameToChange = capture;
        }
    });

    ticTacToeButton.addEventListener("click", () =>{
        closeLightbox(menuLightbox);
        if(document.getElementById("board").firstElementChild){
            gameToChange = tictactoe;
            openLightbox(newGameLightbox);
        }
        else{
            tictactoe.changeRules();
            tictactoe.createBoard();
            tictactoe.start();
            currentGame = tictactoe;
            gameToChange = tictactoe;
        }
    });

    hexButton.addEventListener("click", () =>{
        closeLightbox(menuLightbox);
        if(document.getElementById("board").firstElementChild){
            gameToChange = hex;
            openLightbox(newGameLightbox);
        }
        else{
            hex.changeRules();
            hex.createBoard();
            hex.start();
            currentGame = hex;
            gameToChange = hex;
        }
    });

    mancalaButton.addEventListener("click", () =>{
        closeLightbox(menuLightbox);
        if(document.getElementById("board").firstElementChild){
            gameToChange = mancala;
            openLightbox(newGameLightbox);
        }
        else{
            mancala.changeRules();
            mancala.createBoard();
            mancala.start();
            currentGame = mancala;
            gameToChange = mancala;
        }
    });
}

main();

/////////////////////////////////////////////////////////////////////

/************* HELPER FUNCTIONS *************/

const openLightbox = (lightbox) =>{
    document.getElementById("board").style.filter = "blur(10px)";
    lightbox.style.display = "flex";
}

const closeLightbox = (lightbox) =>{
    document.getElementById("board").style.filter = "blur(0px)";
    lightbox.style.display = "none";
}

const removeBoard = (parent) =>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
