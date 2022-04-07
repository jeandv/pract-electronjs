//Objetivo 1
const readLineSync = require('readline-sync');

//Objetivo 3
let productos = {
    "nombre": [],
    "cantidad": [],
    "precio": [],
    "subtotal": [],
};

let p;
let max;
let iva;
let subtotal;
let nombreProd;
let prodRep;
let resp;

//Objetivo 2
let nombreCliente = readLineSync.question('Cual es su nombre? ').toLowerCase();
let rif = readLineSync.question('Cual es su Rif? ').toLowerCase();

let datosProd = () => {
    //Objetivo 3
    do {
        nombreProd = readLineSync.question('Que producto quiere comprar? ').toLowerCase();

        if (productos.nombre.filter(nom => nom === nombreProd).length > 0) {
            console.log('* Error, ese producto ya existe escriba otro diferente *');
            prodRep = true;
        }
        else {
            prodRep = false;
            break;
        }

    } while (prodRep = true);

    let cantidadProd = readLineSync.question('Cuantos quiere comprar? ').toLowerCase();
    let precioProd = Math.round(Math.random() * 100).toFixed(0);

    //Objetivo 3
    productos.nombre.push(nombreProd);
    productos.cantidad.push(parseInt(cantidadProd));
    productos.precio.push(parseInt(precioProd));

    subtotal = cantidadProd * precioProd;
    productos.subtotal.push(parseInt(subtotal));
}

// Objetivo 4
if (process.argv.length > 3) {
    for (let i = 3; i < process.argv.length; i++)
        if (!isNaN(process.argv[i]))
            p = parseInt(process.argv[i]);
        else
            if (process.argv[i].indexOf("--") != -1) {
                let p1 = process.argv[2].split("=");
                let p2 = process.argv[3].split("=");

                if (p1[0].toUpperCase() == '--MAX_PRODUCTOS')
                    max = parseInt(p1[1]);

                if (p2[0].toUpperCase() == '--IVA')
                    iva = parseInt(p2[1]);
            }

    console.log(`El numero maximo de productos es: ${max}`);
    console.log(`El porcentaje del IVA es: ${iva}%
`);
    //Objetivo 2
    for (let i = 0; i < max; i++)
        datosProd();

} else {
    max = 0;
    iva = 16;

    console.log(`Puede decidir cuando no agregar mas productos.`);
    console.log(`El porcentaje del IVA es: ${iva}%
`);
    do {
        datosProd();

        // objetivo 5
        resp = readLineSync.question('- Quiere agregar otro producto? (Si / No) ', {
            trueValue: ['S', 's', 'SI', 'Si', 'si'],
            falseValue: ['N', 'n', 'NO', 'No', 'no']
        });

        if (resp === true) {
            max++
        } else {
            max++
            break;
        }

    } while (resp = true);
}

//Objetivo 5
let sum = (accumulator, curr) => accumulator + curr;
let sumSubtotales = productos.subtotal.reduce(sum);

let ivaMonto = sumSubtotales * (iva * 0.01);
let totalPagar = sumSubtotales + ivaMonto;

console.clear();

console.log('--- Datos cliente ---');
console.log(`
Nombre: ${nombreCliente}`);
console.log(`RIF: ${rif}
`);
console.log('--- Lista productos ---');

for (let i = 0; i < max; i++)
    console.log(`
Nombre del producto: ${productos.nombre[i]}
Cantidad: ${productos.cantidad[i]}
Precio: ${productos.precio[i]} Bs.
Subtotal: ${productos.subtotal[i]} Bs.
`);

console.log('--- Montos ---');
console.log(`
Sumatoria subtotales: ${sumSubtotales} Bs.`);
console.log(`Monto IVA (${iva}%): ${ivaMonto} Bs.`);
console.log(`Total a pagar: ${totalPagar} Bs.
`);