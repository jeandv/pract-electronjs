const {contextBridge} = require("electron")
const fs = require("fs")

console.log("preloading....")
contextBridge.exposeInMainWorld(
    "api",{
        guardarListaToJSON:(lista)=>{
            //console.log(lista)
            let obj = new Object()
            obj.todo = lista
            fs.writeFileSync(__dirname+"\\todo.json",
                JSON.stringify(obj))
        },
        leerListaFromJSON:()=>{
            console.log()
            try{
                datos = fs.readFileSync(__dirname+"\\todo.json")
                datosJSON=JSON.parse(datos)
                console.log(datosJSON)
                return datosJSON.todo
            }catch(e){
                console.log("no se pudo abrir el archivo")
                return []
            }
            
        }
    }
)