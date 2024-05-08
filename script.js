let registro = document.getElementById("registro");
let iniciar_sesion = document.getElementById("iniciar_sesion");
let nombreInput = document.getElementById("nombreInput");
let telefonoInput = document.getElementById("telefonoInput");
let direccionInput = document.getElementById("direccionInput");
let title = document.getElementById("title");
let tipoFormulario = "R"

registro.onclick = function () {
    console.log("mensaje")
    nombreInput.style.maxHeight = "60px";
    telefonoInput.style.maxHeight = "60px";
    direccionInput.style.maxHeight = "60px";
    title.innerHTML = "Registro";
    iniciar_sesion.classList.add("desactivar");
    registro.classList.remove("desactivar");
    olviContrasena.classList.add("not-display")
    tipoFormulario = "R"
    limpiar()

}

iniciar_sesion.onclick = function () {
    console.log("error")
    nombreInput.style.maxHeight = "0px";
    telefonoInput.style.maxHeight = "0";
    direccionInput.style.maxHeight = "0";
    title.innerHTML = "Login";
    iniciar_sesion.classList.remove("desactivar");
    registro.classList.add("desactivar");
    olviContrasena.classList.remove("not-display")
    tipoFormulario = "L"
    limpiar()
}
function limpiar() {
    nombre.value = "";
    telefono.value = "";
    correo.value = "";
    contraseña.value = "";
    direccion.value = "";
}

function registrarCliente() {
    var nombre = document.getElementById("nombre");
    var telefono = document.getElementById("telefono");
    var correo = document.getElementById("correo");
    var contraseña = document.getElementById("contraseña");
    var direccion = document.getElementById("direccion");
    console.log("Aquì se deben enviar los datos al servicio");
    peticion = {
        method: "POST",
        body: JSON.stringify({
            "nombre": nombre.value,
            "telefono": telefono.value,
            "correo": correo.value,
            "contraseña": contraseña.value,
            "direccion": direccion.value,
        }),
        headers: {
            "content-Type": "application/json"
        }
    }
    fetch("http://127.0.0.1:5000/cliente", peticion)
        .then(respuesta => {
            console.log("Respusta")
            console.log(respuesta.status)
            if (respuesta.status === 201) {
                limpiar();
                alert("usuario creado");
                return
            }
            if (respuesta.status == 400) {
                limpiar();
                alert("El usuario ya existe")
                return
            }
            throw new Error("Error consumiendo el servicio")
        }).catch(error => {
            alert("error creando el cliente, verifique sus datos")
            console.log("error catch", error)
        });
}
function loginCliente() {
    var correo = document.getElementById("correo");
    var contraseña = document.getElementById("contraseña");
    console.log("Aquì se deben enviar los datos al servicio");
    peticion = {
        method: "POST",
        body: JSON.stringify({
            "correo": correo.value,
            "contraseña": contraseña.value,
        }),
        headers: {
            "content-Type": "application/json"
        }
    }
    fetch("http://127.0.0.1:5000/cliente/login", peticion)
        .then(respuesta => {
            console.log("Respusta")
            console.log(respuesta.status)
            if (respuesta.status === 200) {
                correo.value = "";
                contraseña.value = "";
                alert("Ingreso exitoso");
                return
            }
            throw new Error("Error consumiendo el servicio")
        }).catch(error => {
            alert("error: verifique sus datos")
            console.log("error catch", error)
        });
}


enviarId.onclick = function () {
    if (tipoFormulario == "R") {
        registrarCliente()
    } else if (tipoFormulario == "L") {
        loginCliente()
    } else {
        alert("formulario no soportado")
    }
}






