const { ipcMain, BrowserWindow, webContents } = require("electron");

let color = ["blue", "red", "yellow"];
let n = 0;
setInterval(() => {
  let wc = BrowserWindow.getAllWindows();
  console.log("numero de webcontent" + wc.length);
  let i = Math.floor(Math.random() * wc.length);
  console.log(i);
  let win = wc[i];

  console.log("enviando mensaje al render " + win.title + " " + color[n]);
  win.webContents.send("msg-ipc-ChangeColor", color[n]);

  n < color.length - 1 ? n++ : (n = 0);
}, 5000);

ipcMain.on("msg-saveToPDF", (event, dato) => {
  console.log("el nmbre del archivo: " + dato);
  let ok;
  event.sender
    .printToPDF({ landscape: false })
    .then((datos) => {
      ok = true;
    })
    .catch((e) => {
      ok = false;
      console.log("error al guardar");
      console.log(e);
    })
    .finally(() => {
      event.reply("msg-ready-pdf", ok);
    });
});

ipcMain.on("msg-minimizar", (event, obj) => {
  console.log("minimizando...");
  console.log(obj.apellido);
  let win = BrowserWindow.fromWebContents(event.sender);
  win.minimize();

  console.log(win.title);
});

ipcMain.on("msg-maximizar", (event) => {
  console.log("maximizando");
  let win = BrowserWindow.fromWebContents(event.sender);
  if (win.isMaximized()) win.unmaximize();
  else win.maximize();
});
ipcMain.on("msg-getSOName", (event) => {
  console.log("el sistema operativo es ");
  event.returnValue = process.platform;
});
