let btnMin = document.getElementById('minimizar');
let btnMax = document.getElementById('maximizar');
let btnHide = document.getElementById('cerrar');

window.addEventListener('DOMContentLoaded', () => {

    btnMin.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click min');
        window.api.minimizarVen();
    });

    btnMax.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click max');
        window.api.maximizarVen();
    });

    btnHide.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click hide');
        window.api.esconderVen();
    });
});