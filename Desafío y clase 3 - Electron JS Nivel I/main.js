const { app, dialog, BrowserWindow } = require('electron');

let presentacion;
let main;

app.on('ready', () => {
    main = new BrowserWindow({
        show: false,
        center: true,
        width: 900,
        height: 700,
    });
    main.loadURL('https://jeandv.github.io/buscador-user/');

    presentacion = new BrowserWindow({
        show: false,
        center: true,
        revisable: false,
        frame: false,
        width: 280,
        height: 350
    });
    presentacion.loadFile('presentacion.html');

    presentacion.on('ready-to-show', () => {
        presentacion.show();
    });
    //objetivo-1
    main.on('ready-to-show', () => {
        setTimeout(() => {
            presentacion.close();
            main.show();
        }, 2000);
        cuentaRegresiva();
    });
    main.on('close', () => {
        app.quit();
    });
});
//objetivo-2
var seg = 30;
function cuentaRegresiva() {
    main.title = `Quedan ${seg} para que se cierre la app`;
    //objetivo-5
    if (seg == 0) {
        clearTimeout()
        cerrarApp()
        console.log("finalizo la cuenta regresiva y se cerro la app");
    } else {
        seg--;
        setTimeout(cuentaRegresiva, 1E3);
    }
    //objetivo-3
    if (seg == 15) {
        //objetivo-4
        main.maximize();
        abrirOtraUrl();
    }
}

function abrirOtraUrl() {
    dialog.showMessageBox(null, {
        type: 'question',
        title: 'Pregunta',
        message: 'Desea abrir otra ventana con otra URL?',
        buttons: ['Yes', 'No']
    }).then((resp) => {
        if (resp.response == 0) {
            let mainTwo = new BrowserWindow({
                show: false,
                center: true,
                width: 900,
                height: 700,
            });
            mainTwo.loadURL('https://cadif1.com/');
            mainTwo.on('ready-to-show', () => {
                mainTwo.show();
            });
        } else {
            console.log('no se abrio otra URL');
        }
    });
}

function cerrarApp() {
    dialog.showMessageBoxSync(main, {
        type: 'info',
        title: 'Información importante',
        message: 'Se acabo el tiempo se cerrara la app'
    })
    app.quit();
}