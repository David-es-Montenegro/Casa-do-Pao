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
            document.getElementById('codigo').value = response.autorizacao;
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

function redefinirSenha() {
    document.getElementById('password').removeAttribute("readonly");
    document.getElementById('password').setAttribute("type", "text");
    document.getElementById('password').value = '';
    document.getElementById('password').style = "box-shadow: 0 0 15px green;"

    document.getElementById('deletar').value = "Cancelar";
    document.getElementById('deletar').setAttribute("onclick", "window.location.href = 'administrador.html';");
    document.getElementById('deletar').style = "background-color: white; color: black;";

    document.getElementById('redefinir').value = "salvar";
    document.getElementById('redefinir').setAttribute("onclick", "requisitarReset();");
    document.getElementById('redefinir').style = "background-color: green; color: white;"
}

function requisitarReset() {
    senha = document.getElementById('password').value;
    if (senha !== '') {
        var formData = new FormData();
        cpf = localStorage.getItem('cpf')
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        formData.append('cpf', cpf);
        formData.append('senha', senha);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://casadopao.pythonanywhere.com/alterarSenha');
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        console.log(localStorage.getItem('token'));

        // Adicionar o event listener para o evento load
        xhr.addEventListener('load', function () {
            if (xhr.status === 201) {
                alert("Senha alterada com sucesso com sucesso.")
                fazerLogout();
                window.location.href = 'login.html';
            } if (xhr.status === 401) {
                // Erro na requisição
                alert("Erro ao alterar a senha.")
            } if (xhr.status === 409) {
                alert("A sua nova senha não pode ser igual a anterior.");
            }
        });
        xhr.send(formData);
        alert('okay');

    } else {
        alert('A senha não pode ser vazia.')
    }
}

function recuperarSenha() {
    senha = document.getElementById('password').value;
    codigo = document.getElementById('authorization').value;
    if (senha !== '') {
        var formData = new FormData();
        cpf = localStorage.getItem('cpf')
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        formData.append('cpf', cpf);
        formData.append('senha', senha);
        formData.append('autorizacao', codigo)
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://casadopao.pythonanywhere.com/recuperarSenha');
        console.log(localStorage.getItem('token'));

        // Adicionar o event listener para o evento load
        xhr.addEventListener('load', function () {
            if (xhr.status === 201) {
                alert("Senha alterada com sucesso com sucesso.")
                fazerLogout();
                window.location.href = 'login.html';
            } if (xhr.status === 401) {
                // Erro na requisição
                alert("Erro ao alterar a senha.")
            } if (xhr.status === 409) {
                alert("A sua nova senha não pode ser igual a anterior.");
            }
        });
        xhr.send(formData);
        alert('okay');

    } else {
        alert('A senha não pode ser vazia.')
    }
}