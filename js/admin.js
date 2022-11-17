//traigo los elementos que necesito del html
let campoCodigo = document.getElementById('codigo');
console.log(campoCodigo);
let campoProducto = document.getElementById('producto');
let campoDescripcion = document.getElementById('descripcion');
let campoCantidad = document.getElementById('cantidad');
let campoURL = document.getElementById('url');


//validaciones
const campoRequerido = (input)=>{
    console.log('desde campo requerido');
    console.log(input.value);
    if(input.value.trim().length > 0){
      console.log('aqui esta todo bien');
      input.className = 'form-control is-valid'
    } else{
      console.log('aqui muestro el error');
      input.className = 'form-control is-invalid'
    }
}


//Asociar un evento a cada elemento obtenido
 
campoCodigo.addEventListener('blur', ()=>{
    campoRequerido(campoCodigo);
});

campoProducto.addEventListener('blur', ()=>{
    console.log(' desde  producto');
    campoRequerido(campoProducto);
});

campoDescripcion.addEventListener('blur', ()=>{
    console.log(' desde  descripcion');
    campoRequerido(campoDescripcion);
});

campoCantidad.addEventListener('blur', ()=>{
    console.log(' desde  cantidad');
});

campoURL.addEventListener('blur', ()=>{
    console.log(' desde  url');
});
