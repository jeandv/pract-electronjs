
let listaPorHacer=[]

$(document).ready(()=>{
    if (window.api)
		listaPorHacer = window.api.leerListaFromJSON()
    console.log(listaPorHacer)
    for (i=0;i<listaPorHacer.length;i++)
        $("#lista").append(
            `<li>${listaPorHacer[i]}</li>`
        )

	$("#lista li").click(eliminar)
	
    $("#btn-agregar").click(()=>{
        agregar()
    })
    $("#por-hacer").keypress((e)=>{
        if (e.keyCode == 13)
            agregar()
    })
})

function eliminar(event){

	$(event.target).remove()
	if (window.api)
		window.api.guardarListaToJSON(listaPorHacer)
}

function agregar(){
    let input=$("#por-hacer")[0]
    let texto=$(input).val()
    li=$("#lista").append(
        `<li>${texto}</li>`
    )
	$("#lista li").click(eliminar)
    $(input).val("")
    input.focus()
    listaPorHacer.push(texto)
	if (window.api)
		window.api.guardarListaToJSON(listaPorHacer)
}