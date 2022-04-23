const {ipcMain,BrowserWindow} = require("electron")


let colors=["blue","red","yellow","white"]
let n=0;
setInterval(()=>{
    let wc=BrowserWindow.getAllWindows()
    console.log("numero de ventanas "+wc.length)
    let i=Math.floor(Math.random()*wc.length) 
    console.log(i)   
    
    let win=wc[i]

    console.log("enviando a "+i+" "+win.title+" "+colors[n])
    win.webContents.send("msg-ipc-ChangeColor",colors[n])
    
    n<colors.length-1?n++:n=0;

},5000)

ipcMain.on("msg-saveToPDF",(event,dato)=>{
    console.log("el nombre del archivo: "+dato)
    let ok;
    event.sender.printToPDF({landscape:false})
        .then((datos)=>{
            
            ok=true;
            //guardar()
        })
        .catch((e)=>{
            ok=false;
            console.log("error al guardar ")
            console.log(e)
        })
        .finally(()=>{
            // se envia una respuesta al render
            event.reply("msg-ready-pdf",ok)
        })
})

ipcMain.on("msg-getSOName",(event)=>{
    console.log("so name is ...")
    event.returnValue=process.platform
})

ipcMain.on("msg-minimizar",(event,obj)=>{
    console.log("minimizando...")
    console.log(obj.apellido)
    // event.sender es el webContent que envia el mensaje
    let win=BrowserWindow.fromWebContents(event.sender)
    console.log(win.title)
    win.minimize()
})

ipcMain.on("msg-maximizar",(event)=>{
    console.log("maximizando...")
    let win=BrowserWindow.fromWebContents(event.sender)
    console.log(win.title)
    if (win.isMaximized())
        win.unmaximize()
    else
        win.maximize()
})