let cleave = new Cleave('.fecha_tarjeta', {
    date: true,
    datePattern: ['m', 'y']
});

let cleaveNumerosTarjeta = new Cleave('.numeros_tarjeta', {
    creditCard: true,
    onCreditCardTypeChanged: function (type) {
        blocks = [4, 4, 4, 4]
    }
});