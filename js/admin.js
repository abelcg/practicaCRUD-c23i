import {
  campoRequerido,
  validarNumeros,
  validarURL,
  validarGeneral,
} from "./validaciones.js";
import { Producto } from "./productoClass.js";

//traigo los elementos que necesito del html
let campoCodigo = document.getElementById("codigo");
//console.log(campoCodigo);
let campoProducto = document.getElementById("producto");
let campoDescripcion = document.getElementById("descripcion");
let campoCantidad = document.getElementById("cantidad");
let campoURL = document.getElementById("url");
let formProducto = document.getElementById("formProducto");

let productoExistente = false; //variable bandera: si el productoExistente es false quiero crear,si true quiero modificar el producto existente

//Si hay productos en localStorage quiero guardarlo en el array de productos si no que sea un array vacio
let listaProductos = JSON.parse(localStorage.getItem("arrayProductosKey")) || [];

console.log(listaProductos);
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
formProducto.addEventListener("submit", guardarProducto);


//llamo a carga inicial: si tengo productos en el localStorage, que lo muestre en tabla de productos
cargaInicial();

//empieza la logica del crud

function guardarProducto(e) {
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
    //console.log("los datos correctos listos para enviar");
    if (productoExistente === false) {
      //crear producto
      crearProducto();
    } else {
      //modificar porducto
      modificarProducto();
    }
  }
}

function crearProducto() {
  //crear un objeto producto
  let productoNuevo = new Producto(
    campoCodigo.value,
    campoProducto.value,
    campoDescripcion.value,
    campoCantidad.value,
    campoURL.value
  );
  console.log(productoNuevo);
  //guardar cada objeto (producto) en una array de productos
  listaProductos.push(productoNuevo);
  console.log(listaProductos);
  //limpiar formulario
  limpiarFormulario();
  //Guardar el array de productos dentro de localStorage
  guardarLocalStorage();
  //cargar el producto en la tabla
  crearFila(productoNuevo);
}

function limpiarFormulario() {
  //limpiamos los value del formulario
  formProducto.reset();
  //resetear las clases de los input
  campoCodigo.className = "form-control";
  campoProducto.className = "form-control";
  campoDescripcion.className = "form-control";
  campoCantidad.className = "form-control";
  campoURL.className = "form-control";
  //resetear la variable bandera o booleana para el caso de modificarProdcuto
  productoExistente = false;
}

function guardarLocalStorage() {
  localStorage.setItem("arrayProductosKey", JSON.stringify(listaProductos));
}

function crearFila(producto) {
  let tablaProducto = document.querySelector("#tablaProducto");
  //la asignación es con el operador de asignación de adición para concatenar con lo que ya tengo
  tablaProducto.innerHTML += `<tr>
  <td>${producto.codigo}</td>
  <td>${producto.producto}</td>
  <td>${producto.descripcion}</td>
  <td>${producto.cantidad}</td>
  <td>${producto.url}</td>
  <td>
    <button class="btn btn-warning" onclick='prepararEdicionProducto()'>Editar</button
    ><button class="btn btn-danger" onclick='borrarProducto()'>Eliminar</button>
  </td>
  </tr>`;
}


function cargaInicial() {
    if(listaProductos.length > 0) {
        //crear fila
        listaProductos.map((itemProducto)=> crearFila(itemProducto))
    }
}
