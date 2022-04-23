const {app,BrowserWindow} = require("electron")

console.log(app.name)

app.on("ready",()=>{
    console.log("estamos listos")

    let win = new BrowserWindow({
        show:false,
       
    })

    //win.loadURL("https://cadif1.com")
    win.loadFile("index.html")
    win.setMenu(null)
    let content = win.webContents
    
    // abre la ventana de herramientas de desarrollo de la ventana
    content.openDevTools()
    content.on("dom-ready",()=>{
        win.show()
        console.log("listo el DOM");
        // se ejecuta un script desde el main. Si son varias instrucciones, se separan con ;
        /*content.executeJavaScript("document.getElementById('logo').style.display='none'")
            .then(()=>{
                console.log("todo bien al ejecutar el script")
                // se muestra la ventana luego de que se ejecuta el script
            })
            .catch((e)=>{
                console.log("ERROR al ejecutar el script")
                console.log(e)
            })
            .finally(()=>{
                win.show()
            })*/
    })
    content.on("did-finish-load",()=>{
        console.log("se termino de cargar la pagina")
        content.getPrintersAsync()
            .then((printers)=>{
                console.log(printers)
                if (printers.length == 0)
                    console.log("no hay impresoras instaladas")
                else
                    // se imprime sin seleccionar la impresora
                    content.print({silent:true,landscape:true,copies:2})
            })
    })
    content.on("will-navigate",(event)=>{
        console.log("va a navegar a otra pagina")
        event.preventDefault();
    })
    content.on("did-navigate",()=>{
        console.log("navego a otra pagina")
    })
})