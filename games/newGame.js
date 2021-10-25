/************* IMPORTS *************/
import { closeLightbox } from './header.js';
// Import Restart Board Function


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
restart.addEventListener('restart', () =>{
    
    // Close the Lightbox 
    closeLightbox('new-game');

    // Restart the game 

});