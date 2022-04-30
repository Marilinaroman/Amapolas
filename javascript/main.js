// Mi cuenta
function registrarme (){
	let mailRegistro = document.getElementById("email_registro").value;
	if (mailRegistro == "") {
		alert("Debes ingresar tu email"); 
	} else {
		alert ("Te enviamos un email para activar tu cuenta")
	}
}

function loguearme(){
	let miEmail = prompt("Ingrese su email");
	let miContraseña = prompt("ingrese su contraseña");

	if (miEmail != "" && miContraseña == ""){
		alert("Debes ingresar tu email y contraseña");
	} else {
		alert("El nombre de usuario o la contraseña que ingresaste son incorrectos.")
	}
}