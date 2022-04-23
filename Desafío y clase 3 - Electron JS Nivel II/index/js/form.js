document.getElementById('btnLogin').addEventListener('click', login);
document.getElementById('btnRegister').addEventListener('click', register);
window.addEventListener('resize', anchoPag);

var formLogin = document.querySelector('.formLogin');
var formRegister = document.querySelector('.formRegister');
var contLoginRegister = document.querySelector('.contLoginRegister');
var cajaTraseraLogin = document.querySelector('.cajaTraseraLogin');
var cajaTraseraRegister = document.querySelector('.cajaTraseraRegister');

function anchoPag() {

    if (window.innerWidth > 850) {
        cajaTraseraRegister.style.display = 'block';
        cajaTraseraLogin.style.display = 'block';
    } else {
        cajaTraseraRegister.style.display = 'block';
        cajaTraseraRegister.style.opacity = '1';
        cajaTraseraLogin.style.display = 'none';
        formLogin.style.display = 'block';
        contLoginRegister.style.left = '0px';
        formRegister.style.display = 'none';
    }
}

anchoPag();

function login() {
    if (window.innerWidth > 850) {
        formLogin.style.display = 'block';
        contLoginRegister.style.left = '10px';
        formRegister.style.display = 'none';
        cajaTraseraRegister.style.opacity = '1';
        cajaTraseraLogin.style.opacity = '0';
    } else {
        formLogin.style.display = 'block';
        contLoginRegister.style.left = '0px';
        formRegister.style.display = 'none';
        cajaTraseraRegister.style.display = 'block';
        cajaTraseraLogin.style.display = 'none';
    }
}

function register() {
    if (window.innerWidth > 850) {
        formRegister.style.display = 'block';
        contLoginRegister.style.left = '410px';
        formLogin.style.display = 'none';
        cajaTraseraRegister.style.opacity = '0';
        cajaTraseraLogin.style.opacity = '1';
    } else {
        formRegister.style.display = 'block';
        contLoginRegister.style.left = '0px';
        formLogin.style.display = 'none';
        cajaTraseraRegister.style.display = 'none';
        cajaTraseraLogin.style.display = 'block';
        cajaTraseraLogin.style.opacity = '1';
    }
}
