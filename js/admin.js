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
let listaProductos =
  JSON.parse(localStorage.getItem("arrayProductosKey")) || [];

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

console.log(listaProductos);

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
  //codigoUnico() ---> retornar un código único---> codUnico
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
  //mostrar cartel al usuario
  Swal.fire(
    "Producto creado!",
    "Su producto fue creado correctamente",
    "success"
  );
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
    <button class="btn btn-warning" onclick='prepararEdicionProducto("${producto.codigo}")'>Editar</button
    ><button class="btn btn-danger" onclick="borrarProducto('${producto.codigo}')">Eliminar</button>
  </td>
  </tr>`;
}

function cargaInicial() {
  if (listaProductos.length > 0) {
    //crear fila
    listaProductos.map((itemProducto) => crearFila(itemProducto));
    //listaProductos.forEach((itemProducto)=> crearFila(itemProducto))
  }
}

window.prepararEdicionProducto = function (codigo) {
  console.log("desde editar");
  console.log(codigo);
  //buscar el producto en el array de productos
  let productoBuscado = listaProductos.find(
    (itemProducto) => itemProducto.codigo === codigo
  );
  console.log(productoBuscado);
  //mostrar el producto en formulario. No se debe de poder editar el codigo
  campoCodigo.value = productoBuscado.codigo;
  campoProducto.value = productoBuscado.producto;
  campoDescripcion.value = productoBuscado.descripcion;
  campoCantidad.value = productoBuscado.cantidad;
  campoURL.value = productoBuscado.url;

  //modifico la variable bandera productoExistente
  productoExistente = true;
};

function modificarProducto() {
  // console.log('desde modificar');
  //encontrar la posicion del elemento que quiero modificar dentro de mi array de productos
  let indiceProducto = listaProductos.findIndex((itemProducto) => {
    return itemProducto.codigo == campoCodigo.value;
  });
  console.log(indiceProducto);
  //modificar los valores dentro del array
  listaProductos[indiceProducto].producto = campoProducto.value;
  listaProductos[indiceProducto].descripcion = campoDescripcion.value;
  listaProductos[indiceProducto].cantidad = campoCantidad.value;
  listaProductos[indiceProducto].url = campoURL.value;

  //actualizar el localStorage
  guardarLocalStorage();
  //actualizar la tabla
  borrarTabla();
  cargaInicial();
  //mostrar cartel al usuario
  Swal.fire(
    "Producto Modificado!",
    "Su producto fue modificado correctamente",
    "success"
  );
  //limpiar el formulario
  limpiarFormulario();
}

function borrarTabla() {
  let tablaProducto = document.querySelector("#tablaProducto");
  tablaProducto.innerHTML = "";
}

window.borrarProducto = function (codigo) {
  console.log("desde borrar");
  console.log(codigo);
  //opcion1: encontrar la posicion o el indice del elemento en el array y borrarlo
  //1ero: encontrar el indice con findIndex y usar splice(indice, 1)
  //Opcion 2 usando filter
  let nuevaListaProdutos = listaProductos.filter((itemProducto) => {
    return itemProducto.codigo !== codigo;
  });

  console.log(nuevaListaProdutos);
  //actualizar el array original y localStorage
  listaProductos = nuevaListaProdutos;
  guardarLocalStorage();

  //actualizar la tabla
  borrarTabla();
  cargaInicial();

  //mostrar cartel al usuario
  Swal.fire(
    "Producto eliminado!",
    "Su producto fue eliminado correctamente",
    "success"
  );
};
