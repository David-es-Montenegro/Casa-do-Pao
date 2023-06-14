function enviarFormulario() {
    var form = document.getElementById('meuFormulario');
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://casadopao.pythonanywhere.com/login');
    xhr.onload = function () {
        var popup = document.getElementById('popup');
        var closeButton = document.querySelector('.close-button');
        var responseMessage = document.getElementById('responseMessage');

        if (xhr.status === 200) {
            // Código 200 indica uma resposta bem-sucedida
            window.location.href = "/index.html";
        } else if (xhr.status === 401) {
            // Código 401 indica uma resposta de autorização inválida
            responseMessage.textContent = "Erro de autorização. Por favor, faça login novamente.";
            popup.style.display = 'block';
        } else {
            // Outros códigos de status podem ser tratados aqui
            responseMessage.textContent = "Erro desconhecido.";
            popup.style.display = 'block';
        }

        closeButton.addEventListener('click', function () {
            popup.style.display = 'none';
        });
    };
    xhr.setRequestHeader('chave', 'teste');
    xhr.send(formData);
}

function fazerLogout() {
    window.location.href = 'https://casadopao.pythonanywhere.com/logout';
    console.log("teste");
}