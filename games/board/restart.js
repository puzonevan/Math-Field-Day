
const restartBoard = (parent) =>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

/////////////////////////////////////////////////////////////////////

/********** EXPORTS **********/
export { restartBoard }; 