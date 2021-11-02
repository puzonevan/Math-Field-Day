/********** TO DO **********/
// [x] Player Class
// [] Player functions

/**
 * Player attributes 
 *  - turn: boolean 
 *  - winner: boolean 
 *  - name: string 
 *  - current move: row col of the current move 
 *  - last move: row col of the last move
 */

/**
 * Player functions 
 *  - change turn 
 *  - change name 
 *  - declare winner 
 *  - call game based on current move 
 */

class Player {

    
    /**
     * Player Constructor - creates player object
     * @param {""} name name of the player
     */
    constructor(name){
        this._name = name; 
        this._turn = false;
        this._winner = false;
        this._currentMove = {};
        this._lastMove = {};
    }

    /////////////////////////////////////////////////////////////////////

    /************* GETTERS *************/
    get name(){
        return this._name;
    }
    get turn(){
        return this._turn;
    }
    get winner(){
        return this._winner;
    }
    get currentMove(){
        return this._currentMove;
    }
    get lastMove(){
        return this._lastMove;
    }

    /////////////////////////////////////////////////////////////////////

    /************* SETTERS *************/
    
    set name(name){
        this._name = name;
    }
    set winner(winner){
        this._winner = winner;
    }
    set turn(turn){
        this._turn = turn;
    }
    set lastMove(move){
        this._lastMove = move;
    }
    set currentMove(move){
        this._currentMove = move;
    }

    /////////////////////////////////////////////////////////////////////

    /************* PLAYER METHODS *************/

    /////////////////////////////////////////////////////////////////////

    /************* STATIC METHODS *************/
    
}