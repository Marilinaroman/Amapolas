// Variables Navbar
const navDesplegable = document.querySelector(".nav-toggle-menu");
const navOpciones = document.querySelector(".navbar");

// Variables del login
let buscarLogin = [];
let mailConsulta;
let mensajeRegistro= document.getElementById("mensaje_registro");
let consultaRegistro = document.getElementById("consulta_clientes");
let contraseñaConsulta;
let mensajeDeValidacion = document.getElementById("mensaje_validacion");
const clientes = [];

//Variables del carrito-toggle
const navToggle = document.querySelector(".boton_carrito");
const navMenu = document.querySelector(".muestra_carrito");


class registroClientes {
    constructor(idMail, contraseña) {
        this.idMail = idMail;
        this.contraseña = contraseña;
    };
};

//Navbar visible
navDesplegable.addEventListener("click", () => {
    navOpciones.classList.toggle("navbar_visible");
    if (navOpciones.classList.contains("nav-menu_visible")) {
		navDesplegable.setAttribute("aria-label", "Cerrar menú");
    } else {
		navDesplegable.setAttribute("aria-label", "Abrir menú desplegable");
}
});


//Carrito visible
navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("carrito_visible");
    if (navMenu.classList.contains("nav-carrito_visible")) {
    navToggle.setAttribute("aria-label", "Cerrar carrito");
    } else {
    navToggle.setAttribute("aria-label", "Abrir carrito");
}
});


// Defino la funcion que se ejecutará cuando un nuevo cliente quiera registrarse
function registrarme (){

	let altaClientes= document.getElementById("alta_clientes");
	altaClientes.addEventListener("submit", validarFormulario);
	let emailCliente;
	let contraseñaCliente;
	
	function validarFormulario(e){

		//Cancelo el comportamiento del evento
		e.preventDefault();
		
		emailCliente = document.getElementById("email_registro").value;
		contraseñaCliente = document.getElementById("contraseña").value;

		if(emailCliente == "" || contraseñaCliente == ""){
			mensajeRegistro.innerHTML = `<p>Debe ingresar un email y una contraseña</p>`
		} else if(emailCliente != "" && contraseñaCliente != ""){
			buscarLogin = clientes.find((buscaLogin) => buscaLogin.idMail === emailCliente)
			if (buscarLogin != undefined){
				mensajeRegistro.innerHTML = `<p>Su email ya se encuentra registrado</p>`
			} else if(buscarLogin == undefined){
				idMail = emailCliente; 
				contraseña = contraseñaCliente;
				clientes.push(new registroClientes(idMail,contraseña))
				return clientes
			}
				return clientes
    		}
    	return clientes
	}
}


// Defino la funcion de control de login
function loguearme(){
	
	consultaRegistro.addEventListener("submit",validarlogin);

	function validarlogin(el){
		el.preventDefault();
		mailConsulta = document.getElementById("email_registrado").value;
		contraseñaConsulta = document.getElementById("consulta_contraseña").value;

		buscarLogin = clientes.find((buscaLogin) => buscaLogin.idMail === mailConsulta);

		if (buscarLogin == undefined){
			mensajeDeValidacion.innerHTML = `El nombre de usuario y/o la contraseña que ingresaste son incorrectos.`
		} else{

			let mailAValidar = buscarLogin.idMail;
			let contraseñaAValidar = buscarLogin.contraseña;
			
			if (mailConsulta != mailAValidar || contraseñaAValidar !=contraseñaConsulta){
				mensajeDeValidacion.innerHTML = `El nombre de usuario y/o la contraseña que ingresaste son incorrectos.`
			} else if(mailConsulta === mailAValidar && contraseñaAValidar === contraseñaConsulta) {
				mensajeDeValidacion.innerHTML = `¡Bienvenido/a!`
			}
		}
		
	}

}
