window.onload = init;
var headers = {};

function init(){
    if(!localStorage.getItem("token")){
        window.location.href = "login.html"
    }
}


function agregar(){
    var nombre = document.getElementById('nombre').value;
    var apellidos = document.getElementById('apellidos').value;
    var telefono = document.getElementById('telefono').value;
    var correo_electronico = document.getElementById('correo_electronico').value;
    var direccion = document.getElementById('direccion').value;
    if(nombre === '' || apellidos === '' || telefono === '' || correo_electronico === '' || direccion === ''){
        Mensaje("failure", "Por favor llena los campos", "body");
    }else{
        axios({
            method: 'post',
            url: 'http://localhost:3000/empleado',
            headers: {'Authorization': "bearer " + localStorage.getItem("token")},
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