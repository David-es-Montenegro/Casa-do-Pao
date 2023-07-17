// Função para preencher a tabela com os dados recebidos da API
function preencherTabela(dados) {
  var tabela = document.getElementById('tabela-dados');

  // Limpa todas as linhas da tabela (exceto a primeira que contém o cabeçalho)
  while (tabela.rows.length > 1) {
    tabela.deleteRow(1);
  }

  for (var i = 0; i < dados.length; i++) {
    var beneficiario = dados[i];
    var row = tabela.insertRow(i + 1); // Inicia a partir da linha 1 para não substituir o cabeçalho

    // Preenche as células com os dados do beneficiário
    row.insertCell(0).textContent = beneficiario.nome;
    row.insertCell(1).textContent = beneficiario.genero;
    row.insertCell(2).textContent = beneficiario.data_nascimento;
    row.insertCell(3).textContent = beneficiario.cpf;
    row.insertCell(4).textContent = beneficiario.nivel_escolaridade;
    row.insertCell(5).textContent = beneficiario.observacao;

    // Adiciona o evento de clique à linha
    (function (benef) {
      row.addEventListener('click', function () {
        // Armazena o nome e a data de nascimento separadamente
        localStorage.setItem('nomeBeneficiario', benef.nome);
        localStorage.setItem('dataNascimentoBeneficiario', benef.data_nascimento);

        // Navega para a página beneficiario.html
        window.location.href = 'beneficiario.html';
        console.log(localStorage.getItem('dataNascimentoBeneficiario'));
      });
    })(beneficiario);
  }
}


function carregarDados() {
  var xhr = new XMLHttpRequest();
  // Recupera os valores armazenados no armazenamento local
  var token = localStorage.getItem('token');
  console.log(token);
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

function buscar() {
  var form = document.getElementById('buscarNome');
  var formData = new FormData(form);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://casadopao.pythonanywhere.com/consulta');
  var token = localStorage.getItem('token');
  xhr.setRequestHeader('Authorization', token);

  // Adicionar o event listener para o evento load
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      // Sucesso: processar a resposta recebida
      var response = JSON.parse(xhr.responseText);
      // Aqui você pode trabalhar com os dados da resposta (response)
      preencherTabela(response);
    } else {
      // Erro na requisição
      console.error('Erro na requisição:', xhr.status);
    }
  });
  xhr.send(formData);
}

function filtros() {
  var form = document.getElementById('filtros');
  var formData = new FormData(form);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://casadopao.pythonanywhere.com/consulta');
  var token = localStorage.getItem('token');
  xhr.setRequestHeader('Authorization', token);

  // Adicionar o event listener para o evento load
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      // Sucesso: processar a resposta recebida
      var response = JSON.parse(xhr.responseText);
      // Aqui você pode trabalhar com os dados da resposta (response)
      preencherTabela(response);
    } else {
      // Erro na requisição
      console.error('Erro na requisição:', xhr.status);
    }
  });
  xhr.send(formData);
}