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

// Chama a função para carregar os dados ao carregar a página
window.onload = filtros;

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
    } if (xhr.status === 401) {
      // Erro na requisição
      alert("Faça login para visualizar os dados da tabela.");
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
    } if (xhr.status === 401) {
      // Erro na requisição
      alert("Faça login para visualizar os dados da tabela.")
    }
  });
  xhr.send(formData);
}

document.getElementById("planilha").addEventListener('click', baixarPlanilha);
function baixarPlanilha(){
  var filtros = document.getElementById('filtros');
  var form = new FormData(filtros);
  var header = new Headers();

  header.append('Authorization', localStorage.getItem('token'));

  fetch('https://casadopao.pythonanywhere.com/gerar_planilha', {
  method: 'POST',
  body: form,
  headers: header
  })
  .then((response) => {
    if (!response.ok) {
      alert("Faça login para realizar download de planilhas.");
      throw new Error("Network response was not ok");
    }
    return response.blob(); // Convert the response to a Blob
  })
  .then((blob) => {
    // Create a temporary URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");
    link.href = url;

    // Set the file name for the download
    link.setAttribute("download", "Planilha de beneficiarios.xlsx");

    // Append the link to the DOM and trigger the download
    document.body.appendChild(link);
    link.click();

    // Remove the link from the DOM once the download is complete
    document.body.removeChild(link);

    // Release the Blob URL
    window.URL.revokeObjectURL(url);
  })
  .catch((error) => {
    console.error("Error fetching the file:", error);
  });
}