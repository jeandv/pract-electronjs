
let btnDevTools = document.querySelector('.devTools');
let btnPrint = document.querySelector('.print');
let btnMinim = document.querySelector('.minimize');
let btnFile = document.querySelector('.openFile');
let btnDefPrint = document.querySelector('.defPrint');

window.addEventListener('DOMContentLoaded', () => {

    btnDevTools.addEventListener('click', (e) => {
        e.preventDefault();
        window.api.openDevTools();
    });
    btnPrint.addEventListener('click', (e) => {
        e.preventDefault();
        window.api.print();
    });
    btnMinim.addEventListener('click', (e) => {
        e.preventDefault();
        window.api.minimize();
    });
    btnFile.addEventListener('click', (e) => {
        e.preventDefault();
        window.api.openFile();
    });
    btnDefPrint.addEventListener('click', (e) => {
        e.preventDefault();
        window.api.showDefPrint();
    });
});