
console.log("en el index.js")

//console.log(process.title);
console.log(window.api.tituloProceso)

// se ejecuta el metodo definido en 
// el preload
window.api.copiarPortaPapeles()

setTimeout(()=>{
    window.api.cerrar()
},5000)
//window.close()