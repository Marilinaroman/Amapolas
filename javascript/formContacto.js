const btnFormulario = document.getElementById('button');
const form = document.querySelector('#form');


form.addEventListener('submit', enviarFormulario)

function enviarFormulario(e) {

    e.preventDefault();

    btnFormulario.value = 'Enviando...'

    let nombre = document.getElementById('nombre').value
    let apellido =document.getElementById('apellido').value
    let telefono =document.getElementById('telefono').value
    let emailContacto =document.getElementById('email').value
    let mensajeContacto = document.getElementById('mensaje').value

    let params = {
        user_id: '_9x74mzrTJjsBxQWE',
        service_id: 'service_geji25l',
        template_id: 'template_yoq5v6j',
        template_params: {
                'nombre': nombre,
                'apellido': apellido,
                'email': emailContacto,
                'telefono': telefono,
                'mensaje': mensajeContacto
                }
    };
            
    let headers = {
        'Content-type': 'application/json'
    };
        
    let options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params)
    };
        
    fetch('https://api.emailjs.com/api/v1.0/email/send', options)
        .then( async (response) => {
            if (response.ok) {
                btnFormulario.value = 'Enviar';
                Swal.fire({
                    icon: 'success',
                    title: 'Su consulta ha sido enviada',
                    text: 'Estaremos respondiendo pronto!'
                })
                this.reset();
            } else {
                return response.text()
                .then(text => Promise.reject(text));
                }
        })
        .catch((error) => {
            console.log('Oops... ' + error);
        });
}