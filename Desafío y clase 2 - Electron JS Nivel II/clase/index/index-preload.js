const { ipcRenderer, contextBridge } = require("electron");

console.log("preload");

ipcRenderer.on("msg-ready-pdf", (event, ok) => {
  if (ok) console.log("esta listo el pdf");
  else console.log("error al guardar el pdf");
});
contextBridge.exposeInMainWorld("api", {
  getMessage: (f) => {
    ipcRenderer.on("msg-ipc-ChangeColor", (event, color) => {
      console.log("recibiendo mensaje del main");
      console.log(color);
      f(color);
    });
  },
  getSOName: (f) => {
    console.log("get so name");
    let resp = ipcRenderer.sendSync("msg-getSOName");
    console.log(resp);
    f(resp);
  },
  saveToPDF: (n) => {
    console.log("guardando pdf");
    ipcRenderer.send("msg-saveToPDF", n);
  },
  minimizar: () => {
    console.log("minimizando");
    ipcRenderer.send("msg-minimizar", {
      nombre: "jose",
      apellido: "rojas",
      fechames: true,
    });
  },
  maximizar: () => {
    console.log("maximizando");
    ipcRenderer.send("msg-maximizar");
  },
});
