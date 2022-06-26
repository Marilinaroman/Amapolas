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

// Genero array de productos desde archivo JSON
const productos = [];
let myInit = {
    method:'GET',
    headers:{
        'content-type':'application/json'
    },
    mode:'cors',
    cache:'default'
};

const URLjson=new Request('./data/productos.json', myInit)

if(pagPrin === "pag_principal"){
    fetch(URLjson)
    .then(function (response) {
            return response.json();
    }).then(function (json) {
        let keys = Object.keys(json);
        keys.forEach(function(key){
            productos.push(json[key]);
        });
        return productos;
    })
}


// Genero el contructor del array pedido
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

// En index.html consulto el LS guardado
if(pagPrin === "pag_principal"){
    localStorage.getItem('listaProductos') && (arrayPedido = JSON.parse(localStorage.getItem("listaProductos")), carritoPreliminar())
}



// muestro en index.html el carrito preliminar
function carritoPreliminar() {
    if (arrayPedido != undefined){
        for (const detallePedido of arrayPedido) {
            const { productoPedido, cantidadPedido, precioPedido} = detallePedido
            let contenedor = document.createElement("tr");
            indexBoton = arrayPedido.indexOf(detallePedido)
            total= (precioPedido * cantidadPedido);
            totalFinal +=total;
            mensaje = `<tr>
                        <td>${productoPedido.toUpperCase()}</td>
                        <td class="cantidad_producto" >
                            <button class="btn_resta" data-id="${indexBoton}" onclick="restaProductoPrevio(this)"><img src="./imagenes/iconos/menos.png" alt="icono menos" width="20" height="20"></button>
                            ${cantidadPedido}
                            <button class="btn_suma" data-id="${indexBoton}" onclick="sumaProductoPrevio(this)"><img src="./imagenes/iconos/mas.png" alt="icono suma" width="20" height="20"></button>
                        </td>
                        <td>$${precioPedido}</td>
                        <td>$${precioPedido*cantidadPedido}</td>
                        <button id="${productoPedido}" class="borrar-producto" onclick="eliminarProductoPrevio(this)" data-id="${productoPedido}"><img src="./imagenes/iconos/eliminar.png" alt="icono eliminar" width="20" height="20"></button>
                    </tr>`
            
            contenedor.innerHTML = mensaje;
            carritoPrevio.appendChild(contenedor);
        }
        totalProductosPrevio.innerHTML = `<p> Total  $${totalFinal}</p>
            <a href="./pages/cuenta.html"><button class="btn" onclick="guardaPedido()">Ir a mi Carrito</button></a>
            <button class="btn" onclick="vaciarCarrito()">Vaciar Carrito</button>`;
        carritoTotal.innerHTML = `$${totalFinal}`;
}
}

// Evito objetos duplicados en el array pedido y sumo las cantidades
function consultaArrayPedido (){

    if (arrayPedido == ""){
        cantidadPedido = 1;
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

//Mensaje de producto agregado
function msj(x){
    x.innerHTML=`<div class="d-flex">
                    <img src="./imagenes/favicon.png" alt="foto muffin mini" height="30" widght="20">
                    <p class="text-uppercase fw-bold" style="color: white">Agregado...</p>
                </div>`
    setTimeout(() => {
        x.innerHTML=`Comprar`;
    }, 1000);
};



// con cada boton de compra alimento el array de pedidos
botonCompra.forEach(button =>{
        button.addEventListener("click", ()=>{
        idCompra = button.getAttribute('data-id-product');
        buscarProducto = productos.find((buscaProducto) => buscaProducto.id == idCompra);
        productoPedido = buscarProducto.producto;
        precioPedido = buscarProducto.idPrecio;
        consultaArrayPedido();
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
    botonSuma.forEach(e =>{
        let indexBtnSuma = e.getAttribute('data-id');
        if(idBotonSuma == indexBtnSuma ){
            arrayPedido[indexBtnSuma].cantidadPedido += 1;
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
    botonResta.forEach(e =>{
        let indexBtnResta = e.getAttribute('data-id');
        if(idBotonResta == indexBtnResta ){
            arrayPedido[indexBtnResta].cantidadPedido>0? (arrayPedido[indexBtnResta].cantidadPedido -= 1) : console.log('es cero');
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

// Funcion aplicada al boton Vaciar Carrito del index.html, vacia LS
const vaciarCarrito = () =>{
    Swal.fire({
        title: 'Estas seguro que deseas vaciar el carrito?',
        showDenyButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No!',
        customClass:{
            confirmButton:'btn',
            denyButton:'btn'
        }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Tu carrito esta vacio!',
                    icon: 'success',
                    iconColor:'#fad8ce',
                    customClass:{
                        confirmButton:'btn_2',
                    }
                })
                localStorage.clear('listaProductos');
                arrayPedido.length = []
                limpiarPrevioHtml();
                carritoPreliminar();
            } 
        })
}



