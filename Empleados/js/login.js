window.onload = init;

function init() {
    document.querySelector('.btn-primary').addEventListener('click', login);
}

function login(){
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    if(mail === '' || pass === ''){
        Mensaje("failure", "Por favor completa los campos", "body");
    }else{
        axios({
            method: 'post',
            url: 'http://localhost:3000/user/login',
            data:{
                correo_electronico: mail,
                contrasena: pass
            }
        }).then(function(res){
            localStorage.setItem("token", res.data.message);
            window.location.href = "lista.html";
        }).catch(function(error){
            Mensaje("failure", "Usuario y/o contrasena incorrectos", "body");
            console.log(error)
        });
    }
}