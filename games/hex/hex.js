/************* IMPORTS *************/

/////////////////////////////////////////////////////////////////////

/************* CLASSES *************/
class Hex{

    constructor(player1, player2){
        this._player1 = player1;
        this._player2 = player2;
        this._gameOver = false;
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

}