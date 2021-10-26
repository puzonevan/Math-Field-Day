
const initializeBoard = () =>{

    for(let row = 0; row < 12; row++){
        const nRow = document.createElement("tr");
        for(let col = 0; col < 12; col++){
            const nCol = document.createElement("td");
            nRow.appendChild(nCol);
        }
        document.getElementById("board").appendChild(nRow);
    }
    
}

const checkWinner = () =>{

}

const stopGame = () =>{

}

const playTurn = () =>{

}

