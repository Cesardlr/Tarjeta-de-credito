const tarjeta = document.querySelector("#tarjeta"),
        btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
        formulario = document.querySelector('#formulario-tarjeta'),
        numeroTarjeta = document.querySelector('#tarjeta .numero'),
        nombreTarjeta = document.querySelector('#tarjeta .nombre'),
        logoMarca = document.querySelector('#logo-marca'),
        firma = document.querySelector('#tarjeta .firma p'),
        mesExpiracion = document.querySelector('#tarjeta #expiracion .mes'),
        yearExpiracion = document.querySelector('#tarjeta #expiracion .year')
        ccv = document.querySelector("#tarjeta .CCV")
        
// VOLTEAMOS LA TARJETA PARA MOSTRAR EL FRENTE
const mostrarFrente = ()=>{
    if (tarjeta.classList.contains('active')) {
        tarjeta.classList.toggle('active');
    }
}

// * ROTACION DE LA TARJETA
tarjeta.addEventListener('click',() => {
    tarjeta.classList.toggle('active');
})

// BOTON DE ABRIR FORMULARIO
btnAbrirFormulario.addEventListener('click',() =>{
    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active')
})

// * SELECT DEL MES GENERADO DINAMICAMENTE
const selectMes = document.querySelector('#selectMes')
for (let i = 0; i <= 12 ;i++) {
    let opcion = document.createElement('option')
    opcion.value = i;  
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion)
}


// * SELECT DEL AÑO GENERADO DINAMICAMENTE
const selectYear = document.querySelector('#selectYear')
const yearActual = new Date().getFullYear();
for (let i=yearActual;i<=yearActual + 8; i++) {
    let opcion = document.createElement('option')
    opcion.value = i;  
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion)
}


// PASANDO LOS TEXTOS DEL FORM A LA TARJETA
formulario.inputNumero.addEventListener('keyup',(e)=>{
    let valorInput = e.target.value;
    formulario.inputNumero.value = valorInput
    // ESTO ELIMINA ESPACIOS EN BLANCO CON LA EXPRESION REGULAR - PUEDES VER MAS EN https://regexr.com/
    .replace(/\s/g,'')
    // ELIMINAR LAS LETRAS
    .replace(/\D/g,'')
    // PONER ESPACIO CADA CUATRO NUMEROS
    .replace(/([0-9]{4})/g,'$1 ')
    // para agregar se uso el de $1

    // este metodo elimina el ultimo espaciado
    .trim();

    numeroTarjeta.textContent = valorInput;

    if (valorInput == '') {
        numeroTarjeta.textContent = '#### #### #### ####'

        logoMarca.innerHTML = '';
    }

    if (valorInput[0] == 4) { 
        logoMarca.innerHTML = ''
        const imagen = document.createElement('img')
        imagen.src = 'img/logos/visa.png';
        logoMarca.appendChild(imagen)
    }else if (valorInput[0] == 5) {
        logoMarca.innerHTML = ''
        const imagen = document.createElement('img')
        imagen.src = 'img/logos/mastercard.png';
        logoMarca.appendChild(imagen)
    }

    // Se voltea la tarjeta para que el usuario vea el frente
    mostrarFrente();
})

// INPUT NOMBRE DE TARJETA
formulario.inputNombre.addEventListener('keyup',(e) =>{
    let valorInput = e.target.value;

    // quitando los numeros
    formulario.inputNombre.value = valorInput.replace(/[0-9]/g,'');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if (valorInput = '') {
        nombreTarjeta.textContent = 'JEFF BEZOS'
    }

    mostrarFrente();
})

// SELECT MES
formulario.selectMes.addEventListener('change',(e) =>{
mesExpiracion.textContent = e.target.value
mostrarFrente();
})

formulario.selectYear.addEventListener('change',(e) =>{
yearExpiracion.textContent = e.target.value.slice(2)
mostrarFrente();
})

// CCV
formulario.inputCCV.addEventListener('keyup',() =>{
    if (!tarjeta.classList.contains('active')) {
        tarjeta.classList.toggle('active')
    }

    formulario.inputCCV.value = formulario.inputCCV.value
    // ESTO ELIMINA ESPACIOS EN BLANCO CON LA EXPRESION REGULAR - PUEDES VER MAS EN https://regexr.com/
    .replace(/\s/g,'')
    // ELIMINAR LAS LETRAS
    .replace(/\D/g,'');

    ccv.textContent = formulario.inputCCV.value;
})