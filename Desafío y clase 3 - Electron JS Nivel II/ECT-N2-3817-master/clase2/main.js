const {app,BrowserWindow} = require("electron")
require("./event-listeners.js")

app.on("ready",()=>{
    function ini(titulo){
        return {
            title:titulo,
            //titleBarStyle : "hidden",
            webPreferences :{
                preload:__dirname+"\\preload.js"
            }
        }
    }
    new BrowserWindow(ini("primera")).loadFile("index.html")
    new BrowserWindow(ini("segunda")).loadFile("index.html")
    new BrowserWindow(ini("tercera")).loadFile("index.html")
})


