// Função para preencher a tabela com os dados recebidos da API
function preencherTabela(dados) {
    var tabela = document.getElementById('tabela-dados');
  
    for (var i = 0; i < dados.length; i++) {
        var beneficiario = dados[i];
        var row = tabela.insertRow(i + 1); // Inicia a partir da linha 1 para não substituir o cabeçalho
  
        // Preenche as células com os dados do beneficiário
        row.insertCell(0).textContent = beneficiario.id;
        row.insertCell(1).textContent = beneficiario.nome;
        row.insertCell(2).textContent = beneficiario.genero;
        row.insertCell(3).textContent = beneficiario.cpf;
        row.insertCell(4).textContent = beneficiario.dataNascimento;
        row.insertCell(5).textContent = beneficiario.cep;
        row.insertCell(6).textContent = beneficiario.eixoFormacao;
    }
}

function carregarDados() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://casadopao.pythonanywhere.com/consulta');
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

