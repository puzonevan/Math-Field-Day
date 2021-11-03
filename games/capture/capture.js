/********** TO DO **********/
// [] Create Board Class 

/**
 * Capture attributes 
 *  - player 1: player object 
 *  - player 2: player object
 *  - game over: boolean 
 *  - 
 */

/**
 * Capture functions 
 *  - change player
 *  - player move 
 *  - check winner
 */

/************* IMPORTS *************/

/////////////////////////////////////////////////////////////////////

/************* CLASSES *************/
class Capture{

    constructor(player1, player2){
        this._player1 = player1;
        this._player2 = player2;
        this._gameOver = false;
        this._board = [[]];
        this._domBoard = [[]];
    }

    get player1(){
        return this._player1;
    }
    get player2(){
        return this._player2;
    }
    get gameOver(){
        return this._gameOver;
    }

    playerMove(player, move){

    }

    changeBoard(){

    }

    checkWinner(){

    }

    
}


/////////////////////////////////////////////////////////////////////

/************* EXPORT *************/

export { Capture };

// Player p1 
// Player p2
// Game capture 
// 
// While capture is not over 
//      p1 move 
//      capture check move 
//      capture draw move
//      capture check win 
//      p2 move 
//      capture check move 
//      capture draw move
//      capture check win 