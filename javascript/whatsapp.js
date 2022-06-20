// Link whatsapp
let whatsapp = document.getElementById('WSP')
function mensajeWsp(){
	let mensaje_final =  "%20Hola%20me%20contacto%20desde%20Amapolas%20";
	let mensaje = "https://api.whatsapp.com/send?phone=+5491136457467&text=" + mensaje_final;
	whatsapp.href = mensaje  
}