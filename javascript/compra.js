// Declaro variables

let verTotal = document.querySelector("#ver_total");
let detalleMiPedido = document.querySelector("#detalle_mi_pedido");
let totalProductos = document.querySelector("#total_productos");
let contenedorTotal;
let botonInfo;
const carritoHTML = document.querySelector('#detalle_mi_pedido');

// Variables del Envio
const opcionesEnvio = document.querySelector('.opciones_envio');
const envioDomicilio = document.querySelector('.envio_domicilio');
const envioDomicilioOpciones = document.getElementsByClassName('envio_dom_opcion');
let consultaPrecio;
let valorEnvio = 0;
let seleccion;
let seleccionDomicilio;
let contenedor;

// Variables del descuento
let claveDescuento = 'AMAPOLASOFF';
let codigoDescuento = document.getElementById('codigo_descuento');
const btnDescuento = document.getElementById('btn_descuento');

// Variables de la tarjeta
let nombreTarjeta = document.getElementById('nombre_tarjeta');
let numeroTarjeta = document.getElementById('numeros_tarjeta');
let fechaTarjeta = document.getElementById('fecha_tarjeta');
let passTarjeta = document.getElementById('pass_tarjeta');

// Variables de los alert
const confirmarPago = document.getElementById('pagar');
const cancelarCompra = document.getElementById('cancelar_compra');

// Recupero el carrito del LS
localStorage.getItem('listaProductos')? recuperoLS() : console.log('error');


// Genero en carrito_compra.html el detalle final del carrito
function carritoHtml() {
    
    if (carritoFinal != undefined){
        for (const detallePedido of carritoFinal) {
            const {productoPedido, cantidadPedido, precioPedido} = detallePedido
            contenedor = document.createElement("tr");
            indexBoton = carritoFinal.indexOf(detallePedido)
            total= (precioPedido * cantidadPedido);
            totalFinal +=total;
            mensaje = `<tr>
                        <td>${productoPedido.toUpperCase()}</td>
                        <td class="cantidad_producto" >
                            <button class="btn_suma" data-id="${indexBoton}" onclick="sumaProducto(this)"><img src="./../imagenes/iconos/mas.png" alt="icono suma" width="20" height="20"></button>
                            ${cantidadPedido}
                            <button class="btn_resta" data-id="${indexBoton}" onclick="restaProducto(this)"><img src="./../imagenes/iconos/menos.png" alt="icono menos" width="20" height="20"></button>
                        </td>
                        <td>$${precioPedido}</td>
                        <td>$${precioPedido*cantidadPedido}</td>
                        <button id ="${productoPedido}" class="borrar-producto" onclick="eliminarProducto(this)" data-id="${productoPedido}"><img src="./../imagenes/iconos/eliminar.png" alt="icono eliminar" width="20" height="20"></button>
                        </tr>
                        `
            
            contenedor.innerHTML = mensaje;
            detalleMiPedido.appendChild(contenedor);
        }   
        totalProductos.innerHTML = `$${totalFinal}`;
        
        // Total en seccion Envio
        contenedorTotal = document.createElement("div");
        let totalHtml = `<p>Total: ${totalFinal}</p>`;
        contenedorTotal.innerHTML = totalHtml;
        verTotal.appendChild(contenedorTotal);
    }
}
carritoHtml()

// Funcion para limpiar pedido en carrito_compra.html
function limpiarHTML() {
    while (detalleMiPedido.firstChild) {
        detalleMiPedido.removeChild(detalleMiPedido.firstChild);
        totalFinal = 0;
    }
    contenedorTotal.removeChild(contenedorTotal.firstChild);
}


// Funcion para eliminar pedidos en carrito_compra.html
function eliminarProducto(x){
    const boton = carritoHTML.querySelectorAll('.borrar-producto[data-id]');
    let id = x.id;
    console.log(id);

    boton.forEach(e =>{
        console.log(e.parentElement);
        botonInfo = e.getAttribute('data-id');
        if(id == botonInfo){
            carritoFinal= carritoFinal.filter(detallePedido => detallePedido.productoPedido !== botonInfo);
            console.log(carritoFinal)
            limpiarHTML();
            carritoHtml();
            return carritoFinal;
        }
        return carritoFinal;
    })
    return carritoFinal;
}

// Funcion para agregar cantidades en carrito_compra.html
function sumaProducto(x){
    const botonSuma = carritoHTML.querySelectorAll('.btn_suma');
    let idBotonSuma = x.getAttribute('data-id');
    console.log(idBotonSuma);
    botonSuma.forEach(e =>{
        let indexBtnSuma = e.getAttribute('data-id')
        if(idBotonSuma == indexBtnSuma ){
            carritoFinal[indexBtnSuma].cantidadPedido += 1;
            console.log(e);
            limpiarHTML();
            carritoHtml();
            return carritoFinal;
        }
        return carritoFinal
    })
    return carritoFinal
}

