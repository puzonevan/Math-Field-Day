
const initializeBoard = () =>{

    for (let row = 0; row < 6; row++){
        const nRow = document.createElement('tr');
        for(let col = 0; col < 6; col++){
            const nCol = document.createElement('td');
            nRow.appendChild(nCol);
        }
        document.getElementById('board').appendChild(nRow);
    }

}

document.getElementById("menu-capture").addEventListener('click', () =>{
    initializeBoard();
});