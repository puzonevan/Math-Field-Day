/////////////////////////////////////////////////////////////////////

/********** HELPER FUNCTIONS **********/

/**
 * createTable - creates table object and set appropriate classes and id's
 * @param {""} game name of the game
 * @returns table DOM
 */
 const createTable = (game) =>{

    // Create Table and set attributes
    const table = document.createElement("table");
    table.setAttribute("class", game);
    table.setAttribute("id", game);

    return table;
}

/**
 * createRow - creates Row object and set appropriate classes and id's
 * @param {""} game name of the game
 * @param {#} row table's row number
 * @returns row DOM
 */
const createRow = (game, row) =>{

    // Create Row and set attributes
    const newRow = document.createElement("tr");
    newRow.setAttribute("id", `row-${row}`);
    
    return newRow;
}

/**
 * createCol - creates Col object and set appropriate classes and id's
 * @param {""} game name of the game 
 * @param {#} col table's col number
 * @returns col DOM
 */
const createCol = (game, col) =>{

    // Create Col and set attributes 
    const newCol = document.createElement("td");

    return newCol;
}

const hoverX = (elem) =>{
    elem.style.backgroundColor = "blue";
    // elem.style.background = "center no-repeat url('source/assets/images/icons/x-icon.png')";
}

const hoverNone = (elem) =>{
    elem.style.backgroundColor = "white";

    // elem.style.background = "none";
}

/////////////////////////////////////////////////////////////////////

/********** EXPORTS **********/

export { createTable, createRow, createCol, hoverNone, hoverX }