
// variables seccion categorias de carrito_Compra.html
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


		// Activo el contenedor que corresponde
		contenidoCategorias.forEach((contenedor) => {
			if(contenedor.dataset.categoria === categoriaActiva){
				contenedor.classList.add('activo');
			} else {
				contenedor.classList.remove('activo');
			}
		});
	});
});

let pagoEfectivo = document.getElementById('pago_en_efectivo');
let	pagoTarjeta = document.getElementById('pago_tarjeta');
const datosTarjeta = document.getElementById('datos_tarjeta');

const eligioEfectivo = () =>{
	datosTarjeta.classList.remove('tarjeta_visible');
	datosTarjeta.classList.add('oculta')
}

const eligioTarjeta = () =>{
	datosTarjeta.classList.remove('oculta');
	datosTarjeta.classList.add('tarjeta_visible')
}

pagoTarjeta.addEventListener('click', eligioTarjeta);
pagoEfectivo.addEventListener('click', eligioEfectivo);
