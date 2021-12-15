/************* IMPORTS *************/

/////////////////////////////////////////////////////////////////////

/************* PLAYER CLASS *************/
class Player{

    constructor(name){
        this._name = name;
        this._winner = false;
        this._currentMove = -1;
        this._lastMove = -1;
    }

    get name(){
        return this._name;
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

    set name(name){
        this._name = name
    }
    set winner(winner){
        this._winner = winner;
    }
    set currentMove(move){
        this._currentMove = move;
    }
    set lastMove(move){
        this._lastMove = move;
    }

    reset(){
        this._winner = false;
        this._currentMove = -1;
        this._lastMove = -1;
    }

}

/////////////////////////////////////////////////////////////////////

export { Player }