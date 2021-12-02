/************* IMPORTS *************/

/////////////////////////////////////////////////////////////////////

/************* PLAYER CLASS *************/
class Player{

    constructor(name){
        this._name = name;
        this._winner = false;
    }

    get name(){
        return this._name;
    }
    get winner(){
        return this._winner;
    }

    set name(name){
        this._name = name
    }
    set winner(winner){
        this._winner = winner;
    }

}

/////////////////////////////////////////////////////////////////////

export { Player }