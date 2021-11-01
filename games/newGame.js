/************* IMPORTS *************/
import { closeLightbox } from './header.js';
import { restartBoard } from './board/restart.js';
import { initializeBoard } from './board/initialize.js';


/////////////////////////////////////////////////////////////////////

/************* BUTTON VARIABLES *************/
const cancel = document.getElementById('cancel');
const restart = document.getElementById('restart');

/////////////////////////////////////////////////////////////////////

/************* DOM EVENTS *************/

// Cancel Button click 
cancel.addEventListener('click', () =>{
    
    // Close the Lightbox
    closeLightbox('new-game');

});

// Restart Button click 
restart.addEventListener('click', () =>{
    
    // Close the Lightbox 
    closeLightbox('new-game');

    // Restart the game 
    restartBoard();
    initializeBoard("five-in-a-row");
});