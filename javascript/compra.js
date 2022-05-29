// Declaro variables

let verTotal = document.querySelector("#ver_total");
let detalleMiPedido = document.querySelector("#detalle_mi_pedido");
let totalProductos = document.querySelector("#total_productos")
let contenedorTotal
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

// Genero en carrito_compra.html el detalle final del carrito
function carritoHtml() {
    
    if (carritoFinal != undefined){
        for (const detallePedido of carritoFinal) {
            contenedor = document.createElement("tr");
            indexBoton = carritoFinal.indexOf(detallePedido)
            total= (detallePedido.precioPedido * detallePedido.cantidadPedido);
            totalFinal +=total;
            mensaje = `<tr>
                        <td>${detallePedido.productoPedido.toUpperCase()}</td>
                        <td class="cantidad_producto" >
                            <button class="btn_suma" data-id="${indexBoton}" onclick="sumaProducto(this)"><img src="./../imagenes/iconos/mas.png" alt="icono suma" width="20" height="20"></button>
                            ${detallePedido.cantidadPedido}
                            <button class="btn_resta" data-id="${indexBoton}" onclick="restaProducto(this)"><img src="./../imagenes/iconos/menos.png" alt="icono menos" width="20" height="20"></button>
                        </td>
                        <td>$${detallePedido.precioPedido}</td>
                        <td>$${detallePedido.precioPedido*detallePedido.cantidadPedido}</td>
                        <button id ="${detallePedido.productoPedido}" class="borrar-producto" onclick="eliminarProducto(this)" data-id="${detallePedido.productoPedido}"><img src="./../imagenes/iconos/eliminar.png" alt="icono eliminar" width="20" height="20"></button>
                        
                    </tr>`
            
            contenedor.innerHTML = mensaje;
            detalleMiPedido.appendChild(contenedor);

        }   
        totalProductos.innerHTML = `<p>Total  $${totalFinal}</p>`;
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
            if(carritoFinal[indexBtnResta].cantidadPedido>0){
                carritoFinal[indexBtnResta].cantidadPedido -= 1
            } 
            console.log(e)
            limpiarHTML();
            carritoHtml();
            return carritoFinal
        }
        return carritoFinal
    })
    return carritoFinal
};


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
    }
}

const confirmarPago = document.getElementById('pagar')
confirmarPago.addEventListener('click', () =>{
    Swal.fire({
        icon: 'success',
        title: 'Gracias por su compra!',
        text: 'Recibimos su pedido exitosamente',
        timer: 5000
    })
})
const cancelarCompra = document.getElementById('cancelar_compra')
cancelarCompra.addEventListener('click', () =>{
    Swal.fire({
        icon: 'error',
        title: 'Su compra ha sido cancelada',
        text: 'Esperamos que vuelvas pronto!',
        timer: 5000
    })
})