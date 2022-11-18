//traigo los elementos que necesito del html
let campoCodigo = document.getElementById("codigo");
console.log(campoCodigo);
let campoProducto = document.getElementById("producto");
let campoDescripcion = document.getElementById("descripcion");
let campoCantidad = document.getElementById("cantidad");
let campoURL = document.getElementById("url");
let formProducto = document.getElementById("formProducto");

//validaciones
const campoRequerido = (input) => {
  console.log("desde campo requerido");
  console.log(input.value);
  if (input.value.trim().length > 0) {
    console.log("aqui esta todo bien");
    input.className = "form-control is-valid";
    return true;
  } else {
    console.log("aqui muestro el error");
    input.className = "form-control is-invalid";
    return false;
  }
};

const validarNumeros = (input) => {
  //vamos a crear una expresion regular
  let patron = /^[0-9]{1,3}$/;
  //el método test compara un string con el patron y devuelve true o false si hay match p no
  //regex.test(string a validar)
  if (patron.test(input.value)) {
    //cumpla con la expresion regular
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

const validarURL = (input) => {
  let patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (patron.test(input.value)) {
    //cumpla con la expresion regular
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
};

const validarGeneral = (
  campoCodigo,
  campoProducto,
  campoDescripcion,
  campoCantidad,
  campoURL
) => {
  let alerta = document.querySelector("#msjAlerta");
  //comprobar que pasen cada una de las validaciones y si no pasan mostrar el alert
  if (
    campoRequerido(campoCodigo) &&
    campoRequerido(campoProducto) &&
    campoRequerido(campoDescripcion) &&
    validarNumeros(campoCantidad) &&
    validarURL(campoURL)
  ) {
    console.log(
      "validación correcta todos los datos están listos para ser enviados"
    );
    alerta.className = "alert alert-danger my-3 d-none";
    return true;
  } else {
    console.log("validación incorrecta, datos erroneos");
    alerta.className = "alert alert-danger my-3";
    return false;
  }
};

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
    console.log('los datos correctos listos para enviar');
  }
};

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
