// Estilo del input de fecha de tarjeta
let cleave = new Cleave('.fecha_tarjeta', {
    date: true,
    delimiter: '-',
    datePattern: ['m', 'Y']
});

// Estilo input numeros de tarjeta
let cleaveNumerosTarjeta = new Cleave('.numeros_tarjeta', {
    creditCard: true,
    onCreditCardTypeChanged: function () {
        blocks = [4, 4, 4, 4]
    }
});


let fecha = '06-2022'
let fechaAño = 2022
function anulaBoton(){confirmarPago.classList.add('disabled')};
function activaBoton(){confirmarPago.classList.remove('disabled')}

// Control fecha de la tarjeta
const controlFecha = () =>{
    let año = parseInt(fechaTarjeta.value.slice(3,7))
    año > fechaAño ? activaBoton() : anulaBoton();
    año <= fechaAño ? (fechaTarjeta.value >= fecha? activaBoton() : anulaBoton()):console.log(año);
}

// Control contraseña tarjeta
const controlPassTarjeta = () =>{
    let numerosPass =  parseInt(passTarjeta.value);
    numerosPass? activaBoton() : anulaBoton();
}
