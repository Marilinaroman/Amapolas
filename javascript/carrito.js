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

const arrayPedido = [];

class detallePedido {
    constructor(productoPedido, cantidadPedido, precioPedido) {
        this.productoPedido = productoPedido;
        this.precioPedido = precioPedido;
        this.cantidadPedido = cantidadPedido;
    };
};

const pedido = () => {
    let idCompra = parseInt(prompt("ingrese el codigo del producto que desea comprar"));
    let buscarProducto = productos.find((buscaProducto) => buscaProducto.id === idCompra);

    if (buscarProducto != undefined) {
        let precio = buscarProducto.idPrecio;
        cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
        
        if (isNaN(cantidad)){
        return cantidad = 0;
        };

        productoPedido = buscarProducto.producto;
        cantidadPedido = cantidad;
        precioPedido = precio;

        nuevoPedido = arrayPedido.push(new detallePedido(productoPedido, cantidadPedido, precioPedido));

    } else {
        alert("No tenemos ese producto");
        total = 0;
    }
}

const calculoEnvio  = () => {
    opcion = parseInt(prompt("Seleccione una opcion: " +
        "\n1- Retiro en Tienda" +
        "\n2- Envio a domicilio"));
    
    if (opcion == 1) {
        costoEnvio = 0;
        zona = "Retiro en tienda";
    } else if (opcion == 2) {
        let zonaEnvio = parseInt(prompt("Ingrese la zona de envio: " +
        "\n1- CABA" +
        "\n2- Zona Norte" +
        "\n3- Zona Sur" +
        "\n4- Zona Oeste"));
        let buscarZona = envio.find((buscaEnvio) => buscaEnvio.idZonaEnvio === zonaEnvio);
        if (buscarZona != undefined) {
            costoEnvio = buscarZona.precioEnvio;
            zona = buscarZona.descripcionEnvio;
            alert("El costo de envio a " + zona + " es de $" + buscarZona.precioEnvio);
        } else {
            alert("La opcion ingresada no es valida");
        } return costoEnvio;
    };
}

const descuento = () => {
    codigoDescuento = prompt("Ingrese su codigo de descuento");
    if (codigoDescuento.toUpperCase() == "AMAPOLASOFF") {
        porcentajeDescuento = 0.20;
        mensajeDescuento = "Se aplico el descuento del 20% sobre la compra";
        alert(mensajeDescuento);
    } else {
        porcentajeDescuento = 0;
        mensajeDescuento = "";
        alert("El codigo ingresado no es valido");
    }
}

const hacerPedido = () => {

    let continuarComprando = "";
    do {
        pedido();
        continuarComprando = prompt("desea continuar comprando? si/no");
    } while (continuarComprando.toUpperCase() == "SI");

    arrayPedido.forEach(detallePedido=> {
        total= (detallePedido.precioPedido * detallePedido.cantidadPedido)*1.21;
        totalIva += total;
    });

    alert(`El total de su pedido más IVA es de $${totalIva}`);

    if (totalIva != 0) {
        calculoEnvio();
        descuento();

        importeACobrar = totalIva - (totalIva * porcentajeDescuento) + costoEnvio;

        arrayPedido.forEach(detallePedido=> {
            mensaje= `Producto: ${detallePedido.productoPedido} - Precio: $${detallePedido.precioPedido} - Cantidad: ${detallePedido.cantidadPedido}`
            ticket += mensaje + "\n";
        });

        alert(`Detalle del pedido realizado: \n${ticket} \nTotal de su pedido más IVA es de $${totalIva}\n${mensajeDescuento}\nEnvio: ${zona} $${costoEnvio}\nEl importe total a abonar es de $${importeACobrar}`);
        
    }
    
}