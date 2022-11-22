import {
  campoRequerido,
  validarNumeros,
  validarURL,
  validarGeneral,
} from "./validaciones.js";

//traigo los elementos que necesito del html
let campoCodigo = document.getElementById("codigo");
console.log(campoCodigo);
let campoProducto = document.getElementById("producto");
let campoDescripcion = document.getElementById("descripcion");
let campoCantidad = document.getElementById("cantidad");
let campoURL = document.getElementById("url");
let formProducto = document.getElementById("formProducto");

//Asociar un evento a cada elemento obtenido

campoCodigo.addEventListener("blur", () => {
    campoRequerido(campoCodigo);
  });
  
  campoProducto.addEventListener("blur", () => {
    console.log(" desde  producto");
    campoRequerido(campoProducto);
  });
  
  campoDescripcion.addEventListener("blur", () => {
    console.log(" desde  descripcion");
    campoRequerido(campoDescripcion);
  });
  
  campoCantidad.addEventListener("blur", () => {
    console.log(" desde  cantidad");
    validarNumeros(campoCantidad);
  });
  
  campoURL.addEventListener("blur", () => {
    console.log(" desde  url");
    validarURL(campoURL);
  });
  
  
  //empieza la logica del crud
  
  const guardarProducto = (e) => {
      //para prevenir la actualizacion de la página
      e.preventDefault();
      //verificar que todos los datos sean validos
      
  if (
    validarGeneral(
        campoCodigo,
        campoProducto,
      campoDescripcion,
      campoCantidad,
      campoURL
      )
      ) {
          console.log("los datos correctos listos para enviar");
        }
    };
    
//Asociar el evento al elemento formulario 
formProducto.addEventListener("submit", guardarProducto);