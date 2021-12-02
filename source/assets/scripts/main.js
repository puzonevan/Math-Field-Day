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
import { Player } from "./header/player.js";

/////////////////////////////////////////////////////////////////////

/************* GLOBALS *************/
const rules = {
    "Capture": "Choose which player starts. This game is played on a 6x6 grid. \
                The main objectuve of the game is to avoid placing your symbol(X or O) \
                in a straight or diagonal course from the opponents. \
                The starting player marks his symbol anywhere on the grid. The next player \
                then add their symbol avoiding a hit described above. The first player can \
                move their symbol anywhere diagonally, horizontally, or vertically to an unused \
                space and shades in their previous mark. The opponent moves similarly. \
                The players continue until there is a winner. The winner is determined \
                either by forcing the opponent to no longer have any more usable spots to move \
                or \" CAPTURES \" the opponent by moving in the straight or diagonal line of \
                the opponent's occupied space.", 

    "Five in a Row": "Players take turns placing their marks(X or O) in the squares. \
                    The first player to get 5 in a row in any direction is the winner.", 

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

    "3D Tic Tac Toe": "Players take turns placing their marks(X or O). There are 3 grids that \
                        are each 3x3. The game works similarly to tic tac toe where the winner \
                        is decided by getting 3 marks in a row horizontally, vertically, or \
                        diagonally. However, the winner can also win by getting three in a row \
                        in the same spot of the 3 boards."
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
    const fiveInARow = new FiveInARow();
    const capture = new Capture();
    const tictactoe = new TicTacToe3D();
    const hex = new Hex();
    const mancala = new Mancala();

    fiveInARowButton.addEventListener("click", () =>{
        changeContent("Five in a Row");
        removeBoard(document.getElementById("board"));
        FiveInARow.createBoard();
        callAsync();
    });

    captureButton.addEventListener("click", () =>{
        changeContent("Capture");
        removeBoard(document.getElementById("board"));
        Capture.createBoard();
    });

    ticTacToeButton.addEventListener("click", () =>{
        changeContent("3D Tic Tac Toe");
        removeBoard(document.getElementById("board"));
        TicTacToe3D.createBoard();
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
async function callAsync(){
    const result = await resolveAfter2Seconds();
    console.log(result);
}

function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 10000);
    });
}

const changeContent = (name) =>{

    // Change game title in header
    document.getElementById("game-title-current").innerHTML = name;

    // Change game rules in rules lightbox
    document.getElementById("game-name").innerHTML = name;
    document.getElementById("game-rules").innerHTML = rules[name];

    // Change to Rules lightbox 
    rulesLightbox.style.display = "flex";
    menuLightbox.style.display = "none";
}

const removeBoard = (parent) =>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}



