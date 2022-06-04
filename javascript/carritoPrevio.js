// Declaro variables globales
let costoEnvio =0;
let mensaje;
let opcion = "";
let totalFinal = 0;
let total = 0;
let importeACobrar = 0;
let nuevoPedido;
let ticket = "";
let zona = "";
let idCompra;
let buscarProducto =[];
let totalPrevio = document.querySelector("#total_previo");
let carritoPrevio = document.querySelector("#detalle_mi_carrito");
let totalProductosPrevio = document.querySelector("#total_productos_previo")
let carritoTotal = document.querySelector('.total_carrito')
const carrito = [];
let carritoFinal = [];
let arrayPedido = [];
let cantidad;
const botonCompra = document.querySelectorAll("button[data-id-product]")
let consultaPedido =[];
let botonInfoPrevio;
const carritoPrevioHtml = document.querySelector('#detalle_mi_carrito')
let pagPrin = document.body.id;

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

// Genero el contructor del array pedido
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

// En index.html consulto el LS guardado
if(pagPrin === "pag_principal"){
    if(localStorage.getItem('listaProductos')){
        arrayPedido = JSON.parse(localStorage.getItem("listaProductos"))
        carritoPreliminar();
    }
}

// muestro en index.html el carrito preliminar
function carritoPreliminar() {
    if (arrayPedido != undefined){
        for (const detallePedido of arrayPedido) {
            let contenedor = document.createElement("tr");
            indexBoton = arrayPedido.indexOf(detallePedido)
            total= (detallePedido.precioPedido * detallePedido.cantidadPedido);
            totalFinal +=total;
            mensaje = `<tr>
                        <td>${detallePedido.productoPedido.toUpperCase()}</td>
                        <td class="cantidad_producto" >
                            <button class="btn_suma" data-id="${indexBoton}" onclick="sumaProductoPrevio(this)"><img src="./imagenes/iconos/mas.png" alt="icono suma" width="20" height="20"></button>
                            ${detallePedido.cantidadPedido}
                            <button class="btn_resta" data-id="${indexBoton}" onclick="restaProductoPrevio(this)"><img src="./imagenes/iconos/menos.png" alt="icono menos" width="20" height="20"></button>
                        </td>
                        <td>$${detallePedido.precioPedido}</td>
                        <td>$${detallePedido.precioPedido*detallePedido.cantidadPedido}</td>
                        <button id="${detallePedido.productoPedido}" class="borrar-producto" onclick="eliminarProductoPrevio(this)" data-id="${detallePedido.productoPedido}"><img src="./imagenes/iconos/eliminar.png" alt="icono eliminar" width="20" height="20"></button>
                    </tr>`
            
            contenedor.innerHTML = mensaje;
            carritoPrevio.appendChild(contenedor);
        }
        totalProductosPrevio.innerHTML = `<p>Total  $${totalFinal}</p>
        <a href="./pages/carrito_compra.html"><button class="btn" onclick="guardaPedido()">Ir a mi Carrito</button></a> `;
        carritoTotal.innerHTML = `$${totalFinal}`;
}
}

// Evito objetos duplicados en el array pedido y sumo las cantidades
function consultaArrayPedido (){

    if (arrayPedido == ""){
        cantidadPedido = 1;
        console.log(arrayPedido);
        arrayPedido.push(new detallePedido(productoPedido, cantidadPedido, precioPedido));        
        limpiarPrevioHtml();
        carritoPreliminar();
        return arrayPedido;
    } else if((arrayPedido)) {
        consultaPedido = arrayPedido.find((encontrarProducto) => encontrarProducto.productoPedido == productoPedido);

        if( consultaPedido == undefined){
            cantidadPedido = 1;
            arrayPedido.push(new detallePedido(productoPedido, cantidadPedido, precioPedido));
            limpiarPrevioHtml();
            carritoPreliminar();
            return arrayPedido;
        } else if(consultaPedido != undefined){
            cantidadAcum = consultaPedido.cantidadPedido;
            let buscaIndex = arrayPedido.indexOf(consultaPedido);
            arrayPedido[buscaIndex].cantidadPedido += 1;
            limpiarPrevioHtml();
            carritoPreliminar();
            return arrayPedido;
            }
        return arrayPedido;
        }
        
}

// con cada boton de compra alimento el array de pedidos
botonCompra.forEach(button =>{
        button.addEventListener("click", ()=>{
        idCompra = button.getAttribute('data-id-product');
        buscarProducto = productos.find((buscaProducto) => buscaProducto.id == idCompra);
        productoPedido = buscarProducto.producto;
        precioPedido = buscarProducto.idPrecio;
        consultaArrayPedido()
        return arrayPedido;
    }) 
    return arrayPedido;
})

// funcion borrar del carrito
function limpiarPrevioHtml() {
    while (carritoPrevio.firstChild) {
        carritoPrevio.removeChild(carritoPrevio.firstChild);
        totalFinal = 0;
    }
}

// funcion aplicada al icono eliminar del carrito en index.html
function eliminarProductoPrevio(x){
    const boton = carritoPrevioHtml.querySelectorAll('.borrar-producto[data-id]');
    let id = x.id;
    console.log(id);

    boton.forEach(e =>{
        botonInfoPrevio = e.getAttribute('data-id');
        console.log(botonInfoPrevio);
        if(id == botonInfoPrevio){
            console.log("ok")
            arrayPedido= arrayPedido.filter(detallePedido => detallePedido.productoPedido !== botonInfoPrevio);
            console.log(arrayPedido);
            limpiarPrevioHtml();
            carritoPreliminar();
            return arrayPedido;
        }
        return arrayPedido;
    })
    return arrayPedido;

}

// funcion agrega cantidades, aplicada al boton mas del carrito en index.html
function sumaProductoPrevio(x){
    const botonSuma = carritoPrevioHtml.querySelectorAll('.btn_suma');
    let idBotonSuma = x.getAttribute('data-id');
    console.log(idBotonSuma);
    botonSuma.forEach(e =>{
        let indexBtnSuma = e.getAttribute('data-id');
        if(idBotonSuma == indexBtnSuma ){
            arrayPedido[indexBtnSuma].cantidadPedido += 1
            console.log(e);
            limpiarPrevioHtml();
            carritoPreliminar();
            return arrayPedido;
        }
        return arrayPedido;
    })
    return arrayPedido;
}

// funcion resta cantidades, aplicada al boton menos del carrito en index.html
function restaProductoPrevio(x){
    const botonResta = carritoPrevioHtml.querySelectorAll('.btn_resta');
    let idBotonResta = x.getAttribute('data-id');
    console.log(idBotonResta);
    botonResta.forEach(e =>{
        let indexBtnResta = e.getAttribute('data-id');
        if(idBotonResta == indexBtnResta ){
            if(arrayPedido[indexBtnResta].cantidadPedido>0){
                arrayPedido[indexBtnResta].cantidadPedido -= 1
            } 
            console.log(e);
            limpiarPrevioHtml();
            carritoPreliminar();
            return arrayPedido;
        }
        return arrayPedido;
    })
    return arrayPedido;
};

// funcion aplicada al boton finalizar compra del carrito en index.html, guarda en LS
const guardaPedido = () =>{
    guardoLS();

}

recuperoLS();

