// Declaro variables

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
const carritoFinal = [];
const arrayPedido = [];

class detallePedido {
    constructor(productoPedido, cantidadPedido, precioPedido) {
        this.productoPedido = productoPedido;
        this.precioPedido = precioPedido;
        this.cantidadPedido = cantidadPedido;
    };
};

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

// con cada boton de compra alimento el array de pedidos
botonCompra.forEach(button =>{
        button.addEventListener("click", ()=>{
        idCompra = button.getAttribute('data-id-product')
        buscarProducto = productos.find((buscaProducto) => buscaProducto.id == idCompra)
        precioPedido = buscarProducto.idPrecio;
        productoPedido = buscarProducto.producto;
        cantidadPedido = 1;
        
        arrayPedido.push(new detallePedido(productoPedido, cantidadPedido, precioPedido))
        
        guardoLS()
        
        return arrayPedido;

        })
        return carrito
        
})

console.log(arrayPedido)

// Envio
const opcionesEnvio = document.querySelector('.opciones_envio');
const envioDomicilio = document.querySelector('.envio_domicilio')
let valorEnvio = 0;
let seleccion;
let seleccionDomicilio;

function opcionDomicilio(){
    seleccionDomicilio = envioDomicilio.value;
    return seleccionDomicilio

}

console.log(seleccionDomicilio)
function opcionEnvio(){
	seleccion = opcionesEnvio.options[opcionesEnvio.selectedIndex].value;
		
	if (seleccion == "2"){
        envioDomicilio.style.display="block";
		
	} else{
		envioDomicilio.style.display="none";
    }
}


recuperoLS()


let detalleMiPedido = document.querySelector("#detalle_mi_pedido");

console.log(carritoFinal);

// Muestro los productos seleccionados en carrito_compra.html
if (carritoFinal != undefined){
    for (const detallePedido of carritoFinal) {
        total= (detallePedido.precioPedido * detallePedido.cantidadPedido);
        totalFinal +=total;
        mensaje = `<li> ${detallePedido.productoPedido.toUpperCase()} $${detallePedido.precioPedido}
                    Cantidad: ${detallePedido.cantidadPedido}
                    Total: ${total}</li>`;
        let contenedor = document.createElement("div");
        contenedor.innerHTML = mensaje;
        detalleMiPedido.appendChild(contenedor);
    }
    
    let verTotal = document.querySelector("#ver_total");
    let contenedorTotal = document.createElement("div");
    let totalHtml = `<p> Total: ${totalFinal}`
    contenedorTotal.innerHTML = totalHtml;
    verTotal.appendChild(contenedorTotal);
}








