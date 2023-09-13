import {
  campoRequerido,
  validarNumeros,
  validarURL,
  validarGeneral,
} from "./validaciones.js";
import { Producto } from "./productoClass.js";

//1- traigo los elementos que necesito del html
let campoCodigo = document.getElementById("codigo");
//console.log(campoCodigo);
let campoProducto = document.getElementById("producto");
let campoDescripcion = document.getElementById("descripcion");
let campoCantidad = document.getElementById("cantidad");
let campoURL = document.getElementById("url");
let formProducto = document.getElementById("formProducto");
let btnNuevo = document.querySelector("#btnNuevo");
let btnDatosPrueba = document.querySelector("#btnDatosPrueba");

let productoExistente = false; //variable bandera: si el productoExistente es false quiero crear,si true quiero modificar el producto existente

//Si hay productos en localStorage quiero guardarlo en el array de productos si no que sea un array vacio
let listaProductos =
  JSON.parse(localStorage.getItem("arrayProductosKey")) || [];

console.log(listaProductos);
//2- Asociar un evento a cada elemento obtenido

/* 
const handleFocus = ()=>{
  console.log('desde handleFocus)
}

campoCodigo.addEventListener("focus", handleFocus);
*/

/* campoCodigo.addEventListener("blur", () => {
  console.log('desde código');
});
 */

//3- validaciones

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

btnNuevo.addEventListener("click", limpiarFormulario);
btnDatosPrueba.addEventListener("click", cargarDatosPrueba)

//llamo a carga inicial: si tengo productos en el localStorage, que lo muestre en tabla de productos
cargaInicial();

console.log(listaProductos);

//4- empieza la logica del crud

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
  Swal.fire({
    title: "Seguro que desea modificar este producto?",
    text: "La acción no podrá revertirse!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
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
  });
}

function borrarTabla() {
  let tablaProducto = document.querySelector("#tablaProducto");
  tablaProducto.innerHTML = "";
}

window.borrarProducto = function (codigo) {
  console.log("desde borrar");
  console.log(codigo);
  Swal.fire({
    title: "Seguro que desea eliminar este producto?",
    text: "La acción no podrá revertirse!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
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
    }
  });
};


function cargarDatosPrueba(){
  const datos = [
    {
      codigo: "994",
      producto: "Kakashi Hatake (Anbu)",
      cantidad: "1",
      descripcion:
        "Funko Figura Pop Naruto Shippuden Kakashi Hatake (Anbu) (AAA Anime Exclusive)",
      url: "https://m.media-amazon.com/images/I/51Mkr80aQqL._AC_SL1092_.jpg",
    },
    {
      codigo: "933",
      producto: "Shikamaru Nara",
      cantidad: "1",
      descripcion: "Naruto shippuden",
      url: "https://m.media-amazon.com/images/I/51BitznofnL._AC_SL1300_.jpg",
    },
    {
      codigo: "184",
      producto: "Tobi",
      cantidad: "1",
      descripcion:
        "Figura de Tobi de Naruto Shippuden de la marca FunKo POP Anime",
      url: "https://m.media-amazon.com/images/I/51-H7QOsVES._AC_SL1200_.jpg",
    },
    {
      codigo: "729",
      producto: "Orochimaru",
      cantidad: "1",
      descripcion: "Orochimaru Figura Coleccionable, Multicolor (46628)",
      url: "https://m.media-amazon.com/images/I/610cunP4zOL._AC_SL1200_.jpg",
    },
    {
      codigo: "073",
      producto: "Jiraiya On Toad",
      cantidad: "1",
      descripcion:
        "Jiraiya On Toad Anime Figura De Acción Juguetes 73 Colección Modelo De Personaje Estatua 10 Cm En Caja",
      url: "https://m.media-amazon.com/images/I/61sLJuTZxBS._AC_SL1500_.jpg",
    },
    {
      codigo: "728",
      producto: "Gaara ",
      cantidad: "1",
      descripcion: "Gaara Figura Coleccionable, Multicolor (46627)",
      url: "https://m.media-amazon.com/images/I/616YRHWRZwL._AC_SL1200_.jpg",
    },
    {
      codigo: "182",
      producto: "Kakashi Figure",
      cantidad: "1",
      descripcion:
        'Funko FM-B01M5KD9Y6 Naruto Shippuden 12450"POP Vinyl Kakashi Figure',
      url: "https://m.media-amazon.com/images/I/617XvrkXkEL._AC_SL1360_.jpg",
    },
  ];

 if (!localStorage.getItem("arrayProductosKey")) {
   // quiero agregar los datos de productos
   console.log('cargar datos prueba');
   localStorage.setItem("arrayProductosKey", JSON.stringify(datos));
   listaProductos = datos;
   //mostar en la tabla
   listaProductos.forEach(itemProducto => {
     crearFila(itemProducto);
   })
 }
};
