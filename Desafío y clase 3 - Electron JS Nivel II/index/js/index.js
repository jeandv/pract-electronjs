let logueados;
let loginValido = false;

let user = document.getElementById('username');
let pass = document.getElementById('password');

let nuevoName = document.getElementById('nuevoName');
let nuevoUser = document.getElementById('nuevoUser');
let nuevoPass = document.getElementById('nuevoPass');

let btnLogin = document.getElementById('btnLoguearse');
let btnImg = document.getElementById("btnBuscarImg");
let btnRegister = document.getElementById('btnRegistrarse');
let fotoPerfil = document.getElementById("archivoRuta");

let listaUsuarios = [];

btnLogin.onclick = (e) => {
    e.preventDefault();
    iniciarSesion();
}

btnImg.onclick = (e) => {
    e.preventDefault();
    window.api.subirFotoPerfil();
}

btnRegister.onclick = (e) => {
    e.preventDefault();
    registrarse();
}

function iniciarSesion() {
    //obj-1
    listaUsuarios = window.api.leerUsuariosJSON();

    for (i = 0; i < listaUsuarios.length; i++) {
        if (user.value == listaUsuarios[i].usuario && pass.value == listaUsuarios[i].password) {
            loginValido = true;

            window.api.abrirVenPrincipal();
            window.api.mostrarDatosUser(user.value, pass.value);

            user.value = '';
            pass.value = '';
        }
    }

    if (loginValido == false) {
        user.value = '';
        pass.value = '';
        window.api.mostrarMsgError();
    }
}

function registrarse() {
    listaUsuarios = window.api.leerUsuariosJSON();

    if (nuevoName.value != '' && nuevoUser.value != '' && nuevoPass.value != '') {
        let anadirUser = {
            "nombre": nuevoName.value,
            "usuario": nuevoUser.value,
            "password": nuevoPass.value,
            "foto": fotoPerfil.value
        }

        //obj-2
        listaUsuarios.push(anadirUser);
        window.api.guardarUserJSON(listaUsuarios);

        console.log('Usuarios registrados:');
        console.log(listaUsuarios);

        nuevoName.value = '';
        nuevoUser.value = '';
        nuevoPass.value = '';

        btnImg.innerText = 'Seleccionar foto de perfil';
    }
}