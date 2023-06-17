// Função para preencher a tabela com os dados recebidos da API
function preencherTabela(dados) {
    var tabela = document.getElementById('tabela-dados');
  
    for (var i = 0; i < dados.length; i++) {
        var beneficiario = dados[i];
        var row = tabela.insertRow(i + 1); // Inicia a partir da linha 1 para não substituir o cabeçalho
  
        // Preenche as células com os dados do beneficiário
        row.insertCell(0).textContent = beneficiario.nome;
        row.insertCell(1).textContent = beneficiario.genero;
        row.insertCell(2).textContent = beneficiario.data_nascimento;
        row.insertCell(3).textContent = beneficiario.cpf;
        row.insertCell(4).textContent = beneficiario.nivel_escolaridade;
        row.insertCell(5).textContent = beneficiario.cep;
    }
}

function carregarDados() {
    var xhr = new XMLHttpRequest();
    // Recupera os valores armazenados no armazenamento local
    var token = localStorage.getItem('token');
    console.log(token)
    xhr.open('GET', 'https://casadopao.pythonanywhere.com/consulta');
    xhr.setRequestHeader('Authorization', token); // Adicione o token de autorização no cabeçalho
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            var dados = JSON.parse(xhr.responseText);
            preencherTabela(dados);
        } else {
            console.error('Erro ao obter os dados da API. Status: ' + xhr.status);
        }
    };

    xhr.send();
}

// Chama a função para carregar os dados ao carregar a página
window.onload = carregarDados;


