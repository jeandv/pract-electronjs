const {app,BrowserWindow,ipcMain} = require("electron");

app.on("ready",main)

console.log(process.title);

function main(){
    let win = new BrowserWindow({
        webPreferences:{
            preload:__dirname + "\\index\\index-preload.js"
        }
    })

    win.webContents.openDevTools();
    win.loadFile("index/index.html")
}

ipcMain.on("cerrar-chanel",()=>{
    console.log("quiting...")
    app.quit()
})