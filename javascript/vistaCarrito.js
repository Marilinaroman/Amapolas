
// Quienes somos seccion categorias
const categorias = document.querySelectorAll("#categorias .categoria");
const contenidoCategorias = document.querySelectorAll('.contenido_categorias');
let categoriaActiva = null;

categorias.forEach((categoria) => {
	categoria.addEventListener('click', (e) => {
		categorias.forEach((elemento) => {
			elemento.classList.remove('activa');
		});

		e.currentTarget.classList.toggle('activa');
		categoriaActiva = categoria.dataset.categoria;


		// Activo el contenedor de preguntas que corresponde
		contenidoCategorias.forEach((contenedor) => {
			if(contenedor.dataset.categoria === categoriaActiva){
				contenedor.classList.add('activo');
			} else {
				contenedor.classList.remove('activo');
			}
		});
	});
});


// Envio
const opcionesEnvio = document.querySelector('.opciones_envio');
const envioDomicilio = document.querySelector('.envio_domicilio')
let muestraEnvio = document.querySelector('#precio_envio')
let costoEnvio;

opcionesEnvio.addEventListener('change', () =>{
	let seleccion = opcionesEnvio.selectedIndex;
	
	if (seleccion == 2){
		envioDomicilio.style.display="block";
	} else {
		envioDomicilio.style.display="none";
	}
})

envioDomicilio.addEventListener('change', () =>{


	let zonaEnvio = envioDomicilio.selectedIndex;
	let buscarZona = envio.find((buscaEnvio) => buscaEnvio.idZonaEnvio === zonaEnvio);
	costoEnvio = buscarZona.precioEnvio;
    zona = buscarZona.descripcionEnvio;
    let totalFinal = costoEnvio + total;
	
	let mensajeEnvio = `<li> Envio a ${zona} $${costoEnvio}</li> <br>
						<li> Total = $${totalFinal}`
	let contenedorEnvio = document.createElement("div")
	contenedorEnvio.innerHTML = mensajeEnvio;
	muestraEnvio.appendChild(contenedorEnvio)
	
})
