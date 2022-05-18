// Declaro variables

let costoEnvio = 0;
let opcion = "";
let totalFinal = 0;
let total = 0;
let totalIva = 0;
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

const envio = [
    {idZonaEnvio: 1, precioEnvio: 0, descripcionEnvio: "CABA"},
    {idZonaEnvio: 2, precioEnvio: 400, descripcionEnvio: "Zona Norte"},
    {idZonaEnvio: 3, precioEnvio: 450, descripcionEnvio: "Zona Sur"},
    {idZonaEnvio: 4, precioEnvio: 500, descripcionEnvio: "Zona Oeste"}
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

const guardoLS = () =>{
    localStorage.setItem('listaProductos', JSON.stringify(arrayPedido));
}

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



let mensaje;

recuperoLS()


let detalleMiPedido = document.querySelector("#detalle_mi_pedido")
if (carritoFinal != undefined){
    for (const detallePedido of carritoFinal) {
        
        mensaje = `<li> ${detallePedido.productoPedido.toUpperCase()} $${detallePedido.precioPedido} - Cantidad: ${detallePedido.cantidadPedido}</li>`;
        let contenedor = document.createElement("div")
        contenedor.innerHTML = mensaje;
    
        
        detalleMiPedido.appendChild(contenedor)
    }

}



