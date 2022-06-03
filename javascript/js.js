var palabras = ["HTML","PYTHON","JAVA"];
var indice = 0;
var aux = [];
var contarError = 0;
var letraErrada = [];
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d"); 

function limpiar(){
    document.getElementById("correcto").innerHTML="";
    var info = document.getElementById('letrasErradas');
    info.value = '';
    contarError = 0;
    letraErrada = [];
    aux = [];
    var resultado = document.querySelector('#resultado');
    resultado.value = '';
    pincel.clearRect(0,0,650,450);
}

function bloquear(nobloquear, bloquear1, bloquear2){
    document.getElementById(bloquear1).style.display = 'none';
    document.getElementById(bloquear2).style.display = 'none';
    document.getElementById(nobloquear).style.display = 'block';
}

function cancelar(){
    limpiar();
    bloquear('pagina-principal','pagina-juego','pagina-palabra');
}

function cancelarNuevaPalabra(){
    var resultado = document.querySelector('#ingresar-palabra');
    resultado.value = '';
    bloquear('pagina-principal','pagina-juego','pagina-palabra');
}

function ingresarPalabra(){
    bloquear('pagina-palabra','pagina-juego','pagina-principal');
    document.querySelector('#ingresar-palabra').focus();
}

function iniciar(){
    error(contarError);
    var letra = document.getElementById('correcto');
    indice = Math.floor(Math.random()*palabras.length);
    for(var i=0;i<palabras[indice].length;i++){
        var div1 = document.createElement("div");
        div1.className = "div1";
        letra.appendChild(div1)
        var h1 = document.createElement("h1");
        h1.className = "base-letras";
        h1.setAttribute("id",i);
        h1.innerHTML = palabras[indice][i];
        div1.appendChild(h1);
    }
}

function circulo(x,y,radio){
    pincel.lineWidth = 5;
    pincel.strokeStyle = "#0A3871";
    pincel.beginPath();
    pincel.arc(x,y,radio,0,2*Math.PI);
    pincel.stroke();
}
function dibujar(x1,y1,x2,y2){
    pincel.lineWidth = 5;
    pincel.strokeStyle = "#0A3871";
    pincel.beginPath();
    pincel.moveTo(x1,y1);
    pincel.lineTo(x2,y2);
    pincel.stroke();
}

function error(x){
    switch(x){
        case 0: dibujar(150,450,500,450);
                break;
        case 1: dibujar(200,47.8,200,450);
                break;
        case 2: dibujar(200,50,402.5,50);
                break;
        case 3: dibujar(400,50,400,130);
                break;
        case 4: circulo(400,170,40);
                break;
        case 5: dibujar(400,210,400,300);
                break;
        case 6: dibujar(400,298,360,350);
                break;
        case 7: dibujar(400,298,440,350);
                break;
        case 8: dibujar(400,245,360,285);
                break;
        case 9: dibujar(400,245,440,285);
    }
}

function jugar(){
    bloquear('pagina-juego','pagina-principal','pagina-palabra');
    limpiar();
    iniciar();
    document.onkeyup = function(event){
        var charCode = event.keyCode;
        if((charCode>64 && charCode<91) || charCode==192){
            var elCaracter = event.key.toUpperCase();
            if(!aux.includes(elCaracter) && !letraErrada.includes(elCaracter) && contarError<9 && aux.length < palabras[indice].length){
                var encontrado = false;
                if(contarError < 9){
                    var i1 = -1;
                    while(palabras[indice].indexOf(elCaracter,i1+1)>=0){
                        i1 = palabras[indice].indexOf(elCaracter,i1+1);
                        document.getElementById(i1.toString()).style.visibility = 'visible';
                        encontrado = true;
                        aux.push(palabras[indice][i1]);
                    }    
                    if(aux.length == palabras[indice].length){
                        var resultado = document.querySelector('#resultado');
                        resultado.style.color = 'green';
                        resultado.value = "Ganaste, Felicitades!";
                    }
                }
                if(!encontrado){
                    error(++contarError);
                    var info = document.getElementById('letrasErradas');
                    info.value += "\t"+elCaracter;
                    letraErrada.push(elCaracter);                    
                    if(contarError == 9){
                        var resultado = document.querySelector('#resultado')
                        resultado.style.color = 'red';
                        resultado.value = "Fin del juego";
                    }
                }
            }
        }
    }
}

var texto = document.getElementById('ingresar-palabra');
texto.oninput = function(){
    let validos = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    let text = "";
    for (let i of texto.value.toUpperCase()) {
        text += validos.includes(i) ? i : "";
    }
    texto.value = text;
}

function agregar(){
    var texto = document.getElementById('ingresar-palabra');
    palabras.push(texto.value.toUpperCase());
    cancelarNuevaPalabra();
    jugar();
}
