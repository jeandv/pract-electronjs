const {ipcMain,app,BrowserWindow,dialog} = require("electron")
const fs = require('fs')

let mainWindow;

app.on("ready",()=>{
    mainWindow = new BrowserWindow({
            webPreferences:{
                nodeIntegration:true,
                contextIsolation:false
            }
    })
    mainWindow.loadFile("index.html")
})
console.log(__dirname)
ipcMain.handle("guardar-pdf",(event)=>{
    webContent = event.sender

    const path = require('path')
    ruta = path.join(app.getPath("desktop"),"prueba.pdf")

    fs.exists(ruta,(e)=>{
        if (e)
            dialog.showMessageBox(null, {
                message:"El archivo ya existe. Desea sobreescribirlo?",
                type:"question",
                noLink :true,
                buttons :["Si","No"]
            }).then((resp)=>{
                if (resp.response == 0)
                    guardarPDF(webContent,ruta);
            })
        else    
            guardarPDF(webContent,ruta);
    })
})

function guardarPDF(webContent,ruta){
    webContent.printToPDF({})
        .then((pdf)=>{
            fs.writeFile(ruta,pdf, (error) => {
                if (error) throw error
                dialog.showMessageBox(null,{
                    title:"Informacion",
                    message:"Se guardo el PDF exitosamente"
                })
                console.log(`Wrote PDF successfully to ${ruta}`)
            })
        })
        .catch((e)=>{
            console.log("Error al generar el pdf ")
            console.log(e)
        })
}
// es la forma de recibir mensajes de los
// render process usando promesas para
// responderle al render
ipcMain.handle("buscar-foto",()=>{
    console.log("mensaje recibido del render")
    return dialog.showOpenDialog(null,{
        title: "Seleccione una imagen",
        buttonLabel :"Seleccionar",
        filters:[
            { name: 'Imagenes', 
            extensions: ['jpg', 'png', 'gif'] 
            }
        ]
    })
})