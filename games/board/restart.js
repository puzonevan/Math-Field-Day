/////////////////////////////////////////////////////////////////////

/**
 * restart.js
 *  - contains functions for restarting the board 
 *  - exports those functions for other files to use 
 *  - 
 * 
 */

/////////////////////////////////////////////////////////////////////


/**
 * restartBoard - deletes all child elements of parent node(board div)
 * @param {"""} parent parent whose child nodes need to be deleted
 */
const restartBoard = (parent) =>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

/////////////////////////////////////////////////////////////////////

/********** EXPORTS **********/
export { restartBoard }; 