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

let compra = prompt("ingrese el numero de su compra");
let idCompra = "producto"+compra;
if (idCompra == "producto1"){
    precio = producto1.idPrecio;
    cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
    total = precio * cantidad;
    console.log(total);
} else if (idCompra == "producto2"){
    precio = producto2.idPrecio;
    cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
    total = precio * cantidad;
    console.log(total);
} else if (idCompra == "producto3"){
    precio = producto3.idPrecio;
    cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
    total = precio * cantidad;
    console.log(total);
} else if (idCompra == "producto4"){
    precio = producto4.idPrecio;
    cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
    total = precio * cantidad;
    console.log(total);
} else if (idCompra == "producto5"){
    precio = producto5.idPrecio;
    cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
    total = precio * cantidad;
    console.log(total);
} else if (idCompra == "producto6"){
    precio = producto6.idPrecio;
    cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
    total = precio * cantidad;
    console.log(total);
} else if (idCompra == "producto7"){
    precio = producto7.idPrecio;
    cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
    total = precio * cantidad;
    console.log(total);
} else if (idCompra == "producto8"){
    precio = producto8.idPrecio;
    cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
    total = precio * cantidad;
    console.log(total);
} else if (idCompra == "producto9"){
    precio = producto9.idPrecio;
    cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
    total = precio * cantidad;
    console.log(total);
} else if (idCompra == "producto10"){
    precio = producto10.idPrecio;
    cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
    total = precio * cantidad;
    console.log(total);
} else if (idCompra == "producto11"){
    precio = producto11.idPrecio;
    cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
    total = precio * cantidad;
    console.log(total);
} else if (idCompra == "producto12"){
    precio = producto12.idPrecio;
    cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar"));
    total = precio * cantidad;
    console.log(total);
} else {
    alert("No tenemos ese producto")
}
