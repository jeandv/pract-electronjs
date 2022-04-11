let usuariosLogin = {
    "usuarios": [
        {
            "nombre": "Jean A. Rondon B.",
            "usuario": "jeanr",
            "password": "12345"
        },
        {
            "nombre": "Luis Rodriguez",
            "usuario": "luisrod",
            "password": "0909"
        },
        {
            "nombre": "Marco Perez",
            "usuario": "marcopz",
            "password": "2233"
        },
        {
            "nombre": "Pablo Marquez",
            "usuario": "marquez21",
            "password": "1122"
        },
        {
            "nombre": "Juan Pereira",
            "usuario": "juanpr",
            "password": "54321"
        }
    ]
};

let logueados;
let loginValido = false;
let user = document.getElementById('username');
let pass = document.getElementById('password');

document.getElementById('btnLogin').onclick = (e) => {
    e.preventDefault();

    window.api.mostrarDatosUser(user.value, pass.value);

    for (logueados of usuariosLogin.usuarios) {
        if (user.value == logueados.usuario && pass.value == logueados.password) {
            loginValido = true;

            window.api.abrirVenPrincipal();

            user.value = '';
            pass.value = '';
            document.getElementById('error').innerHTML = '';
        }
    }
    if (loginValido == false) {
        user.value = '';
        pass.value = '';
        document.getElementById('error').innerHTML = 'Error. Usuario y/o contraseña invalidos o no existen, intente de nuevo.';
    }
};