// Funcion para restar cantidades en carrito_compra.html
function restaProducto(x){
    const botonResta = carritoHTML.querySelectorAll('.btn_resta');
    let idBotonResta = x.getAttribute('data-id');
    console.log(idBotonResta);
    botonResta.forEach(e =>{
        let indexBtnResta = e.getAttribute('data-id');
        if(idBotonResta == indexBtnResta ){
            carritoFinal[indexBtnResta].cantidadPedido>0? (carritoFinal[indexBtnResta].cantidadPedido -= 1) : console.log('es cero');
            console.log(e)
            limpiarHTML();
            carritoHtml();
            return carritoFinal
        }
        return carritoFinal
    })
    return carritoFinal
};

// Actualizar LS
const actualizarLS = () =>{
    localStorage.setItem('listaProductos', JSON.stringify(carritoFinal))
}

// funcion para seleccionar el tipo de envio
function opcionEnvio(){
	seleccion = opcionesEnvio.options[opcionesEnvio.selectedIndex].value;
		
	if (seleccion == "2"){
        envioDomicilio.style.display="block";
        
	} else{
		envioDomicilio.style.display="none";
        costoEnvio=0;
        contenedorTotal.innerHTML = `<p>Total: ${totalFinal + costoEnvio}</p>`
        verTotal.appendChild(contenedorTotal)
    }
}

// Funcion para obtener el costo del envio seleccionado
function opcionDomicilio(a){
    let opcion = a.value;
    consultaPrecio = envio.find((precio) => precio.idZonaEnvio == opcion);
    if(consultaPrecio != undefined){
        costoEnvio = consultaPrecio.precioEnvio;
        contenedorTotal.innerHTML = `<p>Total: ${totalFinal + costoEnvio}</p>`
        verTotal.appendChild(contenedorTotal);
		return costoEnvio;
    }
}


console.log(importeACobrar)


//Funcion para generar el alert de código de descuento correcto
const codigoOk = () => {
    Toastify({
        text: "Se aplico el descuento",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
}

// Funcion para generar el alert de código de descuento incorrecto
const codigoFail = () => {
    Toastify({
        text: "El código ingresado no es valido",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #E74C3C , #F5B7B1)",
        },
    }).showToast();
}

let descuento = 0;
// Funcion que se ejecuta cuando aplica el codigo de descuento
const aplicaDescuento = () => {
    codigoDescuento.value.toUpperCase() === claveDescuento? descuento = totalFinal * 0.2 : descuento = 0;
    codigoDescuento.value.toUpperCase() === claveDescuento? codigoOk() : codigoFail();
    return descuento

}

let msjAlerta  = document.querySelector('#tabla_carrito').cloneNode(true);

//Elimina botones
const eliminaBoton = () =>{
    let botones = msjAlerta.getElementsByTagName('button')
    for (e of botones){
        e.classList.add('d-none')
    }
    
    return msjAlerta
}

//Agrega info
const agregaInfo = () =>{
    let masInfo = document.createElement('tbody');
    info = `<tr>
                    <th scope="row">Costo Envio</th>
                    <td colspan="4">$${costoEnvio}</td>
                </tr>
                <tr>
                    <th scope="row">Descuento Aplicado</th>
                    <td colspan="4">$${descuento}</td>
                </tr>
                <tr>
                    <th scope="row">Total a Pagar</th>
                    <td colspan="4">$${totalFinal - descuento + costoEnvio}</td>
                </tr>`
    masInfo.innerHTML = info;
    msjAlerta.appendChild(masInfo);
    return msjAlerta
}



// Alert que se genera al confirmar el pago

confirmarPago.addEventListener('click', () =>{
    let datosOk = (nombreTarjeta.value && numeroTarjeta.value && fechaTarjeta.value && passTarjeta.value) || datosTarjeta.classList.contains('oculta')
    
    // mensaje
    let spanAlerta = document.createElement('span')
    eliminaBoton();
    agregaInfo();
    spanAlerta.appendChild(msjAlerta);

    datosOk? Swal.fire({
        title: 'Estas por confirmar la siguiente compra:',
        html:spanAlerta,
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Gracias por su compra!',
                text: 'Recibimos su pedido exitosamente',
                timer: 5000,
                showConfirmButton: false
            })
        } else if (result.isDenied) {
            Swal.fire({
                icon: 'error',
                title: 'Su compra ha sido cancelada',
                text: 'Esperamos que vuelvas pronto!',
                timer: 5000,
                showConfirmButton: false
            })
        }
        }).then(function(){
            setTimeout(() => {
                window.location ="./../index.html"
            }, 2000);
        }):
    console.log('error');
})
