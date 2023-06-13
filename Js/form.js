function enviarFormulario() {
    var form = document.getElementById('meuFormulario');
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://casadopao.pythonanywhere.com/login');
    xhr.onload = function () {
        // Manipular a resposta da API aqui
        console.log(xhr.responseText);
    };
    xhr.setRequestHeader('chave', 'teste');
    xhr.send(formData);
}