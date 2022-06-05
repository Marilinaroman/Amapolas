
// variables seccion categorias de carrito_Compra.html
const categorias = document.querySelectorAll("#categorias .categoria");
const contenidoCategorias = document.querySelectorAll('.contenido_categorias');
let categoriaActiva = null;

// Variables opciones de pago
let pagoEfectivo = document.getElementById('pago_en_efectivo');
let	pagoTarjeta = document.getElementById('pago_tarjeta');
const datosTarjeta = document.getElementById('datos_tarjeta');

// Funciones que se ejecutan cuando selecciona el método de pago
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

const finalizarCompra = () =>{
	categorias[0].classList.remove('activa')
	categorias[1].classList.add('activa');
	contenidoCategorias[0].remove('activo')
	contenidoCategorias[1].classList.add('activo')
}

const confirmaEnvio = () =>{
	categorias[1].classList.remove('activa')
	categorias[2].classList.add('activa');
	contenidoCategorias[1].remove('activo')
	contenidoCategorias[2].classList.add('activo')
}

categorias.forEach((categoria) => {
	categoria.addEventListener('click', (e) => {
		categorias.forEach((elemento) => {
			elemento.classList.remove('activa');
		});

		e.currentTarget.classList.toggle('activa');
		categoriaActiva = categoria.dataset.categoria;

		// Activo el contenedor que corresponde
		contenidoCategorias.forEach((contenedor) => {
			contenedor.dataset.categoria === categoriaActiva? contenedor.classList.add('activo') : contenedor.classList.remove('activo');
		});
	});
});