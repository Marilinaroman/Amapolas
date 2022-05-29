// Variables Navbar
const navDesplegable = document.querySelector(".nav-toggle-menu");
const navOpciones = document.querySelector(".navbar");


//Navbar visible
navDesplegable.addEventListener("click", () => {
    navOpciones.classList.toggle("navbar_visible");
    if (navOpciones.classList.contains("nav-menu_visible")) {
		navDesplegable.setAttribute("aria-label", "Cerrar menú");
    } else {
		navDesplegable.setAttribute("aria-label", "Abrir menú desplegable");
}
});