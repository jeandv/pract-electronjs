const {app,BrowserWindow} = require("electron")

app.on("ready",()=>{
    mw = new BrowserWindow({webPreferences:{
        preload:__dirname+"\\preload.js"
    }})
    mw.loadFile("index.html")
    mw.setMenu(null)
    mw.webContents.openDevTools()
})