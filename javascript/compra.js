// Declaro variables

let costoEnvio =0;
let mensaje;
let opcion = "";
let totalFinal = 0;
let total = 0;
let importeACobrar = 0;
let codigoDescuento = "";
let nuevoPedido;
let ticket = "";
let zona = "";
let idCompra;
let buscarProducto =[];

// Genero array de productos
const productos = [
    { id: 1, producto: "banana split por unidad", idPrecio: 100 },
    { id: 2, producto: "lemon pie por unidad", idPrecio: 110 },
    { id: 3, producto: "trufas por unidad", idPrecio: 100 },
    { id: 4, producto: "mini brownie por unidad", idPrecio: 120 },
    { id: 5, producto: "mini tarta del bosque por unidad", idPrecio: 140 },
    { id: 6, producto: "mini tiramisu por unidad", idPrecio: 140 },
    { id: 7, producto: "cheescake", idPrecio: 1000 },
    { id: 8, producto: "chocotorta", idPrecio: 1080 },
    { id: 9, producto: "lemon pie", idPrecio: 1200 },
    { id: 10, producto: "torta frutal", idPrecio: 1500 },
    { id: 11, producto: "tiramisu", idPrecio: 2000 },
    { id: 12, producto: "torta tradicional", idPrecio: 2000 },
];


const carrito = [];
let carritoFinal = [];
const arrayPedido = [];

class detallePedido {
    constructor(productoPedido, cantidadPedido, precioPedido) {
        this.productoPedido = productoPedido;
        this.precioPedido = precioPedido;
        this.cantidadPedido = cantidadPedido;
    };
};

const envio = [
    {idZonaEnvio: 1, precioEnvio: 0, descripcionEnvio: "CABA"},
    {idZonaEnvio: 2, precioEnvio: 400, descripcionEnvio: "Zona Norte"},
    {idZonaEnvio: 3, precioEnvio: 450, descripcionEnvio: "Zona Sur"},
    {idZonaEnvio: 4, precioEnvio: 500, descripcionEnvio: "Zona Oeste"}
];
// Guardo el array en el LS
const guardoLS = () =>{
    localStorage.setItem('listaProductos', JSON.stringify(arrayPedido));

}

// Recupero el array del LS y los guardo en un nuevo array
const recuperoLS = () => {
    const almacenados = JSON.parse(localStorage.getItem("listaProductos"));
    carrito.push(almacenados);

    
    carrito.forEach( element => {
        for ( const objeto of element){
            productoPedido =objeto.productoPedido
            precioPedido = objeto.precioPedido
            cantidadPedido= objeto.cantidadPedido
            carritoFinal.push(new detallePedido(productoPedido, cantidadPedido, precioPedido))
        }
    })
}

const botonCompra = document.querySelectorAll("button[data-id-product]")
let consultaPedido =[];

function consultaArrayPedido (){

    if (arrayPedido == ""){
        cantidadPedido = 1;
        console.log(arrayPedido)
        arrayPedido.push(new detallePedido(productoPedido, cantidadPedido, precioPedido))
        return arrayPedido;
    } else if((arrayPedido)) {
        consultaPedido = arrayPedido.find((encontrarProducto) => encontrarProducto.productoPedido == productoPedido)
        if( consultaPedido == undefined){
            cantidadPedido = 1;
            arrayPedido.push(new detallePedido(productoPedido, cantidadPedido, precioPedido))
            return arrayPedido;
        } else if(consultaPedido != undefined){
            cantidadAcum = consultaPedido.cantidadPedido
            let buscaIndex = arrayPedido.indexOf(consultaPedido)
            arrayPedido[buscaIndex].cantidadPedido += 1
            return arrayPedido;
            }
        return arrayPedido;
        }
}
    


// con cada boton de compra alimento el array de pedidos
botonCompra.forEach(button =>{
        button.addEventListener("click", ()=>{
        idCompra = button.getAttribute('data-id-product')
        buscarProducto = productos.find((buscaProducto) => buscaProducto.id == idCompra)
        productoPedido = buscarProducto.producto;
        precioPedido = buscarProducto.idPrecio;
        consultaArrayPedido()
        
        guardoLS()
        
        return arrayPedido;

        })
        return carrito
        
})
recuperoLS()
console.log(arrayPedido)

   
let verTotal = document.querySelector("#ver_total");
let detalleMiPedido = document.querySelector("#detalle_mi_pedido");
let totalProductos = document.querySelector("#total_productos")
let contenedorTotal


function carritoHtml() {
    
    if (carritoFinal != undefined){
        for (const detallePedido of carritoFinal) {
            let contenedor = document.createElement("tr");
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
    totalProductos.innerHTML = `<p>Total  $${totalFinal}</p>`
    
    contenedorTotal = document.createElement("div");
    let totalHtml = `<p>Total: ${totalFinal}</p>`
    contenedorTotal.innerHTML = totalHtml;
    verTotal.appendChild(contenedorTotal);


    }
}




carritoHtml()

function limpiarHTML() {
    while (detalleMiPedido.firstChild) {
        detalleMiPedido.removeChild(detalleMiPedido.firstChild)
        totalFinal = 0;
    }
    contenedorTotal.removeChild(contenedorTotal.firstChild)
}

let botonInfo;
const carritoHTML = document.querySelector('#detalle_mi_pedido');



function eliminarProducto(x){
    const boton = carritoHTML.querySelectorAll('.borrar-producto[data-id]')
    let id = x.id
    console.log(id)

    boton.forEach(e =>{
        console.log(e.parentElement)
        botonInfo = e.getAttribute('data-id')
        if(id == botonInfo){
                carritoFinal= carritoFinal.filter(detallePedido => detallePedido.productoPedido !== botonInfo);
                console.log(carritoFinal)
                limpiarHTML();
                carritoHtml();
                return carritoFinal
        }
        return carritoFinal
    })
    return carritoFinal

}

function sumaProducto(x){
    const botonSuma = carritoHTML.querySelectorAll('.btn_suma');
    let idBotonSuma = x.getAttribute('data-id')
    console.log(idBotonSuma)
    botonSuma.forEach(e =>{
        let indexBtnSuma = e.getAttribute('data-id')
        if(idBotonSuma == indexBtnSuma ){
                carritoFinal[indexBtnSuma].cantidadPedido += 1
                
                console.log(e)
                limpiarHTML();
                carritoHtml();
                return carritoFinal
        }
        return carritoFinal
    })
    return carritoFinal
}

function restaProducto(x){
    const botonResta = carritoHTML.querySelectorAll('.btn_resta');
    let idBotonResta = x.getAttribute('data-id')
    console.log(idBotonResta)
    botonResta.forEach(e =>{
        let indexBtnResta = e.getAttribute('data-id')
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

// Envio
const opcionesEnvio = document.querySelector('.opciones_envio');
const envioDomicilio = document.querySelector('.envio_domicilio')
const envioDomicilioOpciones = document.getElementsByClassName('envio_dom_opcion');
let consultaPrecio
let valorEnvio = 0;
let seleccion;
let seleccionDomicilio;

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

function opcionDomicilio(a){
    let opcion = a.value;
    consultaPrecio = envio.find((precio) => precio.idZonaEnvio == opcion)
    if(consultaPrecio != undefined){
        costoEnvio = consultaPrecio.precioEnvio
        contenedorTotal.innerHTML = `<p>Total: ${totalFinal + costoEnvio}</p>`
        verTotal.appendChild(contenedorTotal)
    }
    }