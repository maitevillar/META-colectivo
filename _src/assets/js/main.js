'use strict';

console.log('>> Ready :)');

const mainTop =document.querySelector('.page__main--top')
const mainBottom = document.querySelector('.page__main--bottom')

function hideBottom(){
    mainBottom.classList.add(".hidden")
    console.log(mainBottom)
}

mainTop.addEventListener('click', hideBottom)