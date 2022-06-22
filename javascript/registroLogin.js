

// Variables del login
let buscarLogin = [];
let mailConsulta;
let mensajeRegistro= document.getElementById("mensaje_registro");
let consultaRegistro = document.getElementById("consulta_clientes");
let contraseñaConsulta;
let mensajeDeValidacion = document.getElementById("mensaje_validacion");
let clientes = [];
let btnInicioSesion = document.getElementById('btn_inicio_sesion'),
	checkbox = document.getElementById('recordarme');
let emailCliente = document.getElementById("email_registro");
let contraseñaCliente = document.getElementById("contraseña");

class registroClientes {
    constructor(idMail, contraseña) {
        this.idMail = idMail;
        this.contraseña = contraseña;
    };
};



//Guardo en el Session Storage
const guardoRegistroSS = () =>{
	sessionStorage.setItem("registroCliente", JSON.stringify(clientes))
}

//Guardo en el Local Storage
const guardoClienteLS = () => {
	localStorage.setItem("clienteRecordar", JSON.stringify(clientes))
}

//Recupero login del Local Storage
const recuperoCliente = () =>{
	clientes = JSON.parse(localStorage.getItem("clienteRecordar"))
	console.log(clientes)
	return clientes;
}

if(localStorage.getItem("clienteRecordar")){
	console.log(clientes)
	recuperoCliente();
	document.getElementById("email_registrado").value= clientes[0].idMail
	document.getElementById("consulta_contraseña").value = clientes[0].contraseña
}

//Alert de registro exitoso
const registroOk =()=>{
	Swal.Fire({
		icon: 'success',
		iconColor:'fad8ce',
  		title: 'Te registraste correctamente!',
	})
}

// Defino la funcion que se ejecutará cuando un nuevo cliente quiera registrarse
function registrarme (){

	let altaClientes= document.getElementById("alta_clientes");
	altaClientes.addEventListener("submit", validarFormulario);
	
	
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
				guardoRegistroSS();
				
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
				setTimeout(() => {
					window.location ="./carrito_compra.html"
				}, 100);
			}
		}
		if(checkbox.checked){
			guardoClienteLS();
		}
		
	}
}



