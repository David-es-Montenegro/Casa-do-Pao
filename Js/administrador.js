document.addEventListener('DOMContentLoaded', function () {
    console.log(localStorage.getItem('token'));
    dadosADM(); // Chama sua função quando a página estiver totalmente carregada.
});

function dadosADM() {
    var formData = new FormData();
    formData.append('cpf', localStorage.getItem('cpf'));
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://casadopao.pythonanywhere.com/dadosADM');
    var token = localStorage.getItem('token');
    xhr.setRequestHeader('Authorization', token);

    // Adicionar o event listener para o evento load
    xhr.addEventListener('load', function () {
        if (xhr.status === 201) {
            var response = JSON.parse(xhr.responseText);
            document.getElementById('name').value = response.nome;
            document.getElementById('cpf').value = response.cpf;
        } if (xhr.status === 401) {
            // Erro na requisição
            alert("Faça login para visualizar os seus dados.")
        }
    });
    xhr.send(formData);
}

function deletarConta() {
    resposta = prompt("Para deletar está conta, digite: " + document.getElementById('name').value);
    if (resposta === document.getElementById('name').value) {
        var formData = new FormData();
        cpf = localStorage.getItem('cpf')
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        formData.append('cpf', cpf);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://casadopao.pythonanywhere.com/deletarADM');
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        console.log(localStorage.getItem('token'));

        // Adicionar o event listener para o evento load
        xhr.addEventListener('load', function () {
            if (xhr.status === 201) {
                alert("Conta deletada com sucesso.")
                fazerLogout();
                window.location.href = 'login.html';
            } if (xhr.status === 401) {
                // Erro na requisição
                alert("Faça login para visualizar os seus dados.")
            }
        });
        xhr.send(formData);
        alert('okay');

    } else {
        alert('Digitação incorreta, a conta não foi removida da base de dados.')
    }
}
