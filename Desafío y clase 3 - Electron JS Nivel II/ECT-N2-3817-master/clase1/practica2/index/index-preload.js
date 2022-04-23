
const {contextBridge,clipboard,ipcRenderer} = require("electron")
console.log("preload del index")

console.log(process.title);

// la variable "api" se puede usar en cualquiera
// de los archivos JS usados en el HTML asociado
// a la ventana a la que se establecio este preload
contextBridge.exposeInMainWorld(
    "api",{ 
        tituloProceso:process.title,
        copiarPortaPapeles:()=>{
            clipboard.writeText("prueba","selection")
        },
        cerrar:()=>{
            ipcRenderer.send("cerrar-chanel")
        }
    }
)