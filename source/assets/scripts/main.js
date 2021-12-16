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
const rules = {
    "Hex": "Players take turns placing their marks (X or O) in the hexagons \
            of their choosing. The winner must form a continous path from their \
            starting side to the opposite side by connecting the hexagons on their edges. \
            The four corners of the hexagon can be considered to be part of either of the \
            sides that they face.", 

    "Mancala": "Choose which player starts. The player can choose any hole with beads on \
                their side, scoops up the beads, and distributes them one bead to a hole \
                moving to the right including the end holes. The winner of the game is the \
                first person that gets rid of all the beads on their side. \
                If a player's last bead lands in the end hole, they must go again. \
                If a player's last bead lands in an empty hole on the opponent's side, \
                the player can scoop and move the beads on the opposite hole(on his side) \
                or scoop and place all the beads from the opposite hole to the landed hole. \
                The player can also not move at all when this happens. \
                Whenever a player lands in an empty hole on their side, their turn is over.", 

}

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
    const hex = new Hex();
    const mancala = new Mancala();

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
        gameToChange.changeRules();
        gameToChange.createBoard();
        gameToChange.reset();
        currentGame = gameToChange;
    });
    

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
        changeContent("Hex");
        removeBoard(document.getElementById("board"));
        Hex.createBoard();
        
    });

    mancalaButton.addEventListener("click", () =>{
        changeContent("Mancala");
        removeBoard(document.getElementById("board"));
        Mancala.createBoard();
        
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
