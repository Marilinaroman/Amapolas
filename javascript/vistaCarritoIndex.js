//Variables del carrito-toggle
const navToggle = document.querySelector(".boton_carrito");
const navMenu = document.querySelector(".muestra_carrito");


//Carrito visible
navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("carrito_visible");
    navMenu.classList.contains("nav-carrito_visible")? navToggle.setAttribute("aria-label", "Cerrar carrito") : navToggle.setAttribute("aria-label", "Abrir carrito")

});

const btnConsulta = document.getElementById('btn_contacto')
btnConsulta.addEventListener('click', () =>{
    Swal.fire({
        icon: 'info',
        title: 'Su consulta ha sido enviada',
        text: 'Estaremos respondiendo pronto!'
    })
})