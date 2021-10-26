
const restartBoard = (parent) =>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

export { restartBoard }; 