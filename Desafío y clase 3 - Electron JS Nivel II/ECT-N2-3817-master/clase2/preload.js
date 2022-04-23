const {ipcRenderer,contextBridge} = require("electron")

console.log("preload...")



ipcRenderer.on("msg-ready-pdf",(event,ok)=>{
    console.log("llego la respuesta.. "+ok)
    if (ok)
        console.log("esta listo el pdf...")
    else
        console.log("error al generar pdf")
})

contextBridge.exposeInMainWorld("api",{
    getMessage:(f)=>{
        ipcRenderer.on("msg-ipc-ChangeColor",(event,color)=>{
            console.log("recibiendo mensaje del main")
            
            f(color)
        })
    },
    getSOName:(f)=>{
        console.log("get SO name...")
        // espera la respuesta del main
        let resp=ipcRenderer.sendSync("msg-getSOName")
        console.log(resp)
        f(resp)
    },
    saveToPDF:(n)=>{
        console.log("guardando a pdf..")
        ipcRenderer.send("msg-saveToPDF",
                        n)
        
    },
    minimizar:()=>{
        console.log("minimizando..")
        ipcRenderer.send("msg-minimizar",
        {
          nombre:"jose",
          apellido:"rojas",
          fechaNac:true  
        })
    },
    maximizar:()=>{
        console.log("maximizando..")
        ipcRenderer.send("msg-maximizar")
    }
})