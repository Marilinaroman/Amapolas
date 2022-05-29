//Variables del carrito-toggle
const navToggle = document.querySelector(".boton_carrito");
const navMenu = document.querySelector(".muestra_carrito");


//Carrito visible
navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("carrito_visible");
    if (navMenu.classList.contains("nav-carrito_visible")) {
    navToggle.setAttribute("aria-label", "Cerrar carrito");
    } else {
    navToggle.setAttribute("aria-label", "Abrir carrito");
}
});