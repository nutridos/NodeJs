window.onload = init;
var headers = {};
var url = "http://localhost:3000";
var id_modificar = localStorage.getItem("id_modificar");

function init(){
    if(localStorage.getItem("token") && localStorage.getItem("id_modificar")){
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadEmpleado(localStorage.getItem("id_modificar"));
    }else{
        window.location.href = "lista.html"
    }
    localStorage.removeItem("id_modificar");
}


function loadEmpleado(id) {
    axios.get(url + "/empleado", headers)
    .then(function(res){
        var empleados = res.data.message.filter(b => {
            return b.id_empleado ===  parseInt(id);
        });
        console.log(empleados);
        displayEmpleado(empleados[0]);
    }).catch(function(err){
        console.log(err);
    })
}

function displayEmpleado(empleado){
    document.getElementById('nombre').value = empleado.nombre;
    document.getElementById('apellidos').value = empleado.apellidos;
    document.getElementById('telefono').value = empleado.telefono;
    document.getElementById('correo_electronico').value = empleado.correo_electronico;
    document.getElementById('direccion').value = empleado.direccion;
}

function modificar(){
    var nombre = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellidos').value;
    var telefono = document.getElementById('telefono').value;
    var correo_electronico = document.getElementById('correo_electronico').value;
    var direccion = document.getElementById('direccion').value;

    if(nombre === '' || apellidos === '' || telefono === '' || correo_electronico === '' || direccion === ''){
        Mensaje("failure", "Por favor llena los campos", "body");
    }else{

        axios({
            method: 'put',
            url: 'http://localhost:3000/empleado/'+id_modificar,
            headers: headers.headers,
            data:{
                nombre: nombre,
                apellidos: apellidos,
                telefono: telefono,
                correo_electronico: correo_electronico,
                direccion: direccion
            }
        }).then(function(res){
            Mensaje("success", res.data.message, "body");
            console.log(res.data.message);       
        }).catch(function(error){
            Mensaje("failure", "Algo Salio Mal", "body");
            console.log(error)
        });
    }
}