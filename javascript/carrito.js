//carrito

class producto{
    constructor (idProducto,idDescripcion,idPrecio){
	this.idProducto = idProducto;
	this.idPrecio = idPrecio;
	this.idDescripcion = idDescripcion;
    }
}

const producto1 = new producto("1","banana split por unidad",100);
const producto2 = new producto("2","lemon pie por unidad",110);
const producto3 = new producto("3","trufas por unidad",100);
const producto4 = new producto("4","mini brownie por unidad",120);
const producto5 = new producto("5","mini tarta del bosque por unidad",140);
const producto6 = new producto("6","mini tiramisu por unidad",140);
const producto7 = new producto("7","cheescake",1000);
const producto8 = new producto("8","chocotorta",1080);
const producto9 = new producto("9","lemon pie",1200);
const producto10 = new producto("10","torta frutal",1500);
const producto11 = new producto("11","tiramisu",2000);
const producto12 = new producto("12","torta tradicional",2000);

class envio{
    constructor (idZonaEnvio,idPrecioEnvio,idDescripcionEnvio){
	this.idZonaEnvio = idZonaEnvio;
	this.idPrecioEnvio = idPrecioEnvio;
    this.idDescripcionEnvio = idDescripcionEnvio;
    }
};

const zonaUno = new envio(1,0,"CABA");
const zonaDos = new envio(2,400,"Norte");
const zonaTres = new envio(3,450,"Sur");
const zonaCuatro = new envio(4,500,"Oeste");

let costoEnvio = 0;
let opcion = "";
let totalFinal= 0;
let total = 0;
let totalIva = 0;
let importeACobrar = 0;
let codigoDescuento = "";


    function pedido (){
        let compra = prompt("ingrese el codigo del producto que desea comprar");
        let idCompra = "producto"+compra;
        if (idCompra == "producto1"){
            precio = producto1.idPrecio;
            cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
            total = precio * cantidad;
        } else if (idCompra == "producto2"){
            precio = producto2.idPrecio;
            cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
            total = precio * cantidad;
        } else if (idCompra == "producto3"){
            precio = producto3.idPrecio;
            cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
            total = precio * cantidad;
        } else if (idCompra == "producto4"){
            precio = producto4.idPrecio;
            cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
            total = precio * cantidad;
        } else if (idCompra == "producto5"){
            precio = producto5.idPrecio;
            cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
            total = precio * cantidad;
        } else if (idCompra == "producto6"){
            precio = producto6.idPrecio;
            cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
            total = precio * cantidad;
        } else if (idCompra == "producto7"){
            precio = producto7.idPrecio;
            cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
            total = precio * cantidad;
        } else if (idCompra == "producto8"){
            precio = producto8.idPrecio;
            cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
            total = precio * cantidad;
        } else if (idCompra == "producto9"){
            precio = producto9.idPrecio;
            cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
            total = precio * cantidad;
        } else if (idCompra == "producto10"){
            precio = producto10.idPrecio;
            cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
            total = precio * cantidad;
        } else if (idCompra == "producto11"){
            precio = producto11.idPrecio;
            cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
            total = precio * cantidad;
        } else if (idCompra == "producto12"){
            precio = producto12.idPrecio;
            cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
            total = precio * cantidad;
        } else {
            alert("No tenemos ese producto")
        }
    }
    

    function calculoEnvio() {
        opcion = parseInt(prompt("Seleccione una opcion: "+
            "\n1- Retiro en Tienda" +
            "\n2- Envio a domicilio"));
            let zona = "";
        if (opcion==1){
            costoEnvio = 0;
        } else if (opcion == 2){
            let zonaEnvio = parseInt(prompt("Ingrese la zona de envio: "+
            "\n1- CABA" +
            "\n2- Zona Norte" +
            "\n3- Zona Sur" +
            "\n4- Zona Oeste"));
            if ( zonaEnvio == 1){
                costoEnvio = costoEnvio + zonaUno.idPrecioEnvio;
                zona = zonaUno["idDescripcionEnvio"];
                alert("El costo de envio a Zona " + zona + " es de $" + zonaUno.idPrecioEnvio)
            } else if ( zonaEnvio == 2){
                costoEnvio = costoEnvio + zonaDos.idPrecioEnvio;
                zona = zonaDos["idDescripcionEnvio"]
                alert("El costo de envio a Zona " + zona + " es de $" + zonaDos.idPrecioEnvio)
            } else if ( zonaEnvio == 3){
                costoEnvio = costoEnvio + zonaTres.idPrecioEnvio;
                zona = zonaTres["idDescripcionEnvio"]
                alert("El costo de envio a Zona " + zona + " es de $" + zonaTres.idPrecioEnvio)
                } else if (zonaEnvio == 4){
                costoEnvio = costoEnvio + zonaCuatro.idPrecioEnvio;
                zona = zonaCuatro["idDescripcionEnvio"]
                alert("El costo de envio a Zona " + zona + " es de $" + zonaCuatro.idPrecioEnvio)
                } else {
                alert("La zona ingresada no es valida");
                }
            }   else {
                alert("La opcion ingresada no es valida");
            } return costoEnvio;
    };
    function descuento(){
        codigoDescuento = prompt("Ingrese su codigo de descuento");
        if (codigoDescuento.toUpperCase() == "AMAPOLASOFF"){
            porcentajeDescuento = 0.20;
            alert ("Se aplico el descuento")
        } else {
            porcentajeDescuento = 0;
            alert ("El codigo ingresado no es valido");
        }
    }
    
function hacerPedido(){
    
    let continuarComprando = "";
    let iva = 0;
    do{
        pedido();
        continuarComprando = prompt("desea continuar comprando? si/no");
        totalFinal = total + totalFinal;
        iva = totalFinal * 0.21;
        totalIva = totalFinal + iva;
        console.log(totalIva);
        
    } while (continuarComprando.toUpperCase() == "SI");
    
    alert( "El total de su pedido más IVA es de $" + totalIva);
    
    if ( totalIva != 0){
        calculoEnvio();
        descuento();
    
        importeACobrar = totalIva - (totalIva * porcentajeDescuento) + costoEnvio;
        
        alert("El importe a abonar es: " + importeACobrar)

    }
}
