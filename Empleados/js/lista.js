window.onload = init;
var headers = {};
var url = "http://localhost:3000";
var empleados = null;
function init(){
    if(localStorage.getItem("token")){
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadEmpleado();
    }else{
        window.location.href = "login.html"
    }
}

function loadEmpleado() {
    axios.get(url + "/empleado", headers)
    .then(function(res){
        console.log(res);
        empleados = res.data.message;
        displayEmpleado(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayEmpleado(empleado){
    var table = document.querySelector("div.tabla");
    if(empleado.length === 0){
        table.innerHTML = "No hay Empleados";
    }else{
        var table_html = `<table class='tabla_empleados'>`;
        for (let i = 0; i < empleado.length; i++) {
            table_html += `<tr>
                    <td>${empleado[i].nombre}</td> 
                    <td>${empleado[i].apellidos}</td> 
                    <td>${empleado[i].telefono}</td> 
                    <td>${empleado[i].correo_electronico}</td> 
                    <td>${empleado[i].direccion}</td>
                    <td onclick="modificar(${empleado[i].id_empleado})"><img src="../css/modificar.png"></td>
                    <td onclick="eliminar(${empleado[i].id_empleado})"><img src="../css/eliminar.png"></td>
                </tr> 
            `;
        }
        table.innerHTML = table_html + "</table>";
    }
}

function buscar(busqueda){ 
    if(busqueda === ''){ 
        displayEmpleado(empleados);
    }else{
        var resultado = empleados.filter(b => {
            return `${b.nombre} ${b.apellidos} ${b.telefono} ${b.correo_electronico} ${b.direccion}`.toLowerCase().includes(busqueda.toLowerCase());
        });
        displayEmpleado(resultado);
    }
}

function modificar(id){
    localStorage.setItem('id_modificar', id);
    window.location.href = "modificar_empleado.html";
}

function eliminar(id){
    axios({
        method: 'delete',
        url: 'http://localhost:3000/empleado/'+id,
        headers: headers.headers
    }).then(function(res){
        Mensaje("success", res.data.message, "body");
        loadEmpleado();
    }).catch(function(error){
        Mensaje("failure", "Algo Salio Mal", "body");
        console.log(error)
    });
}

function agregar(){
    window.location.href = "agregar_empleado.html";
}

function cerrar_sesion(){
    localStorage.removeItem("token");
    window.location.href = "login.html";
}