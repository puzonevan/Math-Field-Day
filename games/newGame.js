import { closeLightbox } from './header.js';

const cancel = document.getElementById('cancel');
const restart = document.getElementById('restart');

cancel.addEventListener('click', () =>{
    closeLightbox('new-game');
});