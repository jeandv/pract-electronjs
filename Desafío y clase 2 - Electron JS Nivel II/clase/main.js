const { app, BrowserWindow } = require("electron");
require("./event-listeners.js");

app.on("ready", () => {
  function ini(titulo) {
    return {
      title: titulo,
      webPreferences: {
        preload: __dirname + "\\index\\index-preload.js",
      },
    };
  }

  new BrowserWindow(ini("primera")).loadFile("index/index.html");
  new BrowserWindow(ini("segunda")).loadFile("index/index.html");
  new BrowserWindow(ini("tercera")).loadFile("index/index.html");
});

// ipcMain.on("msg-saveToPDF", (event, dato) => {
//   console.log("el nmbre del archivo: " + dato);
//   event.sender
//     .printToPDF()
//     .then((datos) => {})
//     .catch((e) => {
//       console.log("error al guardar");
//     });
// });

// ipcMain.on("msg-minimizar", (event, obj) => {
//   console.log("minimizando...");
//   console.log(obj.apellido);
//   let win = BrowserWindow.fromWebContents(event.sender);
//   win.minimize();

//   console.log(win.title);
// });

// ipcMain.on("msg-maximizar", (event) => {
//   console.log("maximizando");
//   let win = BrowserWindow.fromWebContents(event.sender);
//   if (win.isMaximized()) win.unmaximize();
//   else win.maximize();
// });
// ipcMain.on("msg-getSOName", (event) => {
//   console.log("el sistema operativo es ");
//   event.returnValue = process.platform;
// });
