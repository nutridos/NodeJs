function Mensaje(type, text, donde){
    var form = document.querySelectorAll(donde)[0];
    var message = document.createElement('span');
    message.classList.add('message');
    form.appendChild(message);
    window.setTimeout(function() {
    message.innerHTML = text;
    message.classList.add(type);
    message.classList.add('visible');
    }, 150);

    window.setTimeout(function() {
    message.classList.remove('visible');
    }, 3000);
    window.setTimeout(function() {
    message.remove();
    }, 3000);
}
