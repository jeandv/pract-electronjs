const { BrowserWindow } = require("electron");

let win2;
let ventanaAbierta = false;

//objetivo 4
function abrirVentana(titulo) {
    ventanaAbierta = true;

    win2 = new BrowserWindow({
        title: titulo,
        center: true,
        height: 450,
        width: 600,
        show: false
    });

    win2.loadFile('index.html');
    win2.setMenu(null);

    win2.on('ready-to-show', () => {
        win2.show();
    });
}
function abrirSubmenu(titulo) {
    if (ventanaAbierta == true)
        win2.title = titulo;
    else
        abrirVentana(titulo);
}

//objetivo 1
module.exports.templateMainMenu = [
    {
        label: 'Alumnos',
        submenu: [
            {
                label: 'Listado',
                click: () => {
                    abrirSubmenu('Listado de alumnos');
                }
            },
            {
                label: 'Nuevo',
                click: () => {
                    abrirSubmenu('Añadir nuevo alumno');
                }
            },
            {
                label: 'Buscar',
                click: () => {
                    abrirSubmenu('Buscar alumno');
                }
            }
        ]
    },
    {
        label: 'Secciones',
        submenu: [
            {
                label: 'Abrir sección',
                click: () => {
                    abrirSubmenu('Abrir nueva sección');
                }
            },
            {
                label: 'Inscribir alumno',
                click: () => {
                    abrirSubmenu('Inscribir nuevo alumno');
                }
            },
            {
                label: 'Imprimir facturas',
                click: () => {
                    abrirSubmenu('Impresión de facturas');
                }
            }
        ]
    },
    {
        //objetivo 5
        label: 'Sistema',
        submenu: [
            {
                label: 'Ayuda',
                role: 'reload'
            },
            {
                label: 'Acerca de',
                role: 'about'
            },
            {
                label: 'DevTools',
                role: 'toggleDevTools'
            },
            {
                type: 'separator'
            },
            {
                label: 'Salir',
                role: 'quit'
            }
        ]
    }
]