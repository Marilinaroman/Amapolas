const btnFormulario = document.getElementById('button');
const form = document.querySelector('#form');

form.addEventListener('submit', enviarFormulario)

function enviarFormulario(e) {
    e.preventDefault();

    btnFormulario.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_yoq5v6j';

    emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
        btnFormulario.value = 'Enviar';
        Swal.fire({
            icon: 'success',
            title: 'Su consulta ha sido enviada',
            text: 'Estaremos respondiendo pronto!'
        })
        this.reset();
        }, (err) => {
        btnFormulario.value = 'Enviar';
        alert(JSON.stringify(err));
        })
